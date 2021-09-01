'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')

class Vue {
    data = 10;
    info = '123456'
    id = 1
    constructor(id, info, data) {
        this.id = id;
        this.data = data;
        this.info = info;
    }
    click() {
        console.log('id=' + this.id + ' : info=' + this.info + ' : data=' + this.data)
    }
    mounted() {
        console.log('id ' + this.id + ' mounted')
    }
}
let obj1 = new Vue('child1', 'child1Info', 'child1Data')
obj1.say = function () {
    console.log('id ' + this.id + ' say')
}
let obj2 = new Vue('child2', 'child2Info', 'child2Data')
obj2.say = function () {
    console.log('id ' + this.id + ' say>>>>>' + this.info)
}

let log;

snapshot.compare(obj1, obj2, {
    ignore(...arg) {
        
        return arg[1]=='function'
    }
}).exportLog(lg => {
    log = lg
    console.log('>>>>>>',lg.toJS())
}).replay(log, obj1)

// console.log(obj1, Object.getOwnPropertyNames(obj1))
obj1.say()
console.log('over');