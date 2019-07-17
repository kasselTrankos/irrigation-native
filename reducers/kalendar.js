import {ON_LOAD, ON_POST_KALENDAR, ON_LOAD_ERROR,
  ON_GET_DAY, ON_KALENDAR_DAYS, ON_SET_DATE, ON_DELETE} from '../constants';
import {YYYYMMDD, isBeforeNow} from './../utils/kalendar';

const initialState = {
  isFetching: false,
  error: false,
  date: new Date(),
  days: [],
  riegosToday: []
}
const getDay = days => current => days.filter(date => 
  current === date.day && !isBeforeNow(date)
);

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
    const riegos = getDay(action.days)(YYYYMMDD(new Date()));
    return {
      ...state,
      days: action.days,
      isFetching: false,
      riegosToday: riegos
    }
    case ON_SET_DATE:
    return {
      ...state,
      date: action.date,
      isFetching: false,
      error: true
    }
    case ON_GET_DAY:
      return {
        ...state,
        riegosToday: getDay(state.days)(YYYYMMDD(action.date))
      };
    case ON_DELETE:
      return {
        ...state,
        riegosToday: getDay(state.days)(YYYYMMDD(state.date))
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