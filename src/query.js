import Task from './../lib/task';
import { CONSTANTS } from './constants';


export const get = (path = CONSTANTS.CONFIG) => new Task((reject, resolve) => 
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

export const post = (path = CONSTANTS.KALENDAR, data = {}) => new Task((reject, resolve) => 
  fetch(`${CONSTANTS.HOST}://${CONSTANTS.DOMAIN}:${CONSTANTS.PORT}/${path}`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resolve)
  .catch(reject));

