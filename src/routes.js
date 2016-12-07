import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    App,
    MainLayout,
    EmptyBlock,
    Todos,
    TodoList,
    TaskForm,
    MyClients,
    NotFound
} from './todos'



export default (store) => {
    return (
        <Route component={App}>
            <Route component={MainLayout}>

                <Route path="/" component={EmptyBlock} />

                <Route component={Todos}>
                    <Route path="/todos"              component={EmptyBlock} />
                    <Route path="/todos/date"         component={TodoList} />
                    <Route path="/todos/date/:date"    component={TodoList} />
                    <Route path="/todos/edit-task/:id" component={TaskForm} />
                    <Route path="/todos/create-task"   component={TaskForm} />
                </Route>

                <Route path="/my-clients" component={MyClients} />
                <Route path="*" component={NotFound} status={404} />

            </Route>
        </Route>
    );
}