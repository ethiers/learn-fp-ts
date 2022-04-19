// Testing a Semigroup instance

import 'mocha';
import fc from 'fast-check';
import { Semigroup } from 'fp-ts/Semigroup'

const S: Semigroup<string> = {
    concat: (x, y) => x + ' ' + y
}

const associativity = (x: string, y: string, z: string) =>
    S.concat(S.concat(x, y), z) === S.concat(x, S.concat(y, z))

const arb: fc.Arbitrary<string> = fc.string();

describe('Arbitrary', () => {
    it('my semigroup instance should be lawful', () => {
        fc.assert(fc.property(arb, arb, arb, associativity))
    })
})