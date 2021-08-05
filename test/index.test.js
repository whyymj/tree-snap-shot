import {
  diff
} from '../dist/index'

test('diff([1, 2, 4, 3], [0, 1, 2, 6, 5, 3, 4])', () => {
  expect(diff([1, 2, 4, 3], [0, 1, 2, 6, 5, 3, 4])).toEqual([{
    "path": [],
    "type": [],
    "operation": "diff",
    "value": [{
      "operation": "add",
      "value": 0,
      "index": [0, 0]
    }, {
      "operation": "",
      "value": 1,
      "index": [0, 1]
    }, {
      "operation": "",
      "value": 2,
      "index": [1, 2]
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
      "operation": "",
      "value": 3,
      "index": [3, 5]
    }, {
      "operation": "add",
      "value": 4,
      "index": [4, 6]
    }]
  }]);
});