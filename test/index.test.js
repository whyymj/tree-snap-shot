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
        expect(record.toJS()).toEqual([
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
            "data": {
                "id": null,
                "uuu": null,
                "bb": null
            },
            "info": null,
            "children": {
                "1": {
                    "1": {
                        "testdel": null
                    }
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
        expect(record.toJS()).toEqual(result);
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

test('diff(obj1, obj2) maxDepth', () => {

    let AA = {
        a: 'a',
        b: 'b',
        c: 'c',
        null: null,
        say() {},
        child: {
            id: 'child',
            name: 'child',
            tt: 0,
            child1: {
                id: 'child1',
                name: 'child1-2',
                child2: {
                    name: 'child2',
                    id: 'child2',
                }
            }
        },
        list: [
            ['a', 'b', 'cc', 'de', 'e'], 1, 2, {
                arr: [{
                    child: 1,
                    name: 1,
                    id: 1
                }, 1, 2, 3, 5, 6],
                oo: 0,
                aa: [1, 2, 3, 4, 5, 6, null]
            }
        ]
    }
    let map1 = new Map();
    let map2 = new Date('2021/08/30 00:00:01');
    let BB = {
        a: 'a',
        e: 'b',
        cc: 'cc',
        speak() {},
        map: new Map(),
        ii: [],
        aa: {},

        child: {
            id: 'child',
            name: 'child',
            map1: map1,

            child1: {
                id: 'child1',
                name: 'child-1',
                child2: {
                    name: 'child2',
                    id: 'child1-2',
                    map2: map2,
                }
            }
        },
        list: [
            ['a', 'b', 'c', 'd', 'e'], 1, {}, {
                arr: [{
                    child: 1,
                    name: 2,
                    id: 1
                }, 0, 2, 3, 5, 6],
                aa: [1, 2, 3, 4, 5, 66, [0, 1, 2, 3, 45, 5]],

            }
        ]
    }
    let diffs = '';
    let copy;
    let diffLen = 0;
    for (let i = 0; i < 10; i++) {
        copy = differ.deepClone(AA).toJS();
        differ.compare(AA, BB, {
                maxDepth: i,
            }).exportLog(df => {
                diffs = df
            })
            .replay(diffs, copy).compare(copy, BB).getDiff(df => {
                diffLen += df.length
                diffLen += deepequal(copy, BB) ? 0 : 1
            })
    }

    for (let i = 0; i < 10; i++) {
        copy = differ.deepClone(BB).toJS();
        differ.compare(BB, AA, {
                maxDepth: i,
            })
            .exportLog(df => {
                diffs = df
            })
            .replay(diffs, copy).compare(copy, AA).getDiff(df => {
                diffLen += df.length
                diffLen += deepequal(copy, AA) ? 0 : 1
            })
    }
    expect(diffLen).toEqual(0);
});

test('step restore', () => {
    let obj1 = {
        key1: 'val-1',
        key2: 'val-2',
        key3: 'val-3',
    }

    differ.step(['add', {
        test: 1
    }], obj1)

    expect(obj1).toEqual({
        key1: 'val-1',
        key2: 'val-2',
        key3: 'val-3',
        test: 1
    });
});

test('union two tree to get common part', () => {
    let tree1 = {
        1: [0, 1, 2, 3],
        2: 2,
        3: 3,
        list: [{
            id: 1
        }, {}]
    }

    let filter = {
        1: {
            2: null, //null means fuzzy matching
        },
        2: null,
        4: null,
        list: {
            0: null
        }
    }

    expect(JSON.stringify(differ.union(tree1, filter))).toEqual('{"1":[null,null,2],"2":2,"list":[{"id":1}]}');
});

test('differ two tree to get left tree unique part', () => {
    let tree1 = {
        1: [0, 1, 2, 3],
        2: 2,
        3: 3,
        list: [{
            id: 1
        }, {}]
    }

    let filter = {
        1: {
            2: null, //null means fuzzy matching
        },
        2: null,
        4: null,
        list: {
            0: null
        }
    }

    expect(JSON.stringify(differ.difference(tree1, filter))).toEqual('{"1":[0,1,null,3],"3":3,"list":[null,{}]}');
});