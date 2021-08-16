import Immutable from 'immutable'
import typeOf from 'kind-of'
import isObj from "isobject"
import cacher from '../cache/index.js'
var toString = Object.prototype.toString;

function isPlainObject(value) {
    // The base prototype's toString deals with Argument objects and native namespaces like Math
    if (
        !value ||
        typeof value !== 'object' ||
        toString.call(value) !== '[object Object]'
    ) {
        return false;
    }

    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
        return true;
    }

    // Iteratively going up the prototype chain is needed for cross-realm environments (differing contexts, iframes, etc)
    var parentProto = proto;
    var nextProto = Object.getPrototypeOf(proto);
    while (nextProto !== null) {
        parentProto = nextProto;
        nextProto = Object.getPrototypeOf(parentProto);
    }
    return parentProto === proto;
}

/**
 * 判断是否是immutable数据或是可以转化为immutable的数据
 */
export const isImmutable = function (value) {
    return Immutable.isImmutable(value)
}
/**
 * 判断是否是immutable数据或是可以转化为immutable的数据
 */
export const isImmutableStructure = function (value) {
    return (
        typeof value === 'object' &&
        (Immutable.isImmutable(value) || Array.isArray(value) || isPlainObject(value))
    );
}
/**
 * 判断是否基本数据类型
 * @param {*} value 
 * @returns 
 */
export function isPrimitive(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    )
}
/**
 * 返回数据的类型
 * @param {数据}} data 
 * @param {是否先将Immutable数据还原再判断} toJS 
 * @returns boolean
 */
export function getDataType(data, toJS = false) {
    if (Immutable.isImmutable(data)) {
        let type = data.toString()
        if (toJS) {
            if (type.indexOf('Map') == 0) {
                return 'object'
            } else if (type.indexOf('List') == 0) {
                return 'array'
            }
            data = data.toJS()
        } else {
            return 'Immutable ' + type.split(' ')[0]
        }
    }
    return typeOf(data)
}
export const isObject = isObj;
export const isNull = (data) => {
    return data === null || data === undefined
};
export const isDom = (obj) => {
    if (typeof HTMLElement === 'object') {
        return obj instanceof HTMLElement;
    }
    return obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string';
};
/**
 * 统计对象的非immutable值的个数
 * @param {} a 
 * @returns 
 */
export function getPathsNum(a) {
    let num = 0;

    if (isImmutableStructure(a)) {
        a = Immutable.fromJS(a);
        if (cacher.get(a)) {
            return cacher.get(a)
        }
        a.map(val => {
            num += getPathsNum(val)
        })

        if (num) {
            cacher.set(a, num)
        }
    } else {
        return 1
    }

    return num
}

export function statisticListSteps(arr1, arr2, list) {
    let unchanged = 0,
        add = 0,
        del = 0,
        updated = 0,
        changed = 0,
        similarity = 0

    if (list.length) {
        list.forEach(item => {
            if (!item.operation) {
                unchanged += getPathsNum(item.value);
            } else if (item.operation == "add") {
                add++;
            } else if (item.operation == 'del') {
                del += getPathsNum(item.value);
            } else if (item.operation == 'updated') {
                updated += getPathsNum(item.value);
            }
        })
    } else {
        unchanged = getPathsNum(arr1)
    }

    similarity = Math.round(unchanged / (add + del + updated + unchanged) * 100) / 100;
    return {
        unchanged,
        add,
        del,
        updated,
        changed,
        similarity
    };
}
export function reader(list, flag) {
    try {

        let res = JSON.stringify(list)
        console.log(flag, '>>>>>>> ', res)
        return res
    } catch (e) {
        console.log(flag, '>>>>>>> ', list)
    }

};
