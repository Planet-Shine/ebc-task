
import clients from './clients';
import clientLocalStorage from '../localstorage/clients';

if (!clientLocalStorage.getCount()) {
    clients.forEach(function (contact) {
        clientLocalStorage.setItem(contact);
    });
}
