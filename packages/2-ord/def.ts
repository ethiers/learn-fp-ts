import {Eq} from 'fp-ts/Eq';

type Def = -1 | 0 | 1;

interface Ord<A> extends Eq<A> {
    readonly compare: (x: A, y: A) => Def;
}

const ordNumber: Ord<number> = {
    equals: (x, y) => x === y,
    compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
};

