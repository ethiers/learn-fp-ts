import { contramap, Eq } from 'fp-ts/Eq';

type User = {
    userId: number;
    name: string;
}

const eqNumber: Eq<number> = {
    /** returns `true` if `x` is equal to `y` */
    equals: (x, y) => x === y
}

const eqString: Eq<string> = {
    /** returns `true` if `x` is equal to `y` */
    equals: (x, y) => x === y
}


/** two user are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber);
const eqUserName = contramap((user: User) => user.name)(eqString);

console.log(eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' })); // true
console.log(eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' })); // false


console.log(eqUserName.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' })); // true
console.log(eqUserName.equals({ userId: 2, name: 'Giulio' }, { userId: 2, name: 'Giulio' })); // false

