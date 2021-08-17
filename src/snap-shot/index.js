import Immutable from 'immutable'
class Logs {
    logs = [];
    push(log) { //增
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
        return this.logs.filter(item => {
            return item.operation != 'init';
        }).map(item => {
            return Immutable.fromJS(item).toJS()
        })
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
class Logger {
    constructor() {
        Log.init()
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
    getDiffs() {
        let logs = Log.check()
        logs.toString = () => JSON.stringify(logs)
        return logs
    }
    setLogs(logs) {
        Log.init(logs);
    }
}
export default new Logger();