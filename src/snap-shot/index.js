import Immutable from 'immutable'

function valueToJs(obj) {
    if (Immutable.isImmutable(obj.to) || Immutable.isImmutable(obj.from)) {
        return Immutable.fromJS(obj).toJS()
    }
    return obj
}

function getLogs(logs) {
    return logs.map(item => {
        return {
            ...item,
            value: valueToJs(item.value)
        }
    })
}
class Logs {
    logs = [];
}
const Log = new Logs();
class Logger { 
    constructor() {
        Log.logs = []
    }
    add(log) {
        Log.logs.push(log);
    }
    init(data) {
        Log.logs = [];
        Log.logs.push({
            operation: 'init',
            value: data
        })
    }
    getLogs() {
        return getLogs(Log.logs)
    }
    setLogs(logs) {
        Log.logs = logs;
    }
}
export default new Logger();