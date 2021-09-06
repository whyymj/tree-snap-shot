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
export function conditionalGraft(tree, filter ,deepcopy=false) {
    if (!isObject(tree) && !Array.isArray(tree)) {
        return tree
    }
    let paths = []
    let values = []
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
                tmp[p] = child
            } else if (tmp[p] === undefined) {
                if (isObject(child)) {
                    tmp = tmp[p] = {}
                } else if (Array.isArray(child)) {
                    tmp = tmp[p] = []
                } else {
                    tmp = tmp[p] = child
                }
            } else {
                tmp = tmp[p] = child;
            }

        })
    })
    return copy
}
export const deepClone = function (data) {
    if (isDom(data) || isPrimitive(data)) {
        return data
    }
    if (Immutable.isImmutable(data)) {
        return data
    }
    let copy = Immutable.fromJS(data)
    if (!Immutable.isImmutable(copy)) { //无法转化为immutable的数据用自定义copy
        return config.unImmutableData.copy(data)
    }
    return copy
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