
export default function currentMonth (state = new Date(), action) {
    var currentMonth;
    switch (action.type) {
        case 'NEXT_MONTH' :
            currentMonth = state;
            state = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate(), 1);
            return state;
        case 'PREVIOUS_MONTH' :
            currentMonth = state;
            state = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate(), 1);
            return state;
        default:
            return state;
    }
}
