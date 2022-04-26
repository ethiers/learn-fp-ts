import { Either, getValidation, left, right, map } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { NonEmptyArray, getSemigroup } from 'fp-ts/NonEmptyArray';
import { sequenceT } from 'fp-ts/Apply';

interface Person {
    name: string,
    age: number
}

const applicativeValidation = getValidation(getSemigroup<string>());

const toPerson = ([name, age]: [string, number]): Person => ({
    name,
    age,
});

const validateName = (s: string): Either<NonEmptyArray<string>, string> => s.length === 0 ? left(['Invalidate Name']) : right(s);
const validateAge = (s: string): Either<NonEmptyArray<string>, number> => isNaN(+s) ? left(['Invalidate Age']) : right(+s);

function validatePerson(name: string, age: string): Either<NonEmptyArray<string>, Person> {
    return pipe(
        sequenceT(applicativeValidation)(validateName(name), validateAge(age)),
            map(toPerson)
        )
}

console.log('validatePerson', validatePerson('sebastien', '44'));
console.log('validatePerson', validatePerson('', '44'));
console.log('validatePerson', validatePerson('sebastien', 'A44'));
console.log('validatePerson', validatePerson('', 'A44'));