import {Either} from 'ramda-fantasy';

const compose = (fA, fB) => value => fA(fB(value));
const truthyEither = c => c ? Either.Right() : Either.Left();


const fromEither = real => optional => {
    const g = () => real;
    const f = () => optional;
    const either = Either.either(g, f);
    return f => {
      const is = compose(either, truthyEither);
      return cond => compose(is, f)(cond);
    }
  }


module.exports = {compose, fromEither};