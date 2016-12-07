
export default function isTaskEditInProgress (state = false, action) {
    switch (action.type) {
        case 'SET_IS_TASK_EDIT_IN_PROGRESS' :
            state = action.value;
            return state;
        default:
            return state;
    }
}
