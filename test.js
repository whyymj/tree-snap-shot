const {
    diff
} = require('./dist/index')
const Immutable = require('immutable')
let data1 = Immutable.fromJS([{
    id: 1
}, {
    id: 2
}, {
    id: 3
}]) 
console.log(data1.toArray());