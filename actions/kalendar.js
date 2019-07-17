import {HOST, ON_LOAD, ON_POST_KALENDAR, ON_KALENDAR_DAYS,
  ON_GET_DAY, ON_LOAD_ERROR, ON_DELETE} from '../constants';
import {Fetch} from './../services';



export const getData = () => ({type: ON_LOAD})
export const onDay = date => ({date, type: ON_GET_DAY});
export const onData = () => ({type: ON_POST_KALENDAR});
export const onKalendarDays = days => ({days, type: ON_KALENDAR_DAYS});
export const onGetDay = date => ({date, type: ON_GET_DAY});
export const error = () => ({type: ON_LOAD_ERROR});
export const onDelete = () => ({type: ON_DELETE});



export const postKalendar = data => dispatch => {
  const onError = () => dispatch(error());
  dispatch(getData());
  Fetch(`${HOST}/kalendar`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{'Content-Type': 'application/json'}
  })
  .then(onData).catch(onError);
};

export const getKalendarDays = () => dispatch => {
  const update = data => {
    dispatch(onKalendarDays(data));
  };

  dispatch(getData());
  Fetch(`${HOST}/kalendar`).then(update).catch(dispatch(error()));
};
export const setDay = date => dispatch => dispatch(onGetDay(date));
export const getDay = date => dispatch => dispatch(onGetDay(date));
export const deleteDay = uuid => dispatch => {
  dispatch(getData());
  Fetch(`${HOST}/kalendar/${uuid}`, {
    method: 'DELETE',
    headers:{'Content-Type': 'application/json'},
  })
  .then(() => {
    
    dispatch(onDelete());
    getKalendarDays()(dispatch);
  }).catch(dispatch(error()));
};

