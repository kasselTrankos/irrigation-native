import Task from './../lib/task';
let h = 0;

export const delay = time => {
  let t;
  return new Task((_, resolve)=> {
    t = setTimeout(() => resolve({duration: 34}), time);
  }, () => console.log('cancel timer') || clearTimeout(t));
};

export const get = ({HOST, DOMAIN, PORT, PATH}) => {
  const controller = new AbortController();
  const {signal} = controller;

  return new Task((reject, resolve) => {
    fetch(`${HOST}://${DOMAIN}:${PORT}/${PATH}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal
    })
    .then(res => res.json())
    .then(resolve)
    .catch(reject);
  }, ()=> console.log('stopdddd posible query') || controller.abort());

};

export const post = ({HOST, DOMAIN, PORT, PATH}, data = {}) => {
  const controller = new AbortController();
  const {signal} = controller;

  return new Task((reject, resolve) => {
    fetch(`${HOST}://${DOMAIN}:${PORT}/${PATH}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal
    })
    .then(res => res.json())
    .then(resolve)
    .catch(reject)
  }, ()=> controller.abort());
};

