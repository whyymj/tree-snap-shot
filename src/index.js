import {
    diff
} from './diff/index.js'
import {
    reader
} from './util/index'
import {
    similarity
} from './util/equal'


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