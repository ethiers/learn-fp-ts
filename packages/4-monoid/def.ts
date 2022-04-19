// As usual in fp-ts the type class Monoid, contained in the fp-ts/Monoid module, is implemented as a TypeScript
// interface, where the neutral value is named empty

import { Semigroup } from 'fp-ts/Semigroup';

interface Monoid<A> extends Semigroup<A> {
    readonly empty: A;
}

/** number `Monoid` under addition */
const monoidSum: Monoid<number> = {
    concat: (x, y) => x + y,
    empty: 0
};

/** number `Monoid` under multiplication */
const monoidProduct: Monoid<number> = {
    concat: (x, y) => x * y,
    empty: 1
};

const monoidString: Monoid<string> = {
    concat: (x, y) => x + y,
    empty: ''
};

/** boolean monoid under conjunction */
const monoidAll: Monoid<boolean> = {
    concat: (x, y) => x && y,
    empty: true
};

/** boolean monoid under disjunction */
const monoidAny: Monoid<boolean> = {
    concat: (x, y) => x || y,
    empty: false
};

export { Monoid, monoidSum, monoidProduct, monoidString, monoidAll, monoidAny };