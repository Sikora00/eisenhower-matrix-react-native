import {applyMiddleware, createStore} from 'redux';
import {apiMiddleware} from "./apiMiddleware";
import TaskReducer from "./TaskReducer";


export default createStore(TaskReducer, {}, applyMiddleware(apiMiddleware));