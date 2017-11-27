import TaskActionTypes from "./TaskActions";
import Task from "../shared/models/Task";

const defaultState = {
    tasks: [],
    loading: true
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case TaskActionTypes.loadList:
            return {
                ...state,
                loading: true,
            };
        case TaskActionTypes.loadListSuccess:
            let tasks = [];
            action.payload.forEach((task) => {
                tasks.push(
                    new Task(task.id, task.title)
                );
            });
            return {
                ...state,
                tasks: tasks,
                loading: false
            };
        case TaskActionTypes.loadListFail:
            return {
                ...state,
                loading: false
            };
        case TaskActionTypes.createSuccess:
            return {
                ...state,
                tasks: state.tasks.concat([
                    action.task
                ]),
                loading: false
            };
        case TaskActionTypes.remove:
            return {
                ...state,
                loading: true
            };
        case TaskActionTypes.removeSuccess:
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    return task !== action.payload.task
                }),
                loading: false
            };
        default:
            return state;
    }
}