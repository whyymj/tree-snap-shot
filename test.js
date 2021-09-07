'use strict';
const Immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')
const isObject = require("isobject")
let tree1
console.log(snapshot.difference({
    1: [0, 1, 2, 3],
    2: 2,
    3: 3,
    list: [{
        id: 1
    }, {}]
}, {
    1: {
        2: null
    },
    2: null,
    4: null,
    list: {
        0: null
    }
}))
//result