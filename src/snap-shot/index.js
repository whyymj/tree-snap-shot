import Immutable from 'immutable'
class Logger {
    logs;
    repositories;
    index = {};

    constructor() {
        this.logs = Immutable.List([])
        this.repositories = Immutable.List([])
    }
    add(log) {
        this.logs.push(log)
    }
    init(data) {
        this.logs.clear();
        this.repositories.clear();
        this.logs.push({
            operation: 'init',
            value: data
        })
    }
    commit(commit) {
        if (!commit) {
            throw new Error('commit必须是字符串')
        } else {
            if (this.index[commit]) {
                throw new Error('commit不能重复')
            } else {
                this.index[commit] = this.repositories.length;
                this.repositories.push({
                    timestamp: new Date().getTime(),
                    commit,
                    reflogs: this.logs
                })
            }

        }
    }
    reset(commit) {
        if (this.index[commit] && this.index[commit].lenth) {
            return
        }
    }
    log() {
        return Immutable.fromJS(this.logs).toJS()
    }
    push(){

    }
    pull(){

    }
    branch(name){

    }
    checkout(name){

    }
}
export default new Logger();