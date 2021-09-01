'use strict';
export var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) &&
        !isSpecial(value)
};

function isNonNullObject(value) {
    return !!value && typeof value === 'object'
}

function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);

    return stringValue === '[object RegExp]' ||
        stringValue === '[object Date]' ||
        isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE
}

function getMergeFunction(key, options) {
    if (!options.customMerge) {
        return deepmerge
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ?
        Object.getOwnPropertySymbols(target).filter(function (symbol) {
            return target.propertyIsEnumerable(symbol)
        }) : []
}

function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
    try {
        return property in object
    } catch (_) {
        return false
    }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
        &&
        !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
            &&
            Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
    var destination = target || {};
    if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function (key) {
            destination[key] = target[key];
        });
    }
    getKeys(source).forEach(function (key) {
        if (propertyIsUnsafe(target, key)) {
            return
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
            destination[key] = source[key];
        }
    });

    return destination
}

export default function deepmerge(target, source, options) {
    options = options || {};
    options.isMergeableObject = options.isMergeableObject || isMergeableObject; 
    if (typeof target !== 'object' || target === null || target === source||!isMergeableObject(source)||!isMergeableObject(target)) {
        return source
    }
    return mergeObject(target, source, options)
}