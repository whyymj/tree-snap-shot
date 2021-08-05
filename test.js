const {
    diff
} = require('./dist/index')
let data1={
    id:'data1-id',
    name:'data1-name',
    children:[{
        id:'child1-id',
        name:'child1-name',
    },{
        id:'child2-id',
        name:'child2-name',
    }]
}
let data2={
    id:'data2-id',
    name:'data2-name',
    children:[{
        id:'child1-id',
        name:'child1-name',
    },{
        id:'child2-id',
        name:'child2-name',
    },{
        id:'child3-id',
        name:'child2-name',
    }]
}
console.log(JSON.stringify(diff(data1, data2)))