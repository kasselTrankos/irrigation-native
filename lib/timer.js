const { curry } = require('ramda')
export const setTimerDonw = curry((f, completed, duration) => {
  const now = new Date()
  const end = new Date(now.getTime() + duration * 1000)
  let cancel
  const run = () => {
    const current = new Date().getTime()
    const second = Math.round((end - current) / 1000)
    if(second >= 0 ) {
      f(second)
      // run
    } else {
      f(duration)
      completed(duration)
      clearInterval(cancel)
    }
  }
  cancel = setInterval(run, 1000)
})
