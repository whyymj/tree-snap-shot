import Immutable from "immutable"
import {
    deepClone
} from "../util/copy.js" //自定义的deepCopy,返回值可能是Immutable数据 
import {
    getDataType,
    isImmutableStructure
} from "../util/index.js";
import {
    deepEqual
} from "../util/equal.js";

function isNotInThePath(path, key, floor) {
    if (path && path.get(floor) !== undefined && path.get(floor) != key) {
        return true
    }
    return false
}
/**
 * 找到两个相同结构的对象的差异内容，并返回包含所有差异的数组
 * 注意对象内的值只能是简单类型，复杂类型不考虑
 * @param obj1 原对象
 * @param obj2 可能修改过的对象
 * @param path 到达该节点的路径，值为key
 * @param type 到达该节点的路径，值为父节点类型
 * @param resultObj 对比出的差异，即最终结果
 * @param path 筛选用的路径，不在进行路径外的差异对比
 * @param handler 下一层的处理函数
 * 
 * @returns {{}} 包含所有差异的数组
 */
export function objectDiffHandler(obj1, obj2, path, type, resultObj = [], handler, options = {}) {

    if (isImmutableStructure(obj1) && isImmutableStructure(obj2)) { //可转为immutable结构或已经是了的数据
        obj1 = Immutable.fromJS(obj1);
        obj2 = Immutable.fromJS(obj2);
        const filteKeys2 = {};
        obj2.map((val, key) => {
            if (val !== undefined && val !== null) {
                filteKeys2[key] = key
            }
        })
        //old有但new可能没有或者不同
        obj1.map((val, key) => {
            delete filteKeys2[key];
            key = key + '';
            let val2 = obj2.get(key)
            if (!deepEqual(val, val2)) {
                if (isNotInThePath(options.path, key, path.size)) { //只是为了手动筛选对比路径用的
                    return
                }
                //将变化过的属性挂载到返回对象中
                if (val2 !== undefined) {
                    if (typeof handler == 'function' && getDataType(val) == 'Immutable List' && getDataType(val2) == 'Immutable List') {
                        handler(val, val2, path.push(key), type.push(getDataType(obj1, true)), resultObj, handler, options)
                    } else {
                        objectDiffHandler(val, val2, path.push(key), type.push(getDataType(obj1, true)), resultObj, handler, options)
                    }
                } else {
                    resultObj.push({
                        path: path.push(key),
                        operation: 'delete',
                        type: type.push(getDataType(obj1, true)),
                        value: {
                            from: deepClone(val),
                            to: undefined,
                        }
                    });
                }
            }
        });
        const keys2 = Object.keys(filteKeys2);
        //new有单old没有
        keys2.forEach(key => {
            key = key + '';
            if (isNotInThePath(options.path, key, path.size)) {
                return
            }
            if (obj1.get(key) !== obj2.get(key)) {
                //将变化过的属性挂载到返回对象中
                resultObj.push({
                    path: path.push(key),
                    operation: 'add',
                    type: type.push(getDataType(obj1, true)),
                    value: {
                        from: undefined,
                        to: deepClone(obj2.get(key)),
                    }
                })

            }
        });
    } else {
        if (!deepEqual(obj1, obj2)) {
            resultObj.push({
                path,
                type: type.push(getDataType(obj1, true)),
                operation: 'update',
                value: {
                    from: deepClone(obj1),
                    to: deepClone(obj2),
                }
            });
        }
    }
    return resultObj
}
export function similarity(obj1, obj2) {
    let total = 0;
    let changed = 0;
    let unchanged = 0

    if (isImmutableStructure(obj1) && isImmutableStructure(obj2)) { //可转为immutable结构或已经是了的数据
        obj1 = Immutable.fromJS(obj1);
        obj2 = Immutable.fromJS(obj2);
        const filteKeys = {};

        obj2.map((val, key) => {
            if (val !== undefined && val !== null) {
                filteKeys[key] = val;
                if(obj1.get(key)=== undefined||obj1.get(key)===null) {
                    changed++
                }
            }
        })
        obj1.map((val, key) => {
            if (val !== undefined && val !== null) {
                total++
                if (filteKeys[key]) {
                    if (deepEqual(val, filteKeys[key])) {
                        unchanged++
                    } else {
                        changed++
                    }
                    delete filteKeys[key];
                } else {
                    filteKeys[key] = key
                    changed++
                }
            }

        });
    }
    return {
        total,
        unchanged,
        changed
    }
}