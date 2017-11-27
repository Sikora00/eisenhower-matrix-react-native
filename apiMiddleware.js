import TaskActionTypes, {loadListFailAction, loadListSuccessAction} from "./app/task/TaskActions";

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
                .then(data => next(loadListSuccessAction(data)))
                .catch(error => next(loadListFailAction(error)))
                .done();

            break;
        default:
            break;
    }
};