import { getFunctionSemigroup, getStructSemigroup, Semigroup, semigroupAll } from 'fp-ts/Semigroup'
import { semigroupSum } from './def';


type Point = {
    x: number,
    y: number,
}

type Vector = {
    from: Point,
    to: Point,
}
const semigroupPoint: Semigroup<Point> = getStructSemigroup({
    x: semigroupSum,
    y: semigroupSum,
});

const semigroupVector: Semigroup<Vector> = getStructSemigroup({
    from: semigroupPoint,
    to: semigroupPoint,
});

/** `semigroupAll` is the boolean semigroup under conjunction */
const semigroupPredicate: Semigroup<(p: Point) => boolean> = getFunctionSemigroup(
    semigroupAll
)<Point>()

// Now we can "merge" two predicates on Points

const isPositiveX = (p: Point): boolean => p.x >= 0;
const isPositiveY = (p: Point): boolean => p.y >= 0;

const isPositiveXY = semigroupPredicate.concat(isPositiveX, isPositiveY);

console.log(isPositiveXY({ x: 1, y: 1 })); // true
console.log(isPositiveXY({ x: 1, y: -1 })); // false
console.log(isPositiveXY({ x: -1, y: 1 })); // false
console.log(isPositiveXY({ x: -1, y: -1 })); // false
