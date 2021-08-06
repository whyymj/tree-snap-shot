import cloneDeep from 'deepcopy'
import Immutable from 'immutable'
export const deepClone = function (data) {
    if (Immutable.isImmutable(data)) {
        return data
    }
    let copy = Immutable.fromJS(data)
    if (!Immutable.isImmutable(copy)) {//无法转化为immutable的数据用deepcopy
        return cloneDeep(data)
    }
    return copy
};