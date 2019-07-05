import {createStore, applyMiddleware} from 'redux';
import Reducers from './../reducers'
import thunk from 'redux-thunk'

export default configureStore = () => createStore(Reducers, applyMiddleware(thunk));