import {Either} from 'ramda-fantasy';
export { Equivalence } from './Equivalence';
export { ToDate } from './toDate';


const truthyEither = c => c ? Either.Right() : Either.Left();

export const lt = valueA => valueB => valueA < valueB;
export const compose = (fA, fB) => value => fA(fB(value));
export const add = valueA => valueB => valueA + valueB;
export const fromEither = real => optional => {
  const g = () => real;
  const f = () => optional;
  const either = Either.either(g, f);
  return f => {
    const is = compose(either, truthyEither);
    return cond => compose(is, f)(cond);
  }
}
