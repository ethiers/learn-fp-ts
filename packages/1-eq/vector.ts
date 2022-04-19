import {Eq, struct} from 'fp-ts/Eq';

type Point = {
    x: number;
    y: number;
}

type Vector = {
    from: Point,
    to: Point,
}

const eqNumber: Eq<Number> = {
    equals: (x, y) => x === y
};

const eqPoint: Eq<Point> = struct({
    x: eqNumber,
    y: eqNumber,
});


const eqVector: Eq<Vector> = struct({
    from: eqPoint,
    to: eqPoint,
});

function hasElem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
    return (a,as) => as.some(item => E.equals(item, a));
}

const p1 = {x: 1, y: 1}
const p2 = {x: 2, y: 2}
const p3 = {x: 3, y: 3}
const p4 = {x: 4, y: 4}

const v1 = {from: p1, to: p3}
const v2 = {from: p2, to: p4}

console.log('', hasElem(eqVector)(v1, [v1, v2]));
console.log('', hasElem(eqVector)(v2, [v1]));