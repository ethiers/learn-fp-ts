import { getApplyMonoid, getFirstMonoid, getLastMonoid, some, none } from 'fp-ts/Option';
import { getStructMonoid, fold } from 'fp-ts/Monoid';
import { Monoid, monoidAll, monoidAny, monoidProduct, monoidString, monoidSum } from './def';

type Point = {
    x: number,
    y: number
}

const monoidPoint: Monoid<Point> = getStructMonoid({
    x: monoidSum,
    y: monoidSum,
});

type Vector = {
    from: Point,
    to: Point,
}

const monoidVector: Monoid<Vector> = getStructMonoid({
    from: monoidPoint,
    to: monoidPoint,
});

//When using a monoid instead of a semigroup, folding is even simpler: we don't need to explicitly provide an
// initial value (the implementation can use the monoid's empty value for that)

console.log(fold(monoidSum)([1, 2, 3, 4])); // 10
console.log(fold(monoidProduct)([1, 2, 3, 4])); // 24
console.log(fold(monoidString)(['a', 'b', 'c'])); // abc
console.log(fold(monoidAll)([true, false, true])); // false
console.log(fold(monoidAny)([true, false, true])); // true

const M = getApplyMonoid(monoidSum);

console.log('--------------------------------------------\n' +
    'If we can find a monoid instance for A then we can derive a monoid instance for Option<A> (via getApplyMonoid) which works like this'
);
console.log(M.concat(some(1), none)); // none
console.log(M.concat(some(2), some(2))); // some(4)
console.log(M.concat(some(1), M.empty)); // some(1)

const firstM = getFirstMonoid<number>();

console.log('--------------------------------------------\n' +
    'getFirstMonoid... Monoid returning the left-most non-None value'
);

console.log(firstM.concat(some(1), none)); // none
console.log(firstM.concat(some(2), some(2))); // some(4)
console.log(firstM.concat(some(1), M.empty)); // some(1)

const lastM = getLastMonoid<number>();

console.log('--------------------------------------------\n' +
    'getLastMonoid... Monoid returning the right-most non-None value'
);
console.log(lastM.concat(some(1), none)); // none
console.log(lastM.concat(some(2), some(2))); // some(4)
console.log(lastM.concat(some(1), M.empty)); // some(1)