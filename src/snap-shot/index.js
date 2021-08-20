import Immutable from 'immutable'
import {shaper,reset} from './log-shaper'
class Logs {
    mergeLog = {
        delete: [],
    }
    logs = [];
    push(log) { //增
        switch (log.operation) {
            case 'add':
                this.mergeLog.add = shaper(this.mergeLog.add, log, ['add']);
                return;
            case 'update':
                this.mergeLog.update = shaper(this.mergeLog.update, log, ['update']);
                return;
            case 'delete':
                this.mergeLog.delete.push(log.path);
                return;
            case 'myers-diff':
                this.logs.push([log.operation, log.path, log.steps]);
                return;
            case 'init':
                this.logs.push([log.operation, log.steps]);
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
        let result = this.logs;
        if (this.mergeLog.delete.length) {
            result.unshift(['del', ...this.mergeLog.delete])
        }
        if (this.mergeLog.add) {
            result.unshift(['add', this.mergeLog.add])
        }
        if (this.mergeLog.update) {
            result.unshift(['update', this.mergeLog.update])
        }
        return result;
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
        return reset(data, operations)
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
        return logs
    }
    setLogs(logs) {
        Log.init(logs);
    }
}
export default new Logger();