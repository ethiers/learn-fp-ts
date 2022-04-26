// In fp-ts a synchronous effectful computation is represented by the IO type, which is basically a thunk,
// i.e. a function with the following signature: () => A

// In computer programming, a thunk is a subroutine used to inject an additional calculation into another subroutine.

// Note that IO represents a computation that never fails.

import { Either } from 'fp-ts/Either';
import { Lazy } from 'fp-ts/function'

export interface IO<A> {
    (): A
}

export interface IOEither<E, A> extends IO<Either<E, A>> {}

//export declare const tryCatch: <E, A>(f: () => A) => IOEither<E, A>
export declare const tryCatch: <E, A>(f: Lazy<A>, onThrow: (reason: unknown) => E) => IOEither<E, A>