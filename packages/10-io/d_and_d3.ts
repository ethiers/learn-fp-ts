import { getMonoid,io, IO } from 'fp-ts/IO';
import { log } from 'fp-ts/Console';
import { concatAll, Monoid, monoidString, monoidSum } from 'fp-ts/Monoid';

type Die = IO<string>

const monoidDie: Monoid<Die> = getMonoid(monoidString);

const roll: (dice: Array<Die>) => IO<string> = concatAll(monoidDie);

const DA: Die = () => 'A'
const DB: Die = () => 'B'
const DC: Die = () => 'C'
const DD: Die = () => 'D'

const dice = [DA, DB, DC, DD];

io.chain(roll(dice), result => log(`result is : ${result}`))();