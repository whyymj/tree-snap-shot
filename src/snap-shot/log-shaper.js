import Immutable from 'immutable'
import deepmerge from '../util/merge'
export function shape(data = {}, operations, opers = ['add', 'update']) {
    if (typeof data == 'object') {
        if (!Array.isArray(operations)) {
            operations = [operations]
        }
        operations.map(oper => {
            if (opers.includes(oper.operation)) {
                let paths = oper.path;
                let types = oper.type;
                let child = data;
                paths.map((val, key) => {
                    let type = Immutable.isImmutable(types) ? types.get(key + 1) : types[key + 1]
                    if (type == 'object' || type == 'array') {
                        if (!child[val]) {
                            child[val] = {}
                        }
                        child = child[val]
                    } else {
                        child[val] = Immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;
                    }
                })

            }

        })
    } else {
        throw new Error('请输入Object')
    }
    return data
}

function restoreMap(data, oper) {
    if (typeof data == 'object') {
        if (oper[0] == 'add' || oper[0] == 'update') {
            return deepmerge(data, oper[1])
        } else if (oper[0] == 'del') {
            oper.slice(1).map(paths => {
                let child = data;
                paths.map((val, key) => {
                    if (key < ((paths.length || paths.size) - 1)) {
                        child = child[val]
                    } else {

                        delete child[val]
                    }
                })
            })

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

export function reset(data, opers) {
    opers.map(oper => {
        if (oper[0] == 'add' || oper[0] == 'del' || oper[0] == 'update') {
            restoreMap(data, oper)
        } else if (oper[0] == 'myers-diff') {
            restoreList(data, oper)
        }
    })
    return data
}