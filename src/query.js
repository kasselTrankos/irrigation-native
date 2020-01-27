import {Future} from './../lib/fp';
import { CONSTANTS } from './constants';


export const get = (path = CONSTANTS.GET_CONFIG) =>new Future((reject, resolve) => 
  fetch(`${CONSTANTS.HOST}://${CONSTANTS.DOMAIN}:${CONSTANTS.PORT}/${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.json())
  .then(data =>resolve(data))
  .catch(err => reject(err)));
