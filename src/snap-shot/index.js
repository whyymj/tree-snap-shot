import Immutable from 'immutable'
import {
    shape,
    reset
} from './log-shaper'
class Logs {
    mergeLog = {
        delete: [],
    }
    logs = [];
    cache = []
    push(log) { //增
        switch (log.operation) {
            case 'add':
                this.mergeLog.add = shape(this.mergeLog.add, log, ['add']);
                return;
            case 'update':
                this.mergeLog.update = shape(this.mergeLog.update, log, ['update']);
                return;
            case 'delete':
                this.mergeLog.delete.push(log.path);
                return;
            case 'myers-diff':
                this.logs.push([log.operation, log.path, log.steps]);
                return;
            case 'init':
                this.logs.push([log.operation, log.value]);
                return;
        }
    }
    remove(callback) { //删
        this.logs = this.logs.filter(item => {
            return callback(item) === false ? false : true;
        })
    }
    update(callback) { //改
        this.logs = this.logs.map(item => {
            return callback(item) || item
        })
    }
    getDiff() { //查
        return this.getLogs().filter(item => {
            return item[0] != 'init';
        });
    }
    getLogs() {
        if (this.cache.length) {
            return this.cache
        }
        let result = this.logs.filter(item => item[0] != 'init');
        if (this.mergeLog.delete.length) {
            result.unshift(['del', ...this.mergeLog.delete])
        }
        if (this.mergeLog.add) {
            result.unshift(['add', this.mergeLog.add])
        }
        if (this.mergeLog.update) {
            result.unshift(['update', this.mergeLog.update])
        }
        result.unshift(this.logs[0])
        this.cache = result;
        return result;
    }

    init(list = []) {
        if (Array.isArray(list)) {
            this.logs = list
            this.mergeLog = {
                delete: [],
            }
            this.cache = []
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
    reset() {
        let logs = Log.getLogs();
         
        if (logs[0][0] == 'init') {
            let data = Immutable.fromJS(logs[0][1]).toJS();
            let res= reset(data, Immutable.fromJS(logs).toJS())
            return res
        }else{
            throw new Error('初始化出错了！')
        }

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
    getDiff() {
        let logs = Log.getDiff();
        logs.toString = toString;
        return logs;
    }
    setLogs(logs) {
        Log.init(logs);
    }
}
export default new Logger();