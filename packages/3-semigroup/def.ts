export interface Semigroup<A> {
    concat: (a: A, y: A) => A;
}

/** number `Semigroup` under multiplication */
export const semigroupProduct: Semigroup<number> = {
    concat: (x, y) => x * y
};

/** number `Semigroup` under addition */
export const semigroupSum: Semigroup<number> = {
    concat: (x, y) => x + y
};

/** number `Semigroup` under string concatenation */
const semigroupString: Semigroup<string> = {
    concat: (x, y) => x + y
};

//// I can't find an instance!

function getFirstSemigroup<A = never>(): Semigroup<A> {
    return {concat: (x, y) => x};
}

function getLastSemigroup<A = never>(): Semigroup<A> {
    return {concat: (x, y) => y};
}

//// Another technique is to define a semigroup instance for Array<A> (*), called the free semigroup of A.

function getArraySemigroup<A = never>(): Semigroup<Array<A>> {
    return {concat: (x, y) => x.concat(y)}; // merge of two array
}

///Note. Here concat is the native array method, which kind of explains the initial choice for the name of the Semigroup operation.

function of<A>(a: A): Array<A> {
    return [a];
}




