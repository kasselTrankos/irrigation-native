import {Future} from './irrigate';
const getTime = date => date.getTime();
const secondsBetween = end =>  (begin = new Date()) =>
  new Date(getTime(end) - getTime(begin)).getSeconds();
const lt =  (end, current = new Date()) => getTime(current) < getTime(end);

function cutDown(time) {
    const end = new Date(getTime(new Date()) + (time * 1000));
    const secondsFromNow = secondsBetween(end);
    return new Future((_, resolve) => {
      const counter = () => {
        if(lt(end)) {
          this.setState(() => ({ counter: secondsFromNow()}));
          return requestAnimationFrame(counter);
        }
        resolve();
      }
      counter();
    });
  };

  module.exports = cutDown;