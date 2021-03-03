const { curry, pipe, add, negate, divide,__ } = require('ramda')
const { now, getTime } = require('../utils/date')
const { round } = require('../utils/math')

// getEndTime :: Number -> Number
const getEndTime = duration => pipe(
  now,
  getTime,
  add(duration * 1000)
)(duration)

const getCurrentSecond = endTime => pipe(
  now,
  getTime,
  negate,
  add(endTime),
  divide(__, 1000),
  round,
)(endTime)

export const countDownTimer = curry((fn, completed, duration) => {
  
  const endTime =  getEndTime(duration)
  let cancel
  const run = () => {
    const second = getCurrentSecond(endTime)
    if(second >= 0 ) {
      fn(second)
      // run
    } else {
      fn(duration)
      completed(duration)
      clearInterval(cancel)
    }
  }
  cancel = setInterval(run, 1000)
})
