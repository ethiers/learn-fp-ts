import {Ord, fromCompare, contramap, getDualOrd} from 'fp-ts/Ord';

//Indeed the module fp-ts/Ord exports an handy fromCompare helper which allows you to define an Ord instance by simply specifying a compare function

const ordNumber: Ord<number> = fromCompare((x, y) => (x < y ? -1 : x > y ? 1 : 0));

function min<A>(O: Ord<A>): (x: A, y: A) => A {
    return (x, y) => (O.compare(x, y) === 1 ? y : x);
}

// function max<A>(O: Ord<A>): (x: A, y: A) => A {
//     return (x, y) => (O.compare(x, y) === 1 ? x : y);
// }

function max<A>(O: Ord<A>): (x: A, y: A) => A {
    return min(getDualOrd(O));
}

console.log(min(ordNumber)(20, 8));
console.log(max(ordNumber)(20, 8));

type User = {
    name: string,
    age: number,
}

type Product = {
    name: string,
    description: string,
    price: number
}

//const byAge: Ord<User> = fromCompare((x, y) => ordNumber.compare(x.age, y.age));

// shortcut
const byAge: Ord<User> = contramap((user: User) => user.age)(ordNumber);

const byPrice: Ord<Product> = contramap( (product: Product) => product.price)(ordNumber);

const getYounger = min(byAge);
const getOlder = max(byAge);

const expensive = max(byPrice);
const cheapest = min(byPrice);

console.log(getYounger({name: 'Guido', age: 48}, {name: 'Giulio', age: 45}));
console.log(getOlder({name: 'Guido', age: 48}, {name: 'Giulio', age: 45}));

console.log(expensive({name: 'Nindendo', description: 'out of stock', price: 499.99}, {name: 'PlayStation', description: 'out of stock', price: 599.99},));
console.log(cheapest({name: 'Nindendo', description: 'out of stock', price: 499.99}, {name: 'PlayStation', description: 'out of stock', price: 599.99},));

