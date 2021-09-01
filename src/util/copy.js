import config from '../config/index.js'
import Immutable from 'immutable'
import {
    isDom,
    isPrimitive
} from './index'
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
export const linkClone = function (data, keys = []) {
    let info = {}
    let copyKeys;
    if (Array.isArray(keys) && keys.length) {
        copyKeys = keys
    }
    Object.getOwnPropertyNames(data || 0).forEach(item => {
        if (copyKeys) {
            if (copyKeys.includes(item)) {
                info[item] = data[item];
            }
            
            return;
        }
        info[item] = data[item];
    })
    return info
}