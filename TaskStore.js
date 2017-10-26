import {createStore} from 'redux';
import Task from "./app/entities/Task";

const defaultState = {
    tasks: [new Task(1,'Test')],
};

function taskStore(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return Object.assign({}, state, {
                tasks: state.tasks.concat([
                  action.task
                ]),
            });
        case 'DELETE_TASK':
            return Object.assign({}, state, {
                tasks: state.tasks.filter(task => {
                    return task !== action.task
                })
            });
        default:
            return state;
    }
}

export default createStore(taskStore);