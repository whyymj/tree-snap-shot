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
    reader
} from '../util/index'
/**
 * 
 * @param {老数据} data1 
 * @param {新数据} data2 
 * @param {递归遍历的当前路径} path 
 * @param {路径经过的数据类型} type 
 * @param {最终结果存储} resultObj 
 * @param {回调函数} handler 
 * @param {其他配置} options 
 * @returns void(0)
 */
function differs(data1, data2, path, type, resultObj, handler, options) {
    if (isImmutableStructure(data1) && isImmutableStructure(data2)) {
        data1 = Immutable.fromJS(data1);
        data2 = Immutable.fromJS(data2);
        if(Immutable.is(data1, data2)){
            return
        }
        let dataType = getDataType(data1)
        if (dataType == getDataType(data2)) {
            if (dataType == 'Immutable List') {
                arrayDiff(data1, data2, path, type, resultObj, handler, options);
            } else if (dataType == 'Immutable Map') {
                objectDiff(data1, data2, path, type, resultObj, handler, options);
            }
            return
        }
    }
    if (!deepEqual(data1, data2)) {
        resultObj.push({
            path,
            type: type.push(getDataType(data1, true)),
            operation: 'update',
            value: {
                from: deepClone(data1),
                to: deepClone(data2),
            }
        });
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
    let result = []; //最终的对比结果存在这里
    let path = options.path || [];
    options.path = (path.length ? Immutable.List(path) : null)
    differs(Immutable.fromJS(data1), Immutable.fromJS(data2), Immutable.List([]), Immutable.List([]), result, differs, options);
    return result;
}