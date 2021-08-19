import {
    diff
} from './diff/index.js'
import snapShot from './snap-shot/index.js'

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
        log:snapShot
    }
    exports.default = TreeDiff;
    exports.diff = diff
    exports.similarity = similarity
    exports.log = snapShot
    
})))