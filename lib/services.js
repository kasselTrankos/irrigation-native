import Async from 'crocks/Async'
const host ='164.90.128.239'
const port = 3000
const http = 'http://'

// getConfig -> () -> Async Error {}
export const getConfig = () => Async((rej, res) => fetch(`${http}${host}:${port}/config`)
.then(r => r.json())
.then(res)
.catch(rej))

// setConfig -> Number -> Async Error {}
export const setConfig = duration => Async((rej, res)=> fetch(`${http}${host}:${port}/config${duration}`,
{
  method: 'PUT',
  // body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(r => r.json())
.then(res)
.catch(rej))

