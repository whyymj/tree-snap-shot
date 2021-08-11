import equal from 'deep-equal'
import Immutable from "immutable"
import {
    isPrimitive,
    isImmutableStructure,
    isNull,
    getDataType,
    getKeysNum,
    statisticListSteps,
} from './index'
import {
    myers as diff
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
const equalCache = {}
/**
 * 浅比较两个对象是否相似
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {回调函数} isSimilar 判断是否相似的判断条件,return true表示相似
 * @returns 
 */
function mapLike(obj1, obj2, isSimilar) {
    let total = 0; //obj1的keys个数
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    if (isImmutableStructure(obj1) && isImmutableStructure(obj2) && getDataType(obj1, true) == getDataType(obj2, true)) { //可转为immutable结构或已经是了的数据

        obj1 = Immutable.fromJS(obj1);
        obj2 = Immutable.fromJS(obj2);
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
                total++
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

    } else if (obj1 === obj2) {
        return {
            total: 1,
            unchanged: 1,
            add: 0,
            del: 0,
            updated: 0,
            changed: 0,
            similarity: 1
        }
    }
    return {
        total,
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
    let total = 0; //obj1的keys个数
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    if (isImmutableStructure(obj1) && isImmutableStructure(obj2) && getDataType(obj1, true) == getDataType(obj2, true)) { //可转为immutable结构或已经是了的数据

        obj1 = Immutable.fromJS(obj1);
        obj2 = Immutable.fromJS(obj2);
        let res = statisticListSteps(obj1, obj2, diff(obj1, obj2, (a, b) => {
            if (isPrimitive(a) || isPrimitive(b)) {
                return a === b
            } else if (getDataType(a) == 'Immutable Map' && getDataType(b) == 'Immutable Map' && a.get(config.list.key) && b.get(config.list.key)) {
                return a.get(config.list.key) === b.get(config.list.key)
            } else { //引用数据类型
                return isSimilar(a, b).similarity > 0.6;
            }
        }));
        total += res.total;
        add += res.add;
        del += res.del;
        unchanged += res.unchanged;

    } else if (obj1 === obj2) {
        return {
            total: 1,
            unchanged: 1,
            add: 0,
            del: 0,
            updated: 0,
            changed: 0,
            similarity: 1
        }
    }
    return {
        total,
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
    let total = 0; //obj1的keys个数
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    function check(obj1, obj2) {
        if (isImmutableStructure(obj1) && isImmutableStructure(obj2) && getDataType(obj1, true) == getDataType(obj2, true)) { //可转为immutable结构或已经是了的数据
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
                        return check(child1, child2).similarity > rate
                    });
                }
                cacher.set(obj1, obj2, res);
            }
            total += res.total;
            updated += res.updated;
            add += res.add;
            del += res.del;
            unchanged += res.unchanged;

        } else if (obj1 === obj2) {
            total += 1;
            unchanged += 1
        }

        return {
            total,
            unchanged,
            add,
            del,
            updated,
            changed: add + del + updated,
            similarity: Math.round(unchanged / (add + del + updated + unchanged) * 100) / 100
        }
    }
    return check(data1, data2)
}
export const shallowEqual = function (obj1, obj2) {

    if (Immutable.is(obj1, obj2)) {
        return true
    }

    return mapLike(obj1, obj2).changed == 0;
};