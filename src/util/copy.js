import cloneDeep from 'deepcopy'
import Immutable from 'immutable'
export const deepClone = function (data) {
    if (Immutable.isImmutable(data)) {
        return data
    }
    let copy = Immutable.fromJS(data)
    if (copy === data) {
        return cloneDeep(data)
    }
    return copy
};