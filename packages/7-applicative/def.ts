import { Functor } from 'fp-ts/Functor';
import { HKT } from 'fp-ts/HKT';
import { flatten } from 'fp-ts/Array';
import { Option, some, none, isNone } from 'fp-ts/Option';
import { Task } from 'fp-ts/Task';
//import { Apply } from 'fp-ts/Apply';

interface Apply<F> extends Functor<F> {
    ap: <C, D>(fcd: HKT<F, (c: C) => D>, fc: HKT<F, C>) => HKT<F, D>;
}

// Example (F = Array)
const applicativeArray = {
    map: <A, B>(fa: Array<A>, f: (a: A) => B): Array<B> => fa.map(f),
    of: <A>(a: A): Array<A> => [a],
    ap: <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> =>
        flatten(fab.map(f => fa.map(f)))
};

// Example (F = Option)
const applicativeOption = {
    map: <A, B>(fa: Option<A>, f: (a: A) => B): Option<B> =>
        isNone(fa) ? none : some(f(fa.value)),
    of: <A>(a: A): Option<A> => some(a),
    ap: <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> =>
        isNone(fab) ? none : applicativeOption.map(fa, fab.value)
};

// Example (F = Task)
const applicativeTask = {
    map: <A, B>(fa: Task<A>, f: (a: A) => B): Task<B> => () => fa().then(f),
    of: <A>(a: A): Task<A> => () => Promise.resolve(a),
    ap: <A, B>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> => () =>
        Promise.all([fab(), fa()]).then(([f, a]) => f(a))
};

// Lifting

type Curried2<B, C, D> = (b: B) => (c: C) => D

function liftA2<F>(
    F: Apply<F>
): <B, C, D>(g: Curried2<B, C, D>) => Curried2<HKT<F, B>, HKT<F, C>, HKT<F, D>> {
    return g => fb => fc => F.ap(F.map(fb, g), fc);
}