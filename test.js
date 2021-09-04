'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

let obj1 ={
    key1: 'val-1',
    key2: 'val-2',
    key3: 'val-3',
}

snapshot.step(['add', {
    test: 1
}], obj1)

console.log(obj1);

//result
 