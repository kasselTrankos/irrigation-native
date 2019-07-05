import {HOST, ON_LOAD, ON_PUT_DURATION, ON_LOAD_ERROR, SET_DURATION} from '../constants';
import {Fetch} from './../services';

export const getData = () => ({type: ON_LOAD})
export const onData = data => ({data, type: ON_PUT_DURATION});
export const error = () => ({type: ON_LOAD_ERROR});
export const updateDuration = (duration) => ({ duration, type: SET_DURATION});


export const setDuration = value => dispatch => dispatch(updateDuration(value));
export const getConfig = () => dispatch => {
  const onResponse = data => dispatch(onData(data));
  const onError = () => dispatch(error());

  dispatch(getData());
  Fetch(`${HOST}/config`).then(onResponse).catch(onError);
};
export const putDuration = ({_id, duration}) => dispatch => {
  const onResponse = () =>  dispatch(updateDuration(duration));
  const onError = () => dispatch(error());
  
  dispatch(getData());
  Fetch(`${HOST}/config/${_id}/${duration}`, {
    method: 'PUT',
    headers:{'Content-Type': 'application/json'}
  }).then(onResponse).catch(onError);
};
