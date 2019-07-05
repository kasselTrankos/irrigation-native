import {HOST, ON_LOAD, ON_LOAD_SUCCES, ON_LOAD_ERROR} from './../constants';

export const getData = () => ({type: ON_LOAD})
export const onData = data => ({data, type: ON_LOAD_SUCCES});
export const onErrorr = () => ({type: ON_LOAD_ERROR});

export const getRiegos = () => {
  return dispatch => {
    dispatch(getData());
    fetch(`${HOST}/riegos`)
    .then((response) => response.json())
    .then(json => dispatch(onData(json)))
    .catch(error => dispatch(onErrorr()));
  };
}