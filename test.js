const immutable = require('immutable')
const {
    similarity,
    diff,
} = require('./dist/index')


let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 1
    },
    children: [
        [1, 2, 3, 4, 5, 6], {
            id: 'child1-id',
            name: 'child1-name',
        }, {
            id: 'child2-id',
            name: 'child2-name',
        }
    ]
}
let data2 = {
    id: 'data2-id',
    name: 'data2-name',
    data: {
        test: '2'
    },
    children: [
        [1, 2, 3, 4, 5, 3], {
            id: 'child1-id',
            name: 'child1-1-name',
        }, {
            id: 'child2-id',
            name: 'child2-name',
        }, {
            id: 'child3-id',
            name: 'child2-name',
        }
    ]
}


console.log('@##########################@')
console.log(diff(data1,data2).getDiffs().toString(), ';;;;;;;;;;;;;')

// console.log(diff([1, 2, 3, 4, 5, 6], [0, 1, 22, 3, 34, 5, 56, 6, 7]))
console.log('@##########################@');