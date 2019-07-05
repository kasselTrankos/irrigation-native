
import {combineReducers} from 'redux';
import riegos from './riegos';
import config from './config';
import kalendar from './kalendar';


export default combineReducers({
  riegos,
  config,
  kalendar
})