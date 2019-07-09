import {substract, lt, compose, Equivalence, ToDate, add} from './sanctuary';
import {cast, tz, clone, midnight, moveToDate, toDay,
  getDate, plusDays} from './date.utils';

const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}



const Midnight = ToDate(x=> new Date(x))
  .contramap(tz).contramap(midnight).contramap(clone);
const isSame = Equivalence((x, y) => x === y)
  .contramap(cast).contramap(Midnight.f).contramap(clone);
const isLower = Equivalence((x, y) => lt(x)(y))
  .contramap(cast).contramap(tz).contramap(clone);



const startWeek = (date = new Date()) => 
  Midnight.f(compose(moveToDate(date), getStartWeek)(date));

const getStartWeek = date => date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
const fillDays = (current = new Date()) => (_,index) => {
  const date = compose(compose(Midnight.f, plusDays(index)), clone)(current);
  const isToday = isSame.f(date, new Date())
  return { date, isToday }
};
const getDaysFrom = (length = 7) => (current = new Date()) =>
  Array.from({length}, fillDays(current));

const diffDays = dateA => dateB => {
  const startDate = compose(substract, cast)(dateB);
  return compose(toDay, compose(startDate, cast))(dateA);
};


export const isBeforeNow  = date => isLower.f(getDate(date), new Date());
export const getNextWeek = (date = new Date()) => compose(getWeek, plusDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, plusDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];
export const getWeek = (date = new Date()) => compose(getDaysFrom(7), startWeek)(date);

export const getDaysBetween = dateA => dateB => {
  const days = compose(getDaysFrom, compose(add(1), diffDays(dateA)))(dateB);
  return days(dateA);
}
export const isBefore = dateA => dateB => isLower.f(dateA, dateB);
export const YYYYMMDD = date => {
  const year = date.getFullYear();
  const month = date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}
export const DDMMYYYY = date => {
  const year = date.getFullYear();
  const month = date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  return `${day}/${month}/${year}`;
}
export const isSameAs = ([valueA, valueB]) => isSame.f(valueA, valueB);
export const DD = date => date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();