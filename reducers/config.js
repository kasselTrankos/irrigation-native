import {ON_LOAD, ON_PUT_DURATION, ON_LOAD_ERROR, SET_DURATION} from '../constants';
const initialState = {
  _id: 0,
  duration: 0,
  isFetching: false,
  error: false
}

const config = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOAD:
      return {
        ...state,
        _id: 0,
        duration: 0,
        isFetching: true
      }
    case ON_PUT_DURATION:
      return {
        ...state,
        ...action.data,
        isFetching: false
      }
    case ON_LOAD_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case SET_DURATION: 
      return {
        ...state,
        duration: action.duration,
        isFetching: false,
        error: false
      }
    default:
      return state
  }
};
  
export default config