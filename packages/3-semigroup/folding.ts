// The fold function takes a semigroup instance, an initial value and an array of elements:

import { fold } from 'fp-ts/Semigroup';
import { getApplySemigroup, some, none } from 'fp-ts/Option';
import { semigroupProduct, semigroupSum } from './def';

const sum = fold(semigroupSum);

console.log(sum(1, [1,2,3,4])); // 11

const product = fold(semigroupProduct);

console.log(product(2, [1,2,3,4])); // 48

const S = getApplySemigroup(semigroupSum);

console.log(S.concat(some(1), none));
console.log(S.concat(some(1), some(2)));




