import { log } from 'fp-ts/Console';
import { IO, io } from 'fp-ts/IO';
import { Option, some, chain, fold, none } from 'fp-ts/Option';
import { pipe } from 'fp-ts/pipeable';
import { constVoid } from 'fp-ts/function'

function getCaractersA(s: string): Option<string> {
    return s.length > 3 ? some(s.substring(3)) : none;
}

function program(input: string): IO<void> {
    return pipe(
        some(input), // act like filter from rxjs
        chain(getCaractersA),
        // return my side effect only if there is a value
        //fold(() => io.of(undefined), log)
        fold(() => io.of(constVoid), log)
    );
}

program('foo')() // no output
program('barbaz')() // outputs "baz" to the console