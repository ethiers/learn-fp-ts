import { ordNumber } from 'fp-ts/Ord';
import { getStructSemigroup, getMeetSemigroup, getJoinSemigroup } from 'fp-ts/Semigroup';
import { Semigroup, semigroupSum } from './def';

type Point = {
    x: number,
    y: number,
}

const semigroupPoint1: Semigroup<Point> = {
    concat: (p1, p2) => ({
        x: semigroupSum.concat(p1.x, p1.y),
        y: semigroupSum.concat(p2.x, p2.y)
    })
}

const semigroupPoint2: Semigroup<Point> = getStructSemigroup({
   x: semigroupSum,
   y: semigroupSum,
});

// console.log(semigroupPoint1({x:1, y: 2}));