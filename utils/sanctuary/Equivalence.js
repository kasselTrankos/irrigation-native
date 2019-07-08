import {tagged} from 'daggy';
const Equivalence = tagged('Equivalence', ['f']);

Equivalence.prototype.contramap =function (g) {
  return Equivalence(
    (x, y) => this.f(g(x), g(y))
  )
}


module.exports = {Equivalence};