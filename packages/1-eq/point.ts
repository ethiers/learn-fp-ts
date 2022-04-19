import {Eq, struct} from "fp-ts/Eq";
import {getStructEq} from 'fp-ts/Eq'

const eqNumber: Eq<number> = {
    equals: (x, y) => x === y
}

type Point = {
    x: number;
    y: number;
}

// const eqPoint: Eq<Point> = {
//     equals: (p1, p2) => p1 === p2 || (p1.x === p2.x && p1.x === p2.y)
// }

const eqPoint: Eq<Point> = struct({
    x: eqNumber,
    y: eqNumber
});

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
    return (a, as) => as.some(item => E.equals(item, a));
}

const p1 = {x: 1, y: 1}
const p2 = {x: 2, y: 2}
const p3 = {x: 3, y: 3}
const p4 = {x: 4, y: 4}

console.log('elem(eqNumber)(1, [1,2,3]) = ', elem(eqPoint)(p1, [p4, p2, p3]));
console.log('elem(eqNumber)(4, [1,2,3]) = ', elem(eqPoint)(p3, [p4, p2, p3]));