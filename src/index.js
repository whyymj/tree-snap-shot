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
} from './util/index'
import {
    like,
    similarity
} from './util/equal'

function differs(data1, data2, path, type, resultObj, handler, options) {
    if (getDataType(data1) == 'Immutable List' && getDataType(data2) == 'Immutable List') {
        arrayDiff(data1.toArray(), data2.toArray(), path, type, resultObj, handler, options);
    } else if (isObject(data1) || isObject(data2)) {
        objectDiff(data1, data2, path, type, resultObj, handler, options);
    }
}

export function diff(data1, data2, options = {}) {
    let result = [];
    let path = options.path || [];
    options.path = (path.length ? Immutable.List(path) : null)
    differs(Immutable.fromJS(data1), Immutable.fromJS(data2), Immutable.List([]), Immutable.List([]), result, differs, options);
    return Immutable.fromJS(result).toJS();
}
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TreeDiff = {}));
}(this, (function (exports) {
    var TreeDiff = {
        diff,
        like,
        similarity
    }
    exports.default = TreeDiff;
    exports.diff = diff
    exports.like = like
    exports.similarity = similarity
})))