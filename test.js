
const immutable = require('immutable')
const {
    similarity,
    diff,
} = require('./dist/index')


let data1 = [1, 2, {
    name: 'child1',
    children: [
        [1],
        [{
            name: 'child1-1',
            text: '111',
            uuu: '123'
        }, {
            name: 'child1-2',
            text: '222',
            uuu: '555'
        }]
    ]
}]
let data2 = [1, 2, {
    name: 'child1',
    children: [
        [{
            name: 'child1-1',
            text: '111',
            uuu: '123'
        }, {
            name: 'child1-2',
            text: '222',
            uuu: '555'
        }]
    ]
}]


console.log('@##########################@')
console.log(diff({
    id: 'first',
    list: [
        [1, 2, 3, 4, 5, 6], {
            name: 'child1-1',
            text: '111',
            uuu: '123',
            oo: '00'
        }, {
            name: 'child1-2',
            text: '222',
            uuu: '555'
        }
    ]
}, {
    id: 'second',
    list: [
        [1, 2, 3, 4, 5, 3], {
            name: 'child1-1',
            text: '111',
            uuu: '123',
            www: 1
        }, {
            name: 'child1-2',
            text: '222',
            uuu: '555'
        }
    ]
}).getLogs(), ';;;;;;;;;;;;;')

// console.log(diff([1, 2, 3, 4, 5, 6], [0, 1, 22, 3, 34, 5, 56, 6, 7]))
console.log('@##########################@');
