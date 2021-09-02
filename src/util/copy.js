import config from '../config/index.js'
import Immutable from 'immutable'
import {
    isDom,
    isPrimitive,
    isImmutableStructure
} from './index'
import {
    isMergeableObject
} from "./merge.js";
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