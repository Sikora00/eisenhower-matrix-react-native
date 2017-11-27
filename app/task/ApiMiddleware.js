import TaskActionTypes, {
    createTaskFailAction,
    createTaskSuccessAction,
    loadTaskListFailAction,
    loadTaskListSuccessAction,
    removeTaskFailAction,
    removeTaskSuccessAction
} from "./TaskActions";
import Task from "../shared/models/Task";

const API = 'https://ms-eisenhover-matrix.herokuapp.com/';

export const apiMiddleware = store => next => action => {
    next(action);
    switch (action.type) {
        case TaskActionTypes.loadList:
            fetch(`${API}task`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => next(loadTaskListSuccessAction(data)))
                .catch(error => next(loadTaskListFailAction(error)))
                .done();
            break;
        case TaskActionTypes.remove:
            fetch(`${API}task/${action.payload.task.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then(response => next(removeTaskSuccessAction(action.payload)))
                .catch(e => next(removeTaskFailAction(e)))
                .done();
            break;
        case TaskActionTypes.create:
            fetch(`${API}task`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(action.payload)
                }
            )
                .then(response => response.json())
                .then((task) => {
                    taskEntity = new Task(task.id, task.title);
                    store.dispatch(createTaskSuccessAction({task: taskEntity}));
                })
                .catch(e => next(createTaskFailAction(e)))
                .done();
            break;
        default:
            break;
    }
};