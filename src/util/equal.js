import equal from 'deep-equal'
import Immutable from "immutable"
import {
    isPrimitive,
    isImmutableStructure,
    isNull,
    getDataType,
    getPathsNum,
    statisticListSteps,
    reader
} from './index'
import {
    myers
} from '../diff/arrayDiff'

import config from '../config/index.js'
import cacher from '../cache/index.js'
export const deepEqual = function (obj1, obj2) {
    if (isPrimitive(obj1) || isPrimitive(obj2)) {
        return obj1 === obj2;
    }
    if (Immutable.isImmutable(obj1) && Immutable.isImmutable(obj2)) {
        return Immutable.is(obj1, obj2)
    }

    if (Immutable.isImmutable(obj1)) {
        obj1 = obj1.toJS()
    }
    if (Immutable.isImmutable(obj2)) {
        obj2 = obj2.toJS()
    }
    return equal(obj1, obj2)
};
/**
 * 浅比较两个对象是否相似
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {回调函数} isSimilar 判断是否相似的判断条件,return true表示相似
 * @returns 
 */
function mapLike(obj1, obj2, isSimilar) {
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    const filteKeys = {};
    obj2.map((val, key) => {
        if (!isNull(val)) {
            filteKeys[key] = val;
            if (isNull(obj1.get(key))) { //新增的字段
                add++
            }
        }
    })
    obj1.map((val, key) => {
        if (!isNull(val)) {
            if (!isNull(filteKeys[key])) {
                if (Immutable.is(val, filteKeys[key])) {
                    unchanged++
                } else {
                    if (isSimilar) {
                        isSimilar(val, filteKeys[key], key) || updated++
                    } else {
                        updated++
                    };
                }
            } else {
                del++
            }
        }
    });

    return {
        unchanged,
        add,
        del,
        updated,
        changed: add + del + updated,
        similarity: Math.round(unchanged / (add + del + updated + unchanged) * 100) / 100
    }
}
/**
 * 浅比较两个数组是否相似
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {回调函数} isSimilar 判断是否相似的判断条件,return true表示相似
 * @returns 
 */
function listLike(obj1, obj2, isSimilar) {
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    let df = myers(obj1, obj2, (a, b) => {
        let res = false
        if (isPrimitive(a) || isPrimitive(b)) {
            res = a === b
        } else if (getDataType(a) == 'Immutable Map' && getDataType(b) == 'Immutable Map' && a.get(config.list.key) && b.get(config.list.key)) {
            res = a.get(config.list.key) === b.get(config.list.key)
        } else { //引用数据类型
            res = isSimilar(a, b);
        }
        reader(a, 'oooooooo')
        reader(b, 'uuuuuuuu')
        reader(isSimilar(a, b), '*****')
    })

    let res = statisticListSteps(obj1, obj2, df);
    add += res.add;
    del += res.del;
    unchanged += res.unchanged;

    return {
        unchanged,
        add,
        del,
        updated,
        changed: add + del + updated,
        similarity: Math.round(unchanged / (add + del + updated + unchanged) * 100) / 100
    }
}
/**
 * 两个tree的结构相似度
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {相似度[0,1]} rate 大于相似度的视作相等
 * 
 * @returns 
 */
export function similarity(data1, data2, rate = 0.6) {
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    function check(obj1, obj2) {
        if (isImmutableStructure(obj1) && isImmutableStructure(obj2)) { //可转为immutable结构或已经是了的数据
            if (getDataType(obj1, true) == getDataType(obj2, true)) {
                obj1 = Immutable.fromJS(obj1);
                obj2 = Immutable.fromJS(obj2);

                let res = cacher.get(obj1, obj2);

                if (!res) {

                    if (getDataType(obj1) == 'Immutable Map') {
                        res = mapLike(obj1, obj2, (child1, child2) => {
                            return check(child1, child2).similarity > rate
                        });
                    } else if (getDataType(obj1) == 'Immutable List') {
                        res = listLike(obj1, obj2, (child1, child2) => {
                            // reader(child1, 'child1');
                            // reader(child2, 'child2');
                            // reader(check(child1, child2), 'result');
                            
                            return check(child1, child2).similarity > rate
                        });

                    }
                    // reader(obj1, 'obj1');
                    // reader(obj2, 'obj2');
                    // reader(res, 'res');
                    cacher.set(obj1, obj2, res);
                }

                updated += res.updated;
                add += res.add;
                del += res.del;
                unchanged += res.unchanged;
            } else {
                updated += getPathsNum(obj1)
            }

        } else if (obj1 === obj2) {
            unchanged += 1
        }
        reader(obj1,'<<<<<>>>>>')
        reader(obj2,'<<<<<>>>>>')
        reader( {
            unchanged,
            add,
            del,
            updated,
            changed: add + del + updated,
            similarity: Math.round(unchanged / (add + del + updated + unchanged) * 100) / 100
        },'obj1===obj2')
        let res = {
            unchanged,
            add,
            del,
            updated,
            changed: add + del + updated,
            similarity: Math.round(unchanged / (add + del + updated + unchanged) * 100) / 100
        }

        return res
    }
    return check(data1, data2)
}
export const shallowEqual = function (obj1, obj2) {

    if (Immutable.is(obj1, obj2)) {
        return true
    }

    return mapLike(obj1, obj2).changed == 0;
};