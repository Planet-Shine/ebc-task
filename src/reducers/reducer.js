
import todos from './todos';
import clients from './clients';
import currentMonth from './currentMonth';
import currentDate from './currentDate';
import currentTask from './currentTask';
import isTaskEditInProgress from './isTaskEditInProgress';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';



export default combineReducers({
    routing : routerReducer,
    todos,
    clients,
    currentMonth,
    currentDate,
    currentTask,
    isTaskEditInProgress
});

