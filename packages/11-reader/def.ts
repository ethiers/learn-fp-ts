// The purpose of the Reader monad is to avoid threading arguments through multiple functions in order to only get them where they are needed.
//
// One of the ideas presented here is to use the Reader monad for dependency injection.

export interface Reader<R, A> {
    (r: R): A
}

// R represent an "environment" needed for the computation
// A is the result
