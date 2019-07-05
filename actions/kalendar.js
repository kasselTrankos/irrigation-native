import {HOST, ON_LOAD, ON_POST_KALENDAR, ON_KALENDAR_DAYS,
  ON_SET_DAY, ON_GET_DAY, ON_LOAD_ERROR} from '../constants';
import moment from 'moment';
// import {GetKalendarDays, PostKalendar} from './../services';
import {Fetch} from './../services';
export const getData = () => ({type: ON_LOAD})
export const onDay = date => ({date, type: ON_GET_DAY});
export const onData = data => ({type: ON_POST_KALENDAR});
export const onKalendarDays = days => ({days, type: ON_KALENDAR_DAYS});
export const onGetDay = date => ({date, type: ON_GET_DAY});
export const error = () => ({type: ON_LOAD_ERROR});



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
    dispatch(onGetDay(moment()));
  };
  const onError = () => dispatch(error());

  dispatch(getData());
  Fetch(`${HOST}/kalendar`).then(update).catch(onError);
};
export const setDay = date => dispatch => dispatch(onGetDay(date));
export const getDay = date => dispatch => dispatch(onGetDay(date));
