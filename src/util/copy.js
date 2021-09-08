import config from '../config/index.js'
import Immutable from 'immutable'
import {
    isDom,
    isPrimitive,
    isImmutableStructure,
    isObject
} from './index'
import {
    isMergeableObject
} from "./merge.js";

function reunion(tree, paths, values) {
    let copy;
    if (isObject(tree)) {
        copy = {}
    } else {
        copy = []
    }
    paths.forEach((path, index) => {
        let children = values[index];
        let child;
        let tmp = copy;
        path.map((p, idx) => {
            child = children.get(idx);

            if (idx === path.size - 1) {
                tmp[p] = deepClone(child, true)
            } else if (tmp[p] === undefined) {
                if (isObject(child)) {
                    tmp = tmp[p] = {}
                } else if (Array.isArray(child)) {
                    tmp = tmp[p] = []
                }
            } else {
                tmp = tmp[p]
            }
        })
    })
    return copy
}

function toJS(data) {
    if (Immutable.isImmutable(data)) {
        return data.toJS()
    }
    return data
}
//交集
export function union(tree, obj2) {
    if (!isImmutableStructure(tree) || !isImmutableStructure(obj2)) {
        return tree
    }
    let paths = []
    let values = []
    tree = toJS(tree);
    obj2 = toJS(obj2);

    function traverse(tree, filter, path, value) {
        if (!path) {
            path = Immutable.fromJS([]);
            value = Immutable.fromJS([]);
        }
        let child1, child2;
        let childPath;
        let childValue;
        for (let k in filter) {
            child1 = tree[k];
            child2 = filter[k];
            childPath = path.push(k)
            childValue = value.push(child1);
            if (child1 === undefined) {
                continue;
            }
            if (child2 === null || child1 === child2) {
                paths.push(childPath);
                values.push(childValue);
                continue;
            }
            if (typeof child1 == 'object' && typeof child2 == 'object') {
                traverse(child1, child2, childPath, childValue);
            }
        }
    }
    traverse(tree, obj2);
    return reunion(tree, paths, values)
}
//差集
export function difference(tree, obj2) {
    if (!isImmutableStructure(tree) || !isImmutableStructure(obj2)) {
        return tree
    }
    let paths = []
    let values = []
    tree = toJS(tree);
    obj2 = toJS(obj2);

    function traverse(tree, filter, path, value) {
        if (!path) {
            path = Immutable.fromJS([]);
            value = Immutable.fromJS([]);
        }
        let child1, child2;
        let childPath;
        let childValue;
        for (let k in tree) {
            child1 = tree[k];
            child2 = filter[k];
            childPath = path.push(k)
            childValue = value.push(child1);

            if (child2 === null || child1 === child2) {
                continue;
            }
            if (typeof child1 == 'object' && typeof child2 == 'object') {
                traverse(child1, child2, childPath, childValue);
            } else {
                paths.push(childPath);
                values.push(childValue);
            }
        }
    }
    traverse(tree, obj2);
    return reunion(tree, paths, values)
}

//条件copy
export function conditionalGraft(tree, filter, deepcopy = false) {
    if (!isObject(tree) && !Array.isArray(tree)) {
        return tree
    }
    let paths = []
    let values = []
    tree = toJS(tree);

    if (typeof filter !== 'function') {
        return tree
    }

    function traverse(tree, path, value) {
        if (!path) {
            path = Immutable.fromJS([]);
            value = Immutable.fromJS([]);
        }
        let child1;
        let childPath;
        let childValue;
        for (let k in tree) {
            child1 = tree[k];
            childPath = path.push(k)
            childValue = value.push(child1);
            let next = filter(childPath.toJS(), child1);
            if (next === true) {
                paths.push(childPath);
                values.push(childValue);
                continue;
            }
            if (isObject(child1) || Array.isArray(child1)) {
                traverse(child1, childPath, childValue);
            }
        }
    }
    traverse(tree);
    return reunion(tree, paths, values)
}

export function deepClone(data, toJS = false) {
    if (isDom(data) || isPrimitive(data)) {
        return data
    }
    if (Immutable.isImmutable(data)) {
        return toJS ? data.toJS() : data
    }
    let copy = Immutable.fromJS(data)
    if (!Immutable.isImmutable(copy)) { //无法转化为immutable的数据用自定义copy
        return config.unImmutableData.copy(data)
    }
    return Immutable.isImmutable(copy) && toJS ? copy.toJS() : copy;
};
export const linkClone = function (data) {
    if (isImmutableStructure(data) || !isMergeableObject(data)) {
        return data
    }
    let keys = Object.getOwnPropertyNames(data || 0);
    if (!keys.length) {
        return data
    }
    let info = {}

    keys.forEach(item => {
        info[item] = data[item];
    })
    return info
}