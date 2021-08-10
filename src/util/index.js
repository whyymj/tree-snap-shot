import Immutable from 'immutable'
import typeOf from 'kind-of'
import isObj from "isobject"
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
    if (Immutable.isImmutable(data) && !toJS) {
        return 'Immutable ' + data.toString().split(' ')[0]
    }
    if (Immutable.isImmutable(data) && toJS) {
        data = data.toJS()
    }
    return typeOf(data)
}
export const isObject = isObj;
export const isNull = (data) => {
    return data === null || data === undefined
};