const API = 'http://192.168.0.13/';

export const apiMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        // In case we receive an action to send an API request
        case 'PULL_TASKS':
            // Dispatch GET_MOVIE_DATA_LOADING to update loading state
            store.dispatch({type: 'PULL_TASKS_LOADING'});
            // Make API call and dispatch appropriate actions when done
            fetch(`${API}task`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => next({
                    type: 'PULL_TASKS_RECEIVED',
                    data
                }))
                .catch(error => next({
                    type: 'PULL_TASKS_ERROR',
                    error
                }))
                .done();

            break;
        // Do nothing if the action does not interest us
        default:
            break;
    }
};