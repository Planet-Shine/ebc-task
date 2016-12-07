
export default function currentTask (state = null, action) {
    switch (action.type) {
        case 'SET_CURRENT_TASK_ID' :
            state = action.id;
            return state;
        default:
            return state;
    }
}
