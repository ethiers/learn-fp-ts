import { ask, chain, Reader } from 'fp-ts/Reader';
import { pipe } from 'fp-ts/function'

interface Dependencies {
    i18n: {
        true: string
        false: string
    },
    lowerBound: number
}

const instance: Dependencies = {
    i18n: {
        true: 'vero',
        false: 'falso'
    },
    lowerBound: 2
};

//const f = (b: boolean): ((deps: Dependencies) => string) => deps => (b ? deps.i18n.true : deps.i18n.true);
const f = (b: boolean): Reader<Dependencies, string> => deps => (b ? deps.i18n.true : deps.i18n.true);

//const g = (n: number): Reader<Dependencies, string> => f(n > 2); //  // error: An argument for 'deps' was not provided
const g = (n: number): Reader<Dependencies, string> =>
    pipe(
        ask<Dependencies>(),
        chain(deps => f(n > deps.lowerBound))
    )

const h = (s: string): Reader<Dependencies, string> => g(s.length + 1);

console.log('h', h('foo')(instance));

// https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
export {};

