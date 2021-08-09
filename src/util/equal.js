import equal from 'deep-equal'
import Immutable from "immutable"
import {
    isPrimitive,
    isImmutableStructure
} from './index'
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


export function like(obj1, obj2) {
    let total = 0; //obj1的keys个数
    let updated = 0; //obj2与obj1的差异个数，包括：修改的总个数
    let add = 0; //obj2与obj1的差异个数，包括：增加的总个数
    let del = 0; //obj2与obj1的差异个数，包括：删除的总个数
    let unchanged = 0; //完全相同的key：value

    if (isImmutableStructure(obj1) && isImmutableStructure(obj2)) { //可转为immutable结构或已经是了的数据
        obj1 = Immutable.fromJS(obj1);
        obj2 = Immutable.fromJS(obj2);
        const filteKeys = {};

        obj2.map((val, key) => {
            if (val !== undefined && val !== null) {
                filteKeys[key] = val;
                if (obj1.get(key) === undefined || obj1.get(key) === null) { //新增的字段
                    add++
                }
            }
        })
        obj1.map((val, key) => {
            if (val !== undefined && val !== null) {
                total++
                if (filteKeys[key] !== undefined && filteKeys[key] !== null) {
                    if (Immutable.is(val, filteKeys[key])) {
                        unchanged++
                    } else {
                        updated++
                    }
                } else {
                    del++
                }
            }

        });
    }
    return {
        total,
        unchanged,
        add,
        del,
        updated,
        rate: Math.round((add + del + updated) / total * 100) / 100
    }
}
export const shallowEqual = function (obj1, obj2) {
    return like(obj1, obj2).changed == 0;
};