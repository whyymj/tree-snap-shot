import {
    deepClone
} from "../util/copy.js" //自定义的deepCopy,返回值可能是Immutable数据 
import {
    getDataType,
    isUndefined,
    testReader
} from "../util/index.js";
import {
    deepEqual
} from "../util/equal.js";
import Logger from '../snap-shot/index.js'

/**
 * 找到两个相同结构的对象的差异内容，并返回包含所有差异的数组
 * 注意对象内的值只能是简单类型，复杂类型不考虑
 * @param obj1 原对象
 * @param obj2 可能修改过的对象
 * @param path 到达该节点的路径，值为key
 * @param type 到达该节点的路径，值为父节点类型
 * @param path 筛选用的路径，不在进行路径外的差异对比
 * @param handler 下一层的处理函数
 * 
 * @returns {{}} 包含所有差异的数组
 */
export function objectDiffHandler(obj1, obj2, path, type, handler) {
    obj2.map((val, key) => {
        if (!isUndefined(val)) {
            if (isUndefined(obj1.get(key))) { //新增的字段
                Logger.add({
                    path: path.push(key),
                    operation: 'add',
                    type,
                    value: {
                        from: undefined,
                        to: deepClone(obj2.get(key)),
                    }
                })
            }
        }
    })
    //old有但new可能没有或者不同
    obj1.map((val, key) => {
        key = key + '';
        let val2 = obj2.get(key)
        if (!isUndefined(val)) {
            if (!deepEqual(val, val2)) {
                if (!isUndefined(val2)) {//可能变化了的值
                    return handler(val, val2, path.push(key), type, handler)
                } else {//删除的字段
                    Logger.add({
                        path: path.push(key),
                        operation: 'del',
                        type:type.push(getDataType(val,true)),
                        value: {
                            from: deepClone(val),
                            to: undefined,
                        }
                    })
                }
            }

        }
    });
}