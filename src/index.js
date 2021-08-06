import {
    objectDiffHandler as objectDiff
} from './diff/objectDiff.js'
import {
    myersDiffHandler as arrayDiff
} from './diff/arrayDiff.js'
import Immutable from 'immutable'
import isObject from 'isobject'
import {
    getDataType
} from './util/index'

function differs(data1, data2, path, type, resultObj, parents, handler) {
    if (Array.isArray(data1) && Array.isArray(data2)) {
        arrayDiff(data1, data2, path, type, resultObj, parents, handler);
    } else if (getDataType(data1) == 'Immutable List' && getDataType(data2) == 'Immutable List') {
        arrayDiff(data1.toJS(), data2.toJS(), path, type, resultObj, parents, handler);
    } else if (isObject(data1) || isObject(data2)) {
        objectDiff(data1, data2, path, type, resultObj, parents, handler);
    }
}

export function diff(data1, data2, path = []) {
    let result = [];
    differs(data1, data2, Immutable.List([]), Immutable.List([]), result, (path.length ? Immutable.List(path) : null), differs);
    return Immutable.fromJS(result).toJS();
}

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TreeDiff = {}));
}(this, (function (exports) {
    var TreeDiff = {
        diff
    }
    exports.default = TreeDiff;
    exports.diff = diff
})))