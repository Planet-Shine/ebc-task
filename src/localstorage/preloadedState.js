
require('../store/initialize');

import todoLocalStorage   from './todos';
import clientLocalStorage from './clients';

var preloadedState = {
    clients      : clientLocalStorage.getAll(),
    todos        : todoLocalStorage.getAll()
};

export default preloadedState;

