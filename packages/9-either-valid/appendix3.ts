import { Either, left, right, getValidation, map, fold, chain } from 'fp-ts/Either';
import { NonEmptyArray, getSemigroup } from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/function';
import { sequenceT } from 'fp-ts/Apply';
import { taskEither } from 'fp-ts'
import { TaskEither } from 'fp-ts/TaskEither'
import { Option } from 'fp-ts/Option'


interface Person {
    name: string;
    age: number;
    address: string;
}


const validateName = (s: string): Either<NonEmptyArray<string>, string> => s.length === 0 ? left(['Invalidate Name']) : right(s);
const validateAge = (s: number): Either<NonEmptyArray<string>, number> => isNaN(s) ? left(['Invalidate Age']) : right(s);
const validateIs18years = (s: number): Either<NonEmptyArray<string>, boolean> => s < 18 ? left(['is not 18 year old']) : right(true);
const validateAddress = (s: string): Either<NonEmptyArray<string>, string> => s.length === 0 ? left(['Invalidate Address']) : right(s);

const applicativeValidation = getValidation(getSemigroup<string>());

const toPerson = ([name, age, address]: [string, number, string]): Person => (
    {
        name,
        age,
        address
    }
);

function validationPerson(name: string, age: number, address: string): Either<NonEmptyArray<string>, Person> {
    return pipe(
        sequenceT(applicativeValidation)(validateName(name),validateAge(age),validateAddress(address) /*, validateIs18years(age)*/),
        map(toPerson),
    );
}

function ok(): string {
    return 'ok';
}

function nok(): string {
    return 'nok';
}

const validate = (name: string, age: number, address: string): Either<NonEmptyArray<string>, Person> => {
    return pipe(
        // TODO
        // validateIs18years(age),
        validationPerson(name, age, address),
    )
}

console.log('validate', validate('Seb', 19, '1234 av Chepas'));