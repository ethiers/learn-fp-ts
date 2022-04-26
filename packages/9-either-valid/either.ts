// The Either<E, A> type represents a computation that might fail with an error of type E or succeed with a value of
// type A, so is a good candidate for implementing our validation rules.

import { Either, left, right, chain } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export const minLength = (s: string): Either<string, string> => s.length > 6 ? right(s) : left('at least 6 characters!');

console.log('minLength', minLength('sebastien'));
console.log('minLength', minLength('seb'));

export const oneCapital = (s: string): Either<string, string> => /[A-Z]/g.test(s) ? right(s) : left('at least on capital');

console.log('oneCapital', oneCapital('sebastien'));
console.log('oneCapital', oneCapital('Sebastien'));

export const oneNumber = (s: string): Either<string, string> => /[0-9]/g.test(s) ? right(s) : left('at least one number');

console.log('oneNumber', oneNumber('sebastien'));
console.log('oneNumber', oneNumber('Sebastien1'));

const validationPassword = (s: string): Either<string, string> =>
    // We can chain all the rules using... chain
    pipe(
        minLength(s),
        chain(oneCapital),
        chain(oneNumber),
    );

console.log('validationPassword', validationPassword('vL123456'));