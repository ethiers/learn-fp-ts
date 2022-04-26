// Since IO actions are just values you can use useful abstractions like Monoid to handle them...

import { log } from 'fp-ts/Console';
import { getMonoid, io, IO } from 'fp-ts/IO';
import { fold, concatAll, Monoid, monoidSum } from 'fp-ts/Monoid';
import { randomInt } from 'fp-ts/Random';

type Die = IO<number>

const monoidDie: Monoid<Die> = getMonoid(monoidSum);

/** returns the sum of the roll of the dice */
const roll: (dice: Array<Die>) => IO<number> = concatAll(monoidDie);

const D4: Die = randomInt(1, 4);
const D10: Die = randomInt(1, 10);
const D20: Die = randomInt(1, 20);

const dice = [D4, D10, D20];

io.chain(roll(dice), result => log(`Result is: ${result}`))();