import Immutable from 'immutable'
import {
    getDataType
} from '../util/index.js'

function mergeLog(data = {}, operations, opers = ['add', 'update']) {

    if (typeof data == 'object') {
        if (!Array.isArray(operations)) {
            operations = [operations]
        }
        operations.map(oper => {
            if (opers.includes(oper.operation)) {
                let paths = oper.path;
                let types = oper.type;
                let child = data;
                paths.map((val, key) => {
                    let type = Immutable.isImmutable(types) ? types.get(key + 1) : types[key + 1]
                    if (type == 'object' || type == 'array') {
                        if (!child[val]) {
                            child[val] = {}
                        }
                        child = child[val]
                    } else {
                        child[val] = Immutable.isImmutable(oper.value.to) ? oper.value.to.toJS() : oper.value.to;
                    }
                })

            }

        })
    } else {
        throw new Error('请输入Object')
    }
    return data
}

class Logs {
    mergeLog = {}
    logs = [];
    push(log) { //增
        switch (log.operation) {
            case 'add':
                this.mergeLog.add = mergeLog(this.mergeLog.add, log, ['add']);
                return
            case 'update':
                this.mergeLog.update = mergeLog(this.mergeLog.update, log, ['update']);
                return
        }
        this.logs.push(log)
    }
    remove(callback) { //删
        this.logs = this.logs.filter(item => {
            if (item.operation == 'init') {
                return true
            }
            return callback(item) === false ? false : true;
        })
    }
    update(callback) { //改
        this.logs = this.logs.map(item => {
            return callback(item) || item
        })
    }
    check() { //查
        return [...Object.keys(this.mergeLog).map(k => {
            return {
                operation: 'deep-merge-' + k,
                value: this.mergeLog[k]
            }
        }), ...this.logs.filter(item => {
            return item.operation != 'init';
        })]
    }
    init(list = []) {
        if (Array.isArray(list)) {
            this.logs = list
        } else {
            throw new Error('请输入正确的log')
        }
    }
}


const Log = new Logs();

function toString() {
    return JSON.stringify(this.map(item => {
        return Immutable.fromJS(item).toJS()
    }))
}
class Logger {
    constructor() {
        Log.init()
    }
    reset(data = {}, operations) {
        return mergeLog(data, operations)
    }
    add(log) {
        Log.push(log);
    }
    init(data) {
        Log.init()
        Log.push({
            operation: 'init',
            value: data
        })
    }
    getLog() {
        let logs = Log.check()
        logs.toString = toString;
        return logs
    }
    setLogs(logs) {
        Log.init(logs);
    }
}
export default new Logger();