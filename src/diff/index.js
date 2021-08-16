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
} from '../util/index'
import Logger from '../snap-shot/index.js'
import Config from '../config/index.js'
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
    if (isImmutableStructure(data1) && isImmutableStructure(data2)) {
        data1 = Immutable.fromJS(data1);
        data2 = Immutable.fromJS(data2);
        if (Immutable.is(data1, data2)) {
            return
        }
        let dataType = getDataType(data1)
        if (dataType == getDataType(data2)) {
            if (dataType == 'Immutable List') {
                arrayDiff(data1, data2, path, type, handler);
            } else if (dataType == 'Immutable Map') {
                objectDiff(data1, data2, path, type, handler);
            }
            return
        }
    }
    if (!deepEqual(data1, data2)) {
        Logger.record({
            path,
            type: type.push(getDataType(data1, true)),
            operation: 'update',
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
export function diff(data1, data2, options = {}) {
    Logger.clear()
    Logger.clear()
    Config.set(options)
    differs(Immutable.fromJS(data1), Immutable.fromJS(data2), Immutable.List([]), Immutable.List([]), differs);
    return Logger.getLogs();
}