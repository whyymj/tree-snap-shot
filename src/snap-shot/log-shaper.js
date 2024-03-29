import Immutable from 'immutable'
import deepmerge from '../util/merge'
import {
    testReader,
    isImmutableStructure
} from '../util/index'
import {
    isMergeableObject
} from '../util/merge'

export function shape(data = {}, operations, opers = ['add', 'update', 'del']) {
    if (typeof data == 'object') {
        if (!Array.isArray(operations)) {
            operations = [operations]
        }
        operations.map(oper => {
            if (opers.includes(oper.operation)) {
                let paths = oper.path;
                paths = Immutable.isImmutable(paths) ? paths.toArray() : paths;
                let types = oper.type;
                types = Immutable.isImmutable(types) ? types.toArray() : types;
                let child = data;
                let val;
                for (let key = 0; key < paths.length; key++) {
                    val = paths[key];
                    if (oper.operation == 'del' && paths.length == 1) {
                        child[val] = null;
                        break;
                    } else if (oper.operation == 'del' && key == paths.length - 1) {
                        if (child[val] !== undefined) {
                            if (Array.isArray(child[val])) {
                                child[val].push(null)
                            } else {
                                child[val] = [child[val], null]
                            }
                        } else {
                            child[val] = null;
                        }
                        break;
                    }

                    let type = types[key + 1];
                    if ((type == 'object' || type == 'array') && key < paths.length - 1) {
                        if (!child[val]) {
                            child[val] = {}
                        }
                        child = child[val]
                    } else {
                        child[val] = Immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;
                    }
                }
            }
        })
    } else {
        throw new Error('请输入Object')
    }
    return data
}

function traverse(tree, callback, path) {
    if (!path) {
        path = Immutable.List([])
    }
    for (var key in tree) {
        if (typeof tree[key] == 'object' && !Array.isArray(tree[key])) {
            if (!tree[key]) {
                callback(path.push(key))
                continue;
            }
            traverse(tree[key], callback, path.push(key))
        } else {
            if (Array.isArray(tree[key])) {
                tree[key].forEach(item => {
                    return callback(path.push(key).push(item))
                })
            } else {
                callback(path.push(key).push(tree[key]))
            }
        }
    }
}

function restoreMap(data, oper) {
    if (typeof data == 'object') {
        if (oper[0] == 'add' || oper[0] == 'update') {
            return deepmerge(data, oper[1])
        } else if (oper[0] == 'del') {
            traverse(oper[1], paths => {
                let child = data;
                paths.map((val, key) => {
                    if (key < ((paths.length || paths.size) - 1)) {
                        child = child[val]
                    } else {
                        delete child[val]
                    }
                })
            })
        } else if (oper[0] == 'replace') {
            let child = data
            let paths = oper[1]
            paths.map((path, index) => {
                if (index < paths.length - 1) {
                    if(typeof child=='object'&&child){
                        child = child[path]
                    }
                }
            })
            if(typeof child=='object'&&child){
                child[paths[paths.length - 1]] = oper[2]
            }else{
                throw new Error('not existed path : ', paths)
            }
        }
    } else {
        throw new Error('请输入Object')
    }
    return data;
}

function restoreList(data, opers = []) {
    let point = 0;
    let paths = opers[1]
    let list = data
    paths.map(path => {
        list = list[path]
    })
    opers[2].forEach(item => {
        if (item[0] == 'add') {
            list.splice(item[1] + point, 0, ...item.slice(2))
            point += item.length - 2
        } else if (item[0] == 'del') {
            for (let i = 1; i < item.length; i++) {
                list.splice(item[i] + point, 1);
                point--
            }
        } else if (item[0] == 'update') {
            list[item[1] + point] = item[2]
        }
    })
}
export function step(oper, data, before) {
    oper = Immutable.fromJS(oper).toJS()
    if (typeof before === 'function') {
        if (before(oper) === false) {
            return
        }
    }
    if (oper[0] == 'add' || oper[0] == 'del' || oper[0] == 'update' || oper[0] == 'replace') {
        return restoreMap(data, oper)
    } else if (oper[0] == 'diff') {
        return restoreList(data, oper)
    } else if (oper[0] == 'init') {
        if (isMergeableObject(data)) {
            return deepmerge(data, oper[1]);
        } else {
            throw new Error('target must be a mergeable object')
        }
    }
}
export function reset(opers, data, before) {
    opers.map(oper => {
        step(oper, data, before)
    })
    return data
}