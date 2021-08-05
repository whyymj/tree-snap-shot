import Immutable from 'immutable'
import typeOf from 'kind-of'
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