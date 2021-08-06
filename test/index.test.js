import {
  diff
} from '../dist/index'

test('diff([1, 2, 4, 3], [0, 1, 2, 6, 5, 3, 4])', () => {
  expect(diff([1, 2, 4, 3], [0, 1, 2, 6, 5, 3, 4])).toEqual([{
    "path": [],
    "type": [],
    "operation": "myers-diff",
    "steps": [{
      "operation": "add",
      "value": 0,
      "index": [0, 0]
    }, {
      "operation": "del",
      "value": 4,
      "index": [2, 3]
    }, {
      "operation": "add",
      "value": 6,
      "index": [3, 3]
    }, {
      "operation": "add",
      "value": 5,
      "index": [3, 4]
    }, {
      "operation": "add",
      "value": 4,
      "index": [4, 6]
    }]
  }]);
});

test('diff(obj1, obj2)', () => {
  let data1 = {
    id: 'data1-id',
    name: 'data1-name',
    children: [{
      id: 'child1-id',
      name: 'child1-name',
    }, {
      id: 'child2-id',
      name: 'child2-name',
    }]
  }
  let data2 = {
    id: 'data2-id',
    name: 'data2-name',
    children: [{
      id: 'child1-id',
      name: 'child1-name',
    }, {
      id: 'child2-id',
      name: 'child2-name',
    }, {
      id: 'child3-id',
      name: 'child2-name',
    }]
  }
  expect(diff(data1, data2)).toEqual([{
    "path": ["id"],
    "operation": "update",
    "type": ["object"],
    "value": {
      "from": "data1-id",
      "to": "data2-id"
    }
  }, {
    "path": ["name"],
    "operation": "update",
    "type": ["object"],
    "value": {
      "from": "data1-name",
      "to": "data2-name"
    }
  }, {
    "path": ["children"],
    "type": ["object"],
    "operation": "myers-diff",
    "steps": [{
      "operation": "add",
      "value": {
        "id": "child3-id",
        "name": "child2-name"
      },
      "index": [2, 2]
    }]
  }]);
});