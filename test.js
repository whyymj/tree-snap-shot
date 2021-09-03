'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

let obj1 = () => ({
    key1: 'val-1',
    key2: 'val-2',
    key3: 'val-3',
    say() {}
})
let obj2 = {
    key1: 'val-11',
    key2: 'val-22',
    key3: 'val-33',
}

let log;
snapshot.compare(obj1(), obj2).exportLog(lg => {
    log = lg;
});

let copy1 = obj1()
snapshot.replay(log, copy1, oper => {
    if (oper[0] == 'update') {
        delete oper[1].key2;
    }
    if(oper[0] == 'del'){
        return false
    }
});
console.log(copy1);//{ key1: 'val-11', key2: 'val-2', key3: 'val-33', say: [Function: say] }



console.log('over');