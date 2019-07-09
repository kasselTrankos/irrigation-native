import { getWeek, getNextWeek, isBeforeNow, getPrevWeek,
  getDaysBetween } from '../src/kalendar';
import moment from 'moment';
const expect = require('chai').expect;

describe('KALENDAR', () => {
  it('When is no current date given obtains current week and start with startOf', () => {
    const startOfWeek = moment().startOf('isoWeek');
    const start = moment().startOf('isoWeek').add(-1, 'days');
    const week = getWeek();
    const [monday] = week;
    week.forEach(({date}) => {
      expect(moment(date).format('DD')).to.be.equal(start.add(1, 'days').format('DD'));
    });
    expect(moment(monday.date).format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
  it('When is clicked once nextWeek() get next week from actual', () => {
    const startOfWeek = moment().add(7, 'days').startOf('isoWeek');
    const start = moment().add(7, 'days').startOf('isoWeek').add(-1, 'days');
    const week = getNextWeek();
    const [monday] = week;
    week.forEach(({date}) => {
      expect(moment(date).format('DD')).to.be.equal(start.add(1, 'days').format('DD'));
    });

    expect(moment(monday.date).format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
  it('When is clicked prevWeek() get previous week from actual', () => {
    const startOfWeek = moment().subtract(7, 'days').startOf('isoWeek');
    const [monday] = getPrevWeek();
    expect(moment(monday.date).format('DD')).to.be.equal(startOfWeek.format('DD'));
  });
  it('Only today has property isToday:true', () => {
    const now = moment();
    const days = getWeek();
    days.forEach(({date, isToday})=> {
      if(now.format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')) {
        expect(isToday).to.be.true;
      } else {
        expect(isToday).to.be.false;
      }
    });
  });
  it(`When is clicked a lot untill last week of agost`, () => {
    getNextWeek();
    getNextWeek();
    getNextWeek();
    getNextWeek();
    const days = getNextWeek();

    days.forEach(({date, isToday})=> {
      expect(isToday).to.be.false;
    });
  });
  it('isBeforeNow lower and higer', () => {
    const lower = {day: moment().add(-1, 'days').format('YYYY-MM-DD'),
      hour: 12, minute: 12};
    const higher = {day: moment().add(1, 'days').format('YYYY-MM-DD'),
      hour: 12, minute: 12};
    expect(isBeforeNow(lower)).to.be.true;
    expect(isBeforeNow(higher)).to.be.false;
  });
  it('getDaysBetween', () => {
    let lower = moment().add(-12, 'days').toDate();
    const days = getDaysBetween(lower)(new Date());
    expect(days.length).to.be.equal(12);
  });


});