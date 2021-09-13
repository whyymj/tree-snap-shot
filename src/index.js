import {
    compare
} from './diff/index.js'
import Logger from './snap-shot/index.js'

import {
    similarity,
    deepEqual
} from './util/equal'
import {
    deepClone,
    conditionalGraft,
    union,
    difference,
} from './util/copy'
import Cache from './cache/index.js'
import {
    isImmutableStructure,
    isImmutable,
    isPrimitive,
    toImmutable,
    fromJS,
    toJS
} from './util/index'

function similar(d1, d2) {
    Cache.start()
    return similarity(d1, d2)
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
        compare,
        similarity: similar,
        getDiff: Logger.getDiff,
        replay: Logger.replay,
        exportLog: Logger.exportLog,
        clearCache: Cache.clear,
        reverseLog: Logger.reverseLog,
        rollback: Logger.rollback,
        step: Logger.step,
        deepClone,
        deepEqual,
        isImmutableStructure,
        isImmutable,
        isPrimitive,
        toImmutable,
        conditionalGraft,
        union,
        difference,
        toJS,
        fromJS,
    }
    exports.default = TreeDiff;
    exports.compare = compare
    exports.similarity = similar
    exports.getDiff = Logger.getDiff
    exports.replay = Logger.replay
    exports.step = Logger.step
    exports.exportLog = Logger.exportLog
    exports.clearCache = Cache.clear
    exports.reverseLog = Logger.reverseLog
    exports.rollback = Logger.rollback
    exports.deepClone = deepClone
    exports.deepEqual = deepEqual
    exports.isImmutableStructure = isImmutableStructure
    exports.isImmutable = isImmutable
    exports.isPrimitive = isPrimitive
    exports.toImmutable = toImmutable
    exports.conditionalGraft = conditionalGraft
    exports.union = union
    exports.difference = difference
    exports.toJS = toJS
    exports.fromJS = fromJS
})))