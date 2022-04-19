import { getStructEq } from 'fp-ts/Eq'
// https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3

//A type class Eq, intended to contain types that admit equality, is declared in the following way
interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

const eqNumber: Eq<number> = {
  /** returns `true` if `x` is equal to `y` */
  equals: (x, y) => x === y
}

const eqString: Eq<String> = {
  /** returns `true` if `x` is equal to `y` */
  equals: (x, y) => x === y
}

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a));
}

console.log('elem(eqNumber)(1, [1,2,3]) = ', elem(eqNumber)(1, [1,2,3]));
console.log('elem(eqNumber)(4, [1,2,3]) = ', elem(eqNumber)(4, [1,2,3]));

console.log('elem(eqNumber)("seb", ["nic","luc","seb"]) = ', elem(eqString)("seb", ["nic","luc","seb"]));
console.log('elem(eqNumber)("seb", ["nic","luc","tom"]) = ', elem(eqString)("seb", ["nic","luc","tom"]));
