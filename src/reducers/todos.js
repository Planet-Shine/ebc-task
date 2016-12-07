
import _ from 'underscore';
import todoStorage from '../localstorage/todos';

export default function todos (state = [], action) {
    var index,
        item;
    switch (action.type) {
        case 'SET_TASK' :
            if (typeof action.task.id !== 'number' || isNaN(action.task.id)) {
                action.task.id = todoStorage.getNextId();
            }
            item = _.findWhere(state, {
                id : action.task.id
            });
            if (item) {
                index = state.indexOf(item);
                state = [].concat(state.slice(0, index), [action.task], state.slice(index + 1));
            } else {
                state.push(action.task);
                state = [].concat(state);
            }
            todoStorage.setItem(action.task.id, action.task);
            return state;
        case 'DELETE_TASK' :
            if (typeof action.id !== 'number' || isNaN(action.id)) {
                return state;
            } else {
                item = _.findWhere(state, {
                    id : action.id
                });
                if (item) {
                    index = state.indexOf(item);
                    state.splice(index, 1)
                    state = [].concat(state);
                    todoStorage.deleteItem(action.id);
                    return state;
                } else {
                    return state;
                }
            }
            return state;
        default :
            return state;
    }
}
