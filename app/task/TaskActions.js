import Task from "../shared/models/Task";

export const TaskActionTypes = {
    loadList: '[Task] List Load',
    loadListFail: '[Task] List Load Fail',
    loadListSuccess: '[Task] List Load Success',

    create: '[Task] Create',
    createFail: '[Task] Create Fail',
    createSuccess: '[Task] Create Success',

    update: '[Task] Update',
    updateFail: '[Task] Update Fail',
    updateSuccess: '[Task] Update Success',

    remove: '[Task] Remove',
    removeFail: '[Task] Remove Fail',
    removeSuccess: '[Task] Remove Success',

    clearState: '[Task] Clear State'
};

/**
 * Load List actions.
 */
export function loadTaskListAction(payload) {
    return {
        type: TaskActionTypes.loadList,
        payload
    };

}

export function loadTaskListFailAction(payload) {
    return {
        type: TaskActionTypes.loadListFail,
        payload
    };

}

export function loadTaskListSuccessAction(payload) {
    return {
        type: TaskActionTypes.loadListSuccess,
        payload
    };

}

/**
 * Create actions.
 */
export function createTaskAction(payload) {
    return {
        type: TaskActionTypes.create,
        payload
    };

}

export function createTaskFailAction(payload) {
    return {
        type: TaskActionTypes.createFail,
        payload
    };

}

export function createTaskSuccessAction(payload) {
    return {
        type: TaskActionTypes.createSuccess,
        payload
    };

}

/**
 * Update actions.
 */
export function updateTaskAction(payload) {
    return {
        type: TaskActionTypes.update,
        payload
    };

}

export function updateTaskFailAction(payload) {
    return {
        type: TaskActionTypes.updateFail,
        payload
    };

}

export function updateTaskSuccessAction(payload) {
    return {
        type: TaskActionTypes.updateSuccess,
        payload
    };

}

/**
 * Remove actions.
 */
export function removeTaskAction(payload) {
    return {
        type: TaskActionTypes.remove,
        payload
    };

}

export function removeTaskFailAction(payload) {
    return {
        type: TaskActionTypes.removeFail,
        payload
    };

}

export function removeTaskSuccessAction(payload) {
    return {
        type: TaskActionTypes.removeSuccess,
        payload
    };

}

export default TaskActionTypes;