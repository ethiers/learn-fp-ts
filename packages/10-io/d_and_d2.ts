import { log } from 'fp-ts/Console';
import { io, IO, getMonoid } from 'fp-ts/IO';
import { randomInt } from 'fp-ts/Random';
import { concatAll, monoidSum } from 'fp-ts/Monoid';
import { Monoid } from '4-monoid/def';

type Die = IO<number>;

const monoidDie: Monoid<Die> = getMonoid(monoidSum);

const roll: (dice: Array<Die>) => IO<number> = concatAll(monoidDie); // fold is deprecated

const D4: Die = randomInt(1, 4);
const D10: Die = randomInt(1, 10);
const D20: Die = randomInt(1, 20);

const dice = [D4, D10, D20];

io.chain(roll(dice), result => log(`Result is: ${result}`))();