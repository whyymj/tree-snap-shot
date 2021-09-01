'use strict';
const immutable = require('immutable')
const deepequal = require('deep-equal')
const snapshot = require('./dist/index')
 
class Test {
    data = 1;
    info = ''
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
let obj1 = new Test('child1', 'child1Info', 'child1Data');
let obj2 = new Test('child2', 'child2Info', 'child2Data');
let copyOj1 =new Test('child1', 'child1Info', 'child1Data');
let log;
//test reset 
snapshot.compare(obj1, obj2).exportLog(lg => {
    log = lg;//
    console.log('>>>>>>', lg.toJS())
}).replay(log, copyOj1)

console.log(obj1, Object.getOwnPropertyNames(obj1))
// obj1.say()
// obj1.methods.speak()
console.log('over',obj1);