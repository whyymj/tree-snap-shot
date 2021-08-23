const immutable = require('immutable')
const differ = require('./dist/index')
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1,
        id: 'data',
        uuu: 1
    },
    children: [
        ['one', 'two', 'three', 'four', 'five', 'six'], {
            id: 'child1-id',
            name: 'child1-name',
            www: '',
            testdel: 'del',
            testadd: 'add',
        }, {
            id: 'child2-id',
            name: 'child2-name',
            testdel: 'del',
            testadd: 'add',
        }
    ]
}
let data2 = {
    id: 'data2-id',
    name: 'data2-name',
    data: {
        test: '2',
        newadd: 'uu',
        ooo: 'ooo',
        opop: 123
    },
    children: [
        ['two', 'three', 'four', 'five', 'three'], {
            id: 'child1-id',
            name: 'child1-1-name',
            www: '',
            testdel: 'del',
            testadd: 'add',
        }, {
            id: 'child2-id',
            name: 'child2-name',
            testadd: 'add',
        }, {
            id: 'child3-id',
            name: 'child3-name',
        }, {
            id: 'child4-id',
            name: 'child4-name',
        }
    ]
}


console.log('@##########################@');
let record1 = [],
    record2 = [];
differ.compare(data1, data2).exportLog(record => {
    record1 = record;
    data1 = ['one', 'two', 'three', 'four', 'five', 'six'];
    data2 = ['two', 'three', 'four', 'five', 'three']
}).compare(data1, data2).exportLog(record => {
    record2 = record;
}).replay(data => {
    console.log('replay1:::',data)
},record1).replay(data => {
    console.log('replay2:::',data)
},record2)


console.log('@##########################@');