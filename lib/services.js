import Async from 'crocks/Async'
const { curry } = require('ramda')
const host ='164.90.128.239'
const port = 3000
const http = 'http://'

// getConfig -> () -> Async Error {}
export const getConfig = () => Async((rej, res) => fetch(`${http}${host}:${port}/config`)
  .then(r => r.json())
  .then(res)
  .catch(rej))

// getConfig -> () -> Async Error {}
export const getIrrigations = () => Async((rej, res) => fetch(`${http}${host}:${port}/kalendar`)
  .then(r => r.json())
  .then(res)
  .catch(rej))

// setConfig -> Number -> Async Error {}
export const setConfig = duration => Async((rej, res)=> fetch(`${http}${host}:${port}/config`,
{
  method: 'PUT',
  body: JSON.stringify({duration}),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(r => r.json())
  .then(res)
  .catch(rej))

// postIrrigate -> Number -> Number -> Async Error {}
export const postIrrigate = curry((date, duration) => Async((rej, res)=> fetch(`${http}${host}:${port}/kalendar`,
{
  method: 'POST',
  body: JSON.stringify({duration, date}),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(r => r.json())
  .then(res)
  .catch(rej)))

// deleteIrrigate -> String -> Async Error {}
export const deleteIrrigate = date => Async((rej, res)=> fetch(`${http}${host}:${port}/kalendar`,
{
  method: 'DELETE',
  body: JSON.stringify({date}),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(r => r.json())
  .then(res)
  .catch(rej))
