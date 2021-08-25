import {
    compare
} from './diff/index.js'
import Logger from './snap-shot/index.js'

import {
    similarity
} from './util/equal'
import Cache from './cache/index.js'
/**
 * 全局挂载
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TreeDiff = {}));
}(this, (function (exports) {
    var TreeDiff = {
        compare,
        similarity,
        getDiff: Logger.getDiff,
        replay: Logger.replay,
        exportLog: Logger.exportLog,
        clearCache: Cache.clear
    }
    exports.default = TreeDiff;
    exports.compare = compare
    exports.similarity = similarity
    exports.getDiff = Logger.getDiff
    exports.replay = Logger.replay
    exports.exportLog = Logger.exportLog
    exports.clearCache = Cache.clear
    exports.reverseLog = Logger.reverseLog
    exports.rollback = Logger.rollback
})))