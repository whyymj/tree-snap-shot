'use strict';
// const immutable = require('immutable')
// const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

let AA = {
    a: 'a',
    b: 'b',
    c: 'c',
    list: [
        ['a', 'b', 'c', 'd', 'e'], 1, 2
    ]
}
let BB = {
    a: 'a',
    e: 'b',
    cc: 'cc',
    list: [
        '0', ['b', 'c', 'dd', 'e'], 1, 2
    ]
}
snapshot.compare(AA, BB).getDiff(df => {
    console.log(JSON.stringify(df))
});