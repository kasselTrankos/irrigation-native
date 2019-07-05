const Fetch = (url, query={}) => new Promise((resolve, reject)=> {
  fetch(url, query)
  .then((response) => response.json())
  .then(resolve)
  .catch(reject);
});


module.exports = {Fetch};