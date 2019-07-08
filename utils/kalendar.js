import {lt, add, compose, Equivalence, ToDate} from './sanctuary';

const months = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
const tz = date => new Date(add(date.getTime())(date.getTimezoneOffset() * 60 * 1000 * -1));
const setMidNight = date => new Date(date.setHours(0,0,0,0));
const toMidnight = ToDate(x=> new Date(x)).contramap(tz).contramap(setMidNight);
const isSame = Equivalence((x, y)=>+x === +y);

const startWeek = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1);
  return toMidnight.f(new Date(date.setDate(diff)));
};
const addDays = days => (date = new Date()) => toMidnight.f(new Date(date.setDate(date.getDate() + days)));

const getDaysFrom = (length = 7) => (current = new Date()) => {
  const fillDays = (_,index) => {
    const date = compose(addDays(index), startWeek)(current);
    const isToday = isSame.contramap(toMidnight.f).f(date, new Date())
    return { date, isToday }
  };
  return Array.from({length}, fillDays);
};


export const  isBeforeNow  = ({day, hour, minute}) => {
  const [year, month, _day] = day.split('-');
  return lt(+new Date(year, month, _day, hour, minute, 0))(+new Date());
};
export const getWeek = getDaysFrom(7);
export const getNextWeek = (date = new Date()) => compose(getWeek, addDays(7))(date);
export const getPrevWeek = (date = new Date()) => compose(getWeek, addDays(-7))(date);
export const getMonthName =  (date = new Date()) => months.es[date.getMonth()];
