import {
    isPrimitive,
    getDataType,
    testReader
} from '../util/index.js'
import {
    shallowEqual,
    similarity,
} from '../util/equal.js'
import config from '../config/index.js'
import Logger from '../snap-shot/index.js'

export function myers(stra, strb, equal = (a, b) => a === b) {
    let n = stra.size;
    let m = strb.size;
    let snakes;
    let v = {
        '1': 0
    }
    let vs = {
        '0': {
            '1': 0
        }
    }
    let d

    loop:
        for (d = 0; d <= n + m; d++) { //移动步数
            let tmp = {}

            for (let k = -d; k <= d; k += 2) { //k线范围
                let down = k == -d || k != d && v[k + 1] > v[k - 1]
                let kPrev = down ? k + 1 : k - 1

                let xStart = v[kPrev]
                let yStart = xStart - kPrev

                let xMid = down ? xStart : xStart + 1
                let yMid = xMid - k

                let xEnd = xMid
                let yEnd = yMid

                while (xEnd < n && yEnd < m && equal(stra.get(xEnd), strb.get(yEnd))) {
                    xEnd++
                    yEnd++
                }

                v[k] = xEnd
                tmp[k] = xEnd

                if (xEnd == n && yEnd == m) {
                    vs[d] = tmp
                    snakes = solution(vs, n, m, d)
                    return getRes(snakes, stra, strb)
                }
            }

            vs[d] = tmp
        }
}

function solution(vs, n, m, d) {
    let snakes = []
    let p = {
        x: n,
        y: m
    }

    for (; d > 0; d--) {
        let v = vs[d]
        let vPrev = vs[d - 1]
        let k = p.x - p.y

        let xEnd = v[k]
        let yEnd = xEnd - k

        let down = k == -d || k != d && vPrev[k + 1] > vPrev[k - 1]
        let kPrev = down ? k + 1 : k - 1

        let xStart = vPrev[kPrev]
        let yStart = xStart - kPrev

        let xMid = down ? xStart : xStart + 1
        let yMid = xMid - k

        snakes.unshift([xStart, xMid, xEnd])

        p.x = xStart
        p.y = yStart
    }

    return snakes
}


function getRes(snakes, stra, strb) {
    let args = []
    let yOffset = 0

    snakes.forEach((snake, index) => {
        let s = snake[0]
        let m = snake[1]
        let e = snake[2]
        let large = s

        if (index === 0 && s !== 0) { //不变的值
            for (let j = 0; j < s; j++) {
                args.push({ //不能去掉，方便统计
                    operation: '',
                    value: stra.get(j),
                    index: [j, yOffset]
                })
                yOffset++
            }
        }

        // 删除
        if (m - s == 1) { //删掉的值
            args.push({
                operation: 'del',
                value: stra.get(s),
                index: [s, yOffset]
            })
            large = m
            // 添加
        } else {
            args.push({
                operation: 'add',
                value: strb.get(yOffset),
                index: [s, yOffset]
            })
            yOffset++
        }

        // 不变
        for (let i = 0; i < e - large; i++) {
            args.push({ //不能去掉，方便统计
                operation: '',
                value: stra.get(large + i),
                index: [large + i, yOffset],
            })
            yOffset++
        }
    })
    let item = null;
    let next = null;
    let newList = []
    for (let i = 0; i < args.length; i++) {
        item = args[i];
        next = args[i + 1];
        if (item ?.operation == 'del' && next ?.operation == 'add' && item.index[1] == next.index[1]) { //合并add del
            newList.push({
                operation: 'update',
                value: next.value,
                index: item.index
            });
            i++;
        } else {
            newList.push(item)
        }
    }
    return newList;
}

function mergeOperation(list) {
    let item = null;
    let newList = []
    let tmp;
    for (let i = 0; i < list.length; i++) {
        item = list[i];
        if (item ?.operation) {
            tmp = [item.operation, item.index[0]]

            if (item ?.operation == 'add') {
                if (newList[newList.length - 1] ?. [0] == 'add' && newList[newList.length - 1][1] == item.index[0]) {
                    tmp = newList[newList.length - 1]
                } else {
                    newList.push(tmp)
                }
                tmp.push(item.value)
            } else if (item ?.operation == 'del') {
                if (newList[newList.length - 1] ?. [0] == 'del') {
                    tmp = newList[newList.length - 1]
                    tmp.push(item.index[0])
                } else {
                    newList.push(tmp)
                }
            } else {
                tmp.push(item.value)
                newList.push(tmp)
            }
        }
    }
    return newList
}

function cannotGoDown(a, b, path) {
    if (config.global.maxDepth <= path.size) {
        return true;
    }
    return false
}

export const myersDiffHandler = function (arr1, arr2, path, type, handler) {

    let diff = myers(arr1, arr2, (a, b) => {
             
        if (isPrimitive(a) || isPrimitive(b)) { //简单值比较
            return a === b
        } else if (cannotGoDown(a, b, path)) {
            return shallowEqual(a, b)
        } else if (getDataType(a) == 'Immutable Map' && getDataType(b) == 'Immutable Map' && a.get(config.listKey) && b.get(config.listKey)) { //标识字段比较
            return a.get(config.listKey) === b.get(config.listKey)
        } else { //引用数据类型，结构比较 
            return similarity(a, b).similarity >= config.global.listItemSimiliarity;
        }
    })
    
    if (diff.length) { 
        diff.forEach((item) => {
            if (!item.operation && (getDataType(item.value) == 'Immutable Map' || getDataType(item.value) == 'Immutable List')) {
                if (!shallowEqual(arr1.get(item.index[0]), arr2.get(item.index[1]))) {
                    return handler(arr1.get(item.index[0]), arr2.get(item.index[1]), path.push(item.index[0]), type, handler)
                }
            }
        })
        Logger.add({
            path,
            type,
            operation: 'diff',
            steps: mergeOperation(diff)
        });
    } else if (arr1.length || arr1.size) {
        arr1.map((item, index) => {
            if (!shallowEqual(item, arr2.get(index))) {
                console.log(testReader(item),'<<<<++++++++',testReader(arr2.get(index)))
                return handler(item, arr2.get(index), path.push(index), type, handler)
            }
        })
    }
    diff = null;
}
export const myersDiff = myers