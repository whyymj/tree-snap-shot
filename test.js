'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

let obj = (key1,key2,key3) => ({
    key1,
    key2,
    key3,
})
let obj1 = obj('child1', 'child1 Info', 'child1 Data');
let obj2 = obj('child2', 'child2 Info', 'child2 Data');
let copyOj1 = obj('child1', 'child1 Info', 'child1 Data');//Test { data: 'child1 Data', info: 'child1 Info', id: 'child1' }
let log;
//test reset 
snapshot.compare(obj1, obj2).getDiff(lg => {
    log = lg;//保存对比差异
}).replay(log, copyOj1);//根据对比差异，改造对象

console.log(copyOj1);//Test { data: 'child2 Data', info: 'child2 Info', id: 'child2' }
//result