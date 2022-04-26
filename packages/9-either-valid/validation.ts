// Validations are much like Either<E, A>, they represent a computation that might fail with an error of type E or
// succeed with a value of type A, but as opposed to the usual computations involving Either, they are able to collect
// multiple failures.

import { getSemigroup, NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { getValidation } from 'fp-ts/Either';
import { Either, mapLeft, map, chain } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { minLength, oneCapital, oneNumber } from './either';
import { sequenceT } from 'fp-ts/Apply';

const applicativeValidation = getValidation(getSemigroup<string>());

// let's define a combinator that converts a check outputting an Either<E, A> into a check outputting a
// Either<NonEmptyArray<E>, A>
function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
    return a => pipe(
        check(a),
        mapLeft(a => [a])
    );
}

const minLengthV = lift(minLength);
const oneCapitalV = lift(oneCapital);
const oneNumberV = lift(oneNumber);

// combine all error
function validatePassword(s: string): Either<NonEmptyArray<string>, string> {
    return pipe(
        sequenceT( applicativeValidation /*getValidation(getSemigroup<string>())*/)(
            minLengthV(s),
            oneCapitalV(s),
            oneNumberV(s)
        ),
        map(() => s)
    );
}

// yield first error detected
function validatePassword2(s: string): Either<string, string> {
    return pipe(
        oneNumber(s),
        chain(oneCapital),
        chain(minLength)
    );
}

console.log('validatePassword', validatePassword('ab'));
console.log('validatePassword', validatePassword2('ab'));

