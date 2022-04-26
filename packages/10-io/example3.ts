import { log } from 'fp-ts/Console';
import { IO, io } from 'fp-ts/IO';
import { Option, some, chain, fold, none, ap } from 'fp-ts/Option';
import { pipe } from 'fp-ts/pipeable';
import { constVoid, constTrue } from 'fp-ts/function';

function is18yearsOld(age: number): Option<boolean> {
    // console.log('aaa', age >= 18 ? some(true) : some(false));
    return age >= 18 ? some(true) : some(false);
}

function program(input: number): IO<void> {
    return pipe(
        some(input),
        chain(is18yearsOld),
        // return my side effect only if there is a value
        fold(() => io.of(constVoid), (s) => () => console.log(s))
        // fold(() => io.of(constVoid), log )
        // log
    );
}

function program2(input: number): IO<void> {
    return pipe(
        some(input),
        chain(is18yearsOld),
        fold(() => io.of(constVoid), (s) => () => console.log(s))
    );
}

program(17)();
program(19)();

program2(17)();
program2(19)();