import {applyMiddleware, createStore} from 'redux';
import {apiMiddleware} from "./ApiMiddleware";
import TaskReducer from "./TaskReducer";


export default createStore(TaskReducer, {}, applyMiddleware(apiMiddleware));