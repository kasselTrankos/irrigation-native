import { NativeModules } from "react-native";

const curryN = (n, f) => {
  return function curried (...args) {
    return args.length >= n ? f(...args) : (...rest) => curried(...args, ...rest)
  }
}
const curry = (f) => curryN(f.length, f);
const compose = (...fns) => x => fns.reduceRight((v, f)=> f(v), x);
const setMinutes = curry((minutes, date) => new Date(date.setMinutes(minutes)))
const setUTCHours = curry((hour, date) => new Date(date.setUTCHours(hour)));
const setUTCSeconds = curry((hour, date) => new Date(date.setUTCSeconds(hour)));
const setUTCMilliseconds = curry((hour, date) => new Date(date.setUTCMilliseconds(hour)));
const setMidnight = compose(setUTCMilliseconds(0), setUTCSeconds(0), setMinutes(0), setUTCHours(0));
const toDate = x => new Date(x);
const getDate = xs => xs.getDate();
const getMonth = xs => xs.getMonth();
const daysFromMonday = date => date.getDay() + (date.getDay() ===0 ? 6 : -1);
const subtract = value => value * -1;
const milliSeconds = value => value * 24 * 60 * 60 * 1000;
const getMonday = date => compose(toDate, milliSeconds, subtract, daysFromMonday)(date);
const min = curry((orign, current) => Math.min(orign, current));
const max = curry((orign, current) => Math.max(orign, current));

module.exports = {getMonday, getDate, getMonth, setMidnight, min, max};