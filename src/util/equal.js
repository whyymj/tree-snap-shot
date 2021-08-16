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
export const deepEqual = function(obj1, obj2) {
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
function mapLike(obj1, obj2) {
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
            if (!isNull(filteKeys[key])) { //修改字段
                if (Immutable.is(val, filteKeys[key])) { //未修改
                    unchanged += getPathsNum(val);
                } else {
                    let res = similarity(val, filteKeys[key]);
                    updated += res.updated;
                    del += res.del;
                    add += res.add;
                    unchanged += res.unchanged;
                }
            } else { //删除字段
                if (isImmutableStructure(val)) {
                    del += getPathsNum(val);
                } else {
                    del++
                }

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
function listLike(obj1, obj2) {
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
            res = similarity(a, b).similarity >= config.list.mapSimilarityForDiff;
        }
        return res
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
 * @param {old} obj1 老数据
 * @param {new} obj2 新数据
 * @returns 
 */
export function similarity(data1, data2) {

    function check(obj1, obj2) {
        let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
        let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
        let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
        let unchanged = 0; //完全相同的key：value
        if (isImmutableStructure(obj1)) { //可转为immutable结构或已经是了的数据
            obj1 = Immutable.fromJS(obj1);
            obj2 = Immutable.fromJS(obj2);
            if (getDataType(obj1) == getDataType(obj2)) {
                let res = cacher.get(obj1, obj2);
                if (!res) {
                    if (getDataType(obj1) == 'Immutable Map') {
                        res = mapLike(obj1, obj2);
                    } else if (getDataType(obj1) == 'Immutable List') {
                        res = listLike(obj1, obj2);
                    }
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
        } else {
            updated += 1
        }

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
export const shallowEqual = function(obj1, obj2) {
    return Immutable.is(obj1, obj2)
};