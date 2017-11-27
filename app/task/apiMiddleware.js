import TaskActionTypes, {
    loadTaskListFailAction, loadTaskListSuccessAction, removeTaskFailAction,
    removeTaskSuccessAction
} from "./TaskActions";

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
        default:
            break;
    }
};