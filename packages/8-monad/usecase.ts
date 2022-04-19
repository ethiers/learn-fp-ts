import { /*flatten, */ array, head } from 'fp-ts/Array';
import { Option, some, none, option } from 'fp-ts/Option';
import { isNone } from 'fp-ts/Option';

interface User {
    followers: Array<User>;
}

const getFollowers = (user: User): Array<User> => user.followers;

declare const user: User;

// const followersOfFollowers: Array<Array<User>> = getFollowers(user).map(getFollowers);
// There's something wrong here, followersOfFollowers has the type Array<Array<User>> but we want Array<User>.

//const followersOfFollowers: Array<User> = flatten(getFollowers(user).map(getFollowers));

const inverse = (n: number): Option<number> => (n === 0 ? none : some(1 / n));

// const inverseHead: Option<Option<number>> = option.map(head([1, 2, 3]), inverse)

const flatten = <A>(mma: Option<Option<A>>): Option<A> => (isNone(mma) ? none : mma.value);

const inverseHead: Option<number> = flatten(option.map(head([1, 2, 3]), inverse));

// Note that chain can be derived from flatMap (and viceversa).
// Now if we get back to the examples showing the problem with nested contexts we can fix them by using chain

const followersOfFollowers: Array<User> = array.chain(getFollowers(user), getFollowers);

const headInverse: Option<number> = option.chain(head([1, 2, 3]), inverse);

console.log('headInverse', headInverse);