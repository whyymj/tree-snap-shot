import differ from '../dist/index'

test(`compare(['one', 'two', 'three', 'four', 'five', 'six'], ['two', 'three', 'four', 9, 'five', 'three'])`, () => {
    differ.compare(['one', 'two', 'three', 'four', 'five', 'six'], ['two', 'three', 'four', 9, 'five', 'three']).getDiff(record => {
        expect(record).toEqual([
            ["myers-diff", [],
                [
                    ["del", 0],
                    ["add", 4, 9],
                    ["update", 5, "three"]
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