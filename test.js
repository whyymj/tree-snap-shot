const {
    similarity,
    diff,
    reader
} = require('./dist/index')
const Immutable = require('immutable')


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
reader(diff({
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
}), ';;;;;;;;;;;;;')

// reader(diff([1, 2, 3, 4, 5, 6], [0, 1, 22, 3, 34, 5, 56, 6, 7]))
console.log('@##########################@');
[{
    "path": ["id"],
    "type": ["object", "string"],
    "operation": "update",
    "value": {
        "from": "first",
        "to": "second"
    }
}, {
    "path": ["list", 0],
    "type": ["object", "array"],
    "operation": "myers-diff",
    "steps": [{
        "operation": "del",
        "value": 6,
        "index": [5, 5]
    }, {
        "operation": "add",
        "value": 3,
        "index": [6, 5]
    }]
}, {
    "path": ["list", 1, "www"],
    "operation": "add",
    "type": ["object", "object", "object"],
    "value": {
        "to": 1
    }
}, {
    "path": ["list", 1, "oo"],
    "operation": "delete",
    "type": ["object", "object", "object"],
    "value": {
        "from": "00"
    }
}]