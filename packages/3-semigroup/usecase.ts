// Let's imagine you're building some system in which you store customer records that look like this:

import { ordNumber, contramap } from 'fp-ts/Ord';
import { getMonoid } from 'fp-ts/Array';
import { getStructSemigroup, getJoinSemigroup, getMeetSemigroup, semigroupAny } from 'fp-ts/Semigroup';
import { Semigroup } from './def';

interface Customer {
    name: string;
    favouriteThings: Array<string>;
    registeredAt: number;
    lastUpdatedAt: number;
    hasMadePurchase: boolean;
}

// For whatever reason you might end up with duplicate records for the same person. What we need is a merge strategy.
// That's what semigroups are all about

const semigroupCustomer: Semigroup<Customer> = getStructSemigroup({
    // keep the longer name
    name: getJoinSemigroup(contramap((s: string) => s.length)(ordNumber)),
    // accumulate things
    favouriteThings: getMonoid<string>(), // <= getMonoid returns a Semigroup for `Array<string>` see later
    // keep the least recent date
    registeredAt: getMeetSemigroup(ordNumber),
    // keep the most recent date
    lastUpdatedAt: getJoinSemigroup(ordNumber),
    // Boolean semigroup under disjunction
    hasMadePurchase: semigroupAny,
});

const mergedStrategy = semigroupCustomer.concat(
    {
        name: 'Giulio',
        favouriteThings: ['math', 'climbing'],
        registeredAt: new Date(2018, 1, 20).getTime(), // 1519102800000
        lastUpdatedAt: new Date(2018, 2, 18).getTime(), // 1521345600000
        hasMadePurchase: false
    },
    {
        name: 'Giulio Canti',
        favouriteThings: ['functional programming'],
        registeredAt: new Date(2018, 1, 22).getTime(), // 1519275600000
        lastUpdatedAt: new Date(2018, 2, 9).getTime(), // 1520571600000
        hasMadePurchase: true
    }
);

console.log(mergedStrategy);