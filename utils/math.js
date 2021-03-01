const { curry, multiply, add } = require('ramda')

// toNumber :: a -> Number
export const toNumber = x => Number(x)

// fixedNumber:: Number -> Number -> Number
export const fixedNumber = x => y => y.toFixed(x)

// toSafeNumber :: a -> Number 
export const toSafeNumber = x => x ? Number(x) : 0

// findCell :: Number .> Number
// export const findRightBottom = curry((rows, right, bottom) => right + rows * bottom)

// min -> Number -> Number -> Number
export const min = curry((x, y) => Math.min(x, y));
// max -> Number -> Number -> Number
export const max = curry((x, y) => Math.max(x, y));
// floor -> Number -> Number -> Number
export const floor = curry((x, y) => Math.floor(x, y));
