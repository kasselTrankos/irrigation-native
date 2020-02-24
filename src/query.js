import Task from './../lib/task';
import { CONSTANTS } from './constants';


export const get = (path = CONSTANTS.GET_CONFIG) => new Task((reject, resolve) => 
  fetch(`${CONSTANTS.HOST}://${CONSTANTS.DOMAIN}:${CONSTANTS.PORT}/${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.json())
  .then(resolve)
  .catch(reject));
