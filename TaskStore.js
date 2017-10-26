import {createStore} from 'redux';
import Task from "./app/entities/Task";

const defaultState = {
    tasks: [new Task(1,'Test')],
};

function taskStore(state = defaultState, action) {
    console.log(action);
    switch (action.type) {
        case 'ADD_TASK':
            console.log('switch');
            return Object.assign({}, state, {
                tasks: state.tasks.concat([
                  action.task
                ]),
            });
        default:
            return state;
    }
}

export default createStore(taskStore);