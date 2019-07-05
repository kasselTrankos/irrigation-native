import {ON_LOAD, ON_POST_KALENDAR, ON_LOAD_ERROR,
  ON_GET_DAY, ON_KALENDAR_DAYS, ON_SET_DATE} from '../constants';
import moment from 'moment';

const initialState = {
  isFetching: false,
  error: false,
  date: new Date(),
  days: [],
  riegosToday: []
}
const getDay = days => date => days.filter(({day}) => date === day);

const config = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOAD:
    return {
      ...state,
      isFetching: true
    }
    case ON_POST_KALENDAR:
    return {
      ...state,
      isFetching: false
    }
    case ON_KALENDAR_DAYS: 
    return {
      ...state,
      days: action.days,
      isFetching: false
    }
    case ON_SET_DATE:
    return {
      ...state,
      date: action.date,
      isFetching: false,
      error: true
    }
    case ON_GET_DAY:
      const riegosToday =  getDay(state.days)(action.date.format('YYYY-MM-DD'));
      return {
        ...state,
        riegosToday
      };
    case ON_LOAD_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};
  
export default config