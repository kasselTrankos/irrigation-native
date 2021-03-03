const {countDownTimer} = require('../lib/timer')

describe('TIMER', ()=> {
  test('countDownTimer', ()=> {
    jest.useFakeTimers()
    const callback = jest.fn()
    countDownTimer(callback, ()=> true, 3)
    jest.advanceTimersByTime(3000)
    expect(callback).toHaveBeenCalledTimes(3)
  })
})
