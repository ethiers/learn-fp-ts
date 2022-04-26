import { Reader } from 'fp-ts/Reader';

interface Dependencies {
    i18n: {
        true: string
        false: string
    };
}

const instance: Dependencies = {
    i18n: {
        true: 'vero',
        false: 'falso'
    }
};

//const f = (b: boolean): ((deps: Dependencies) => string) => deps => (b ? deps.i18n.true : deps.i18n.true);
const f = (b: boolean): Reader<Dependencies, string> => deps => (b ? deps.i18n.true : deps.i18n.true);

const g = (n: number): Reader<Dependencies, string> => f(n > 2); //  // error: An argument for 'deps' was not provided

const h = (s: string): Reader<Dependencies, string> => g(s.length + 1);

console.log('h', h('foo')(instance));

// https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
export {};

