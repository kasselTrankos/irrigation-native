const { converge, curry, pipe, prop, add, negate, __, multiply } = require('ramda')
const { toSafeNumber, fixedNumber, floor} = require('./math')


// getPageY :: {} -> Number
const getPageY = pipe(
  prop('pageY'),
  toSafeNumber
)
// getPagex :: {} -> Number
const getPageX = pipe(
  prop('pageX'),
  toSafeNumber
)

const findCell = (rows, radius) => (x, y)=> {
  const right = Math.floor(x / radius);
  const bottom = Math.floor(y / radius);
  return right + rows * bottom;;
};


/// addThreeValues :: Number -> Number -> Nyumber -> Number
const addThreeValues = curry((x,y,z)=> x + y + z )




// getTop :: Number -> {} -> Number 
export const getTop = curry((rows, radius, top, obj) => pipe(
  converge(addThreeValues(negate(top)), [getPageX, getPageY]),
  y => ({x: getPageX(obj), y}),
  converge((x, y) => ({x: floor(x)(radius), y: floor(y)(radius)}) , [prop('x'), prop('y')]),
  converge((x, y) => multiply(add(x)(rows))(y), [prop('x'), prop('y')])
)(obj))
