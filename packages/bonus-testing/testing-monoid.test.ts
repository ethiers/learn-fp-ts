import 'mocha';
import fc from 'fast-check';
import { Monoid } from 'fp-ts/Monoid';
import { Semigroup } from 'fp-ts/Semigroup';

const S: Semigroup<string> = {
    concat: (x, y) => x + ' ' + y
    //concat: (x, y) => x + '' + y
};
const M: Monoid<string> = {
    ...S,
    empty: ''
};

const arb: fc.Arbitrary<string> = fc.string();

const rightIdentity = (x: string) => M.concat(x, M.empty) === x;
const leftIdentity = (x: string) => M.concat(M.empty, x) === x;


describe('Monoid laws', () => {
    it('my monoid instance should be lawful', () => {
        fc.assert(fc.property(arb, rightIdentity));
        fc.assert(fc.property(arb, leftIdentity));
    });
});