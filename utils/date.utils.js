import {add, compose} from './sanctuary';

const timezone = (date = new Date()) => date.getTimezoneOffset() * 60 * 1000 * -1;

export const midnight = date => new Date(date.setHours(0,0,0,0));
export const cast = date => +new Date(date);
export const tz = date => new Date(compose(add(date.getTime()), timezone)(date))
export const moveToDate = (date = new Date) => diff => new Date(date.setDate(diff));
export const toDay = date => Math.abs(Math.round(date / (1000 *60*60*24)));
export const clone = date => new Date(date.getTime());
export const getDate = date => {
  const [year, month, day] = date.day.split('-');
  const {hour = 0, minute = 0} = date;
  return new Date(year, month - 1, day, hour, minute, 0);
}
export const plusDays = days => (date = new Date()) => 
  new Date(clone(date).setDate(date.getDate() + days));