import differ from '../dist/index'
const deepequal = require('deep-equal')

function createObject(deep, breadth, end = 'end') {
    var tmp;
    var result = tmp = {};
    for (var i = 0; i < deep; i++) {
        tmp = tmp['data'] = {};
        for (var j = 0; j < breadth; j++) {
            tmp[j] = j
        }
    }
    tmp['end'] = end
    return result;
}
let li1 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
let li2 = ['one', 'two', 56, 'five', 'six', 'seven7', 'eight', 'ten', 'nine', 'ooo']
let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    data: {
        test: 'null',
        id: 'data',
        uuu: 1,
        aa: {
            id: 'aa'
        },
        bb: {
            id: 'aa'
        }
    },
    info: {
        info1: '',
    },
    children: [
        li1,
        [{
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
        }]
    ]
};

let data2 = {
    id: 'data2-id',
    name: 'data2-name',
    data: {
        test: {},
        newadd: 'uu',
        ooo: 'ooo',
        opop: 123,
        aa: 9
    },
    field: ',',
    children: [
        li2,
        [{
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
        }]
    ]
}

test(`compare(list1,list2)`, () => {
    differ.compare(li1, li2).getDiff(record => {
        expect(record).toEqual([
            ["diff", [],
                [
                    ["del", 2],
                    ["update", 3, 56],
                    ["update", 6, "seven7"],
                    ["del", 8],
                    ["add", 10, "nine", "ooo"]
                ]
            ]
        ]);
    })
});

test('diff(obj1, obj2)', () => {

    let result = [
        ["update", {
            "id": "data2-id",
            "name": "data2-name",
            "data": {
                "test": {},
                "aa": 9
            },
            "children": {
                "1": {
                    "0": {
                        "name": "child1-1-name"
                    }
                }
            }
        }],
        ["add", {
            "field": ",",
            "data": {
                "newadd": "uu",
                "ooo": "ooo",
                "opop": 123
            }
        }],
        ["del", {
            "data": ["id", "uuu", "bb"],
            "info": null,
            "children": {
                "1": {
                    "1": "testdel"
                }
            }
        }],
        ["diff", ["children", 1],
            [
                ["add", 2, {
                    "id": "child3-id",
                    "name": "child3-name"
                }, {
                    "id": "child4-id",
                    "name": "child4-name"
                }]
            ]
        ],
        ["diff", ["children"],
            [
                ["update", 0, ["one", "two", 56, "five", "six", "seven7", "eight", "ten", "nine", "ooo"]]
            ]
        ]
    ]
    differ.compare(data1, data2).getDiff(record => {
        expect(record).toEqual(result);
    })

});

test('diff(obj1, obj2).go() ', () => {
    let record1;
    let test = {};
    differ.compare(data1, data2).exportLog(record => {
        record1 = record
    }).replay(record1, test)
    expect(test).toEqual(data2);

   
}); 
test('diff(obj1, obj2).back()', () => {
    let record1;
    let test = {};
    differ.compare(data1, data2).exportLog(record => {
        record1 = record
    }).replay(record1, test);
    differ.rollback(record1, test)
    
    expect(test).toEqual(data1);
});