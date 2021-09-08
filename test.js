'use strict';
const Immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')
const isObject = require("isobject")
let tree1 = {
    1: [0, 1, 2, 3],
    2: 2,
    3: 3,
    list: [{
        id: 1
    }, {}]
}

let filter = {
    1: {
        2: null,//null means fuzzy matching
    },
    2: null,
    4: null,
    list: {
        0: null
    }
}



console.log(JSON.stringify(snapshot.difference(tree1, filter)));//tree1 remove public parts

 
console.log(JSON.stringify(snapshot.union(tree1, filter)));//get public parts between tree1 and filter

//result