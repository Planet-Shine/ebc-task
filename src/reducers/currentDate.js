
export default function currentDate (state = new Date(), action) {
    switch (action.type) {
        case 'SET_DATE' :
            state = new Date(action.date.getTime());
            return state;
        default:
            return state;
    }
}
