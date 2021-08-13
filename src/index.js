import {
    objectDiffHandler as objectDiff
} from './diff/objectDiff.js'
import {
    myersDiffHandler as arrayDiff
} from './diff/arrayDiff.js'
import Immutable from 'immutable'
import isObject from 'isobject'
import {
    getDataType,
    reader
} from './util/index'
import {
    similarity
} from './util/equal'

function differs(data1, data2, path, type, resultObj, handler, options) {
    if (getDataType(data1) == 'Immutable List' && getDataType(data2) == 'Immutable List') {
        arrayDiff(data1, data2, path, type, resultObj, handler, options);
    } else if (isObject(data1) || isObject(data2)) {
        objectDiff(data1, data2, path, type, resultObj, handler, options);
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
    let result = [];//最终的对比结果存在这里
    let path = options.path || [];
    options.path = (path.length ? Immutable.List(path) : null)
    differs(Immutable.fromJS(data1), Immutable.fromJS(data2), Immutable.List([]), Immutable.List([]), result, differs, options);
    return result;
}


/**
 * 全局挂载
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TreeDiff = {}));
}(this, (function (exports) {
    var TreeDiff = {
        diff,
        similarity,
        reader
    }
    exports.default = TreeDiff;
    exports.diff = diff
    exports.reader = reader
    exports.similarity = similarity
})))