import {createStore, applyMiddleware} from 'redux';
import Task from "./app/entities/Task";
import {apiMiddleware} from "./apiMiddleware";

const defaultState = {
    tasks: [new Task(1,'Test')],
};

function taskStore(state = defaultState, action) {
    switch (action.type) {
        case 'PULL_TASKS_LOADING':
            return {
                ...state,                   // keep the existing state,
                loading: true,              // but change loading to true
            };
        case 'PULL_TASKS_RECEIVED':
            let tasks = [];
            action.data.forEach((task) => {
                tasks.push(
                    new Task(task.id, task.title)
                );
            });
            return Object.assign({}, state, {
                tasks: tasks,
                loading: false
            });
        case 'PULL_TASKS_ERROR':
            return state;
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

export default createStore(taskStore, {tasks:[]}, applyMiddleware(apiMiddleware));