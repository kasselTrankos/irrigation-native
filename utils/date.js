 const { curry } = require('ramda')
 const datetime = require('../elements/date-selector/src/date')
 import {setMidnight} from '../elements/date-selector/src/utils'
 
 
// isSameDaye :: datetime a -> Date b -> Boolean
export const isSameDay = curry((a, b) => {
  const dateB = new datetime(new Date(b.date))
  return a.map(setMidnight).equals(dateB.map(setMidnight))
})

// toDate :: a -> Date
export const toDate = x => new Date(x)

// getTime :: Date -> Number
export const getTime = d => d.getTime()


// now :: () -> Date
export const now = () => new Date()
