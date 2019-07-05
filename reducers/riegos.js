import {ON_LOAD, ON_LOAD_SUCCES, ON_LOAD_ERROR} from './../constants';
const initialState = {
  data: [],
  isFetching: false,
  error: false
}

const riegos = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOAD:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case ON_LOAD_SUCCES:
      return {
        ...state,
        data: action.data,
        isFetching: false
      }
    case ON_LOAD_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
};
  
export default riegos