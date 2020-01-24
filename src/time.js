import {Future} from './../lib/fp';
export const getTime = date => date.getTime();
export const secondsBetween = end =>  (begin = new Date()) =>
  new Date(getTime(end) - getTime(begin)).getSeconds();
export const lt =  (end, current = new Date()) => getTime(current) < getTime(end);


