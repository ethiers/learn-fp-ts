// There's another way to build a semigroup instance for a type A: if we already have an
// Ord instance for A, then we can "turn it" into a semigroup.

import { ordNumber } from 'fp-ts/Ord';
import { getMeetSemigroup, getJoinSemigroup } from 'fp-ts/Semigroup';
import { Semigroup } from './def';

/** Takes the minimum of two values */
//  note: getMeetSemigroup is diprecated
const semigroupMin: Semigroup<number> = getMeetSemigroup(ordNumber);

/** Takes the maximum of two values */
//  note: getJoinSemigroup is diprecated
const semigroupMax: Semigroup<number> = getJoinSemigroup(ordNumber);

console.log(semigroupMin.concat(2, 1)); // 1
console.log(semigroupMax.concat(2, 1)); // 2










