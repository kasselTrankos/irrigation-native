import Task from './../lib/task';


export const timer = time => setTimeout(()=> {
  new Task((reject)=> {
    reject('timeout');
  });
}, time);

export const get = ({HOST, DOMAIN, PORT, PATH, TIME}) => new Task((reject, resolve) => {
  let _end = false;
  const timer = setTimeout(()=> {
    _end = true;
    reject( 'timer end===')
  }, TIME);
  fetch(`${HOST}://${DOMAIN}:${PORT}/${PATH}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.json())
  .then((e)=> {
    if(!_end) {
      clearTimeout(timer)
      resolve(e)
    } else {
      reject();
    }
  })
  .catch(reject);
});

export const post = ({HOST, DOMAIN, PORT, PATH}, data = {}) => new Task((reject, resolve) => 
  fetch(`${HOST}://${DOMAIN}:${PORT}/${PATH}`, {
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

