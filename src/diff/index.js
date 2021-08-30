import {
    objectDiffHandler as objectDiff
} from './objectDiff.js'
import {
    myersDiffHandler as arrayDiff
} from './arrayDiff.js'
import {
    deepEqual
} from "../util/equal.js";
import {
    deepClone
} from "../util/copy.js";
import Immutable from 'immutable'
import {
    getDataType,
    isImmutableStructure,
    testReader
} from '../util/index'
import Logger from '../snap-shot/index.js'
import Config from '../config/index.js'


function canGoDown(data1, data2, path) {
    if (Config.global.maxDepth <= path.size) {
        return false;
    }
    if (typeof Config.global.copyIfDiff == 'function' && Config.global.copyIfDiff(path.toJS(), Immutable.isImmutable(data1) ? data1.toJS() : data1)) {
        return false;
    }
    return isImmutableStructure(data1) && isImmutableStructure(data2)
}
/**
 * 
 * @param {老数据} data1 
 * @param {新数据} data2 
 * @param {递归遍历的当前路径} path 
 * @param {路径经过的数据类型} type 
 * @param {回调函数} handler
 * @returns void(0)
 */
function differs(data1, data2, path, type, handler) {
    if (typeof Config.global.ignore == 'function' && Config.global.ignore(path.toJS(), getDataType(data1, true))) {
        return
    }

    if (canGoDown(data1, data2, path)) {
        data1 = Immutable.fromJS(data1);
        data2 = Immutable.fromJS(data2);
        if (Immutable.is(data1, data2)) {
            return
        }
        let dataType = getDataType(data1)
        if (dataType == getDataType(data2)) {
            if (dataType == 'Immutable List') {
                return arrayDiff(data1, data2, path, type.push(getDataType(data1, true)), handler);
            } else if (dataType == 'Immutable Map') {
                return objectDiff(data1, data2, path, type.push(getDataType(data1, true)), handler);
            }
        }
    }
    /**
     * immutable无法转化的数据类型单独处理
     */
    if (!deepEqual(data1, data2)) {
        Logger.add({
            path,
            type: type.push(getDataType(data1, true)),
            operation: (isImmutableStructure(data1) && isImmutableStructure(data2)) ? 'replace' : 'update',
            value: {
                from: deepClone(data1),
                to: deepClone(data2),
            }
        })
    }

}
/**
 * start
 * @param {old data} data1 
 * @param {new data} data2 
 * @param {*} options 
 * @returns 
 */
export function compare(data1, data2, options = {}) {
    data1 = Immutable.fromJS(data1)
    Logger.init(data1);
    Config.set(options);
    differs(data1, Immutable.fromJS(data2), Immutable.List([]), Immutable.List([]), differs);
    Logger.compare = compare;
    return Logger;
}