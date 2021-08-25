import differ from '../dist/index'

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
test(`compare(list1,list2)`, () => {
    differ.compare(li1, li2).getDiff(record => {
        expect(record).toEqual([
            [
                ["myers-diff", [],
                    [
                        ["del", 2],
                        ["update", 3, 56],
                        ["update", 6, "seven7"],
                        ["del", 8],
                        ["add", 10, "nine", "ooo"]
                    ]
                ]
            ]
        ]);
    })
});

test('diff(obj1, obj2)', () => {
    let data1 = {
        id: 'data1-id',
        name: 'data1-name',
        data: {
            test: 1,
            id: 'data',
            uuu: 1
        },
        children: [
            ['one', 'two', 'three', 'four', 'five', 'six'],
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
            ['two', 'three', 'four', 'five', 'three'],
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

    let result = [
        ["update", {
            "id": "data2-id",
            "name": "data2-name",
            "data": {
                "test": "2"
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
            "data": {
                "newadd": "uu",
                "ooo": "ooo",
                "opop": 123
            }
        }],
        ["del", {
            "data": ["id", "uuu"],
            "children": {
                "1": {
                    "1": "testdel"
                }
            }
        }],
        ["myers-diff", ["children", 0],
            [
                ["del", 0],
                ["update", 5, "three"]
            ]
        ],
        ["myers-diff", ["children", 1],
            [
                ["add", 2, {
                    "id": "child3-id",
                    "name": "child3-name"
                }, {
                    "id": "child4-id",
                    "name": "child4-name"
                }]
            ]
        ]
    ];
    differ.compare(data1, data2).getDiff(record => {
        expect(record).toEqual(result);
    })

});