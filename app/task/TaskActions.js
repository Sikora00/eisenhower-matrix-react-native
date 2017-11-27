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
export function loadListAction(payload) {
    return {
        type: TaskActionTypes.loadList,
        payload
    };

}

export function loadListFailAction(payload) {
    return {
        type: TaskActionTypes.loadListFail,
        payload
    };

}

export function loadListSuccessAction(payload) {
    return {
        type: TaskActionTypes.loadListSuccess,
        payload
    };

}

/**
 * Create actions.
 */
function createAction(payload) {
    return {
        type: TaskActionTypes.create,
        payload
    };

}

function createFailAction(payload) {
    return {
        type: TaskActionTypes.createFail,
        payload
    };

}

function createSuccessAction(payload) {
    return {
        type: TaskActionTypes.createSuccess,
        payload
    };

}

/**
 * Update actions.
 */
function updateAction(payload) {
    return {
        type: TaskActionTypes.update,
        payload
    };

}

function updateFailAction(payload) {
    return {
        type: TaskActionTypes.updateFail,
        payload
    };

}

function updateSuccessAction(payload) {
    return {
        type: TaskActionTypes.updateSuccess,
        payload
    };

}

/**
 * Remove actions.
 */
function removeAction(payload) {
    return {
        type: TaskActionTypes.remove,
        payload
    };

}

function removeFailAction(payload) {
    return {
        type: TaskActionTypes.removeFail,
        payload
    };

}

function removeSuccessAction(payload) {
    return {
        type: TaskActionTypes.removeSuccess,
        payload
    };

}

export default TaskActionTypes;