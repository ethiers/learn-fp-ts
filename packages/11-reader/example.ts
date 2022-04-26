interface Dependencies {
    i18n: {
        true: string
        false: string
    }
}

const instance: Dependencies = {
    i18n: {
        true: 'vero',
        false: 'falso'
    }
}

const f = (b: boolean, deps: Dependencies): string => (b ? deps.i18n.true : deps.i18n.true);

const g = (n: number,  deps: Dependencies): string => f(n > 2, deps); //  // error: An argument for 'deps' was not provided

const h = (s: string, deps: Dependencies): string => g(s.length + 1, deps);

console.log('h', h('foo', instance));

// https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
export {}

