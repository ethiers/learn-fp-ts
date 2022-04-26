import { fromNullable, Option } from 'fp-ts/Option';
import { IO } from './def';
import { io } from 'fp-ts/IO';

import { NodeDiskStorage } from 'node-disk-storage';

const localStorage = new NodeDiskStorage();

const getItem = (key: string): IO<Option<string>> => () => fromNullable(localStorage.get(key));
const setItem = (key: string, value: string): IO<void> => () => localStorage.set(key, value);

console.log('setItem', setItem('mykey', '12')());
console.log('getItem', getItem('mykey')());

// get the current time
const now: IO<number> = () => new Date().getTime();
console.log('now', now());

// write to the console)
const log = (s: unknown): IO<void> => () => console.log(s);
const log2 = (s: unknown): IO<void> => () => console.log('[log]::', s);
log('Hello all!')();

// get a random number
const random: IO<number> = () => Math.random();
const randomValue = random();
console.log('random', randomValue);

// The IO type admits a Monad instance, so you can map...
// get a random boolean
const randomBool: IO<boolean> = io.map(random, n => n < 0.5);
const randomString: IO<string> = io.map(random, n => (console.log('n', n), n < 0.5 ? 'below the average' : 'above the average'));
const randomString2: IO<string> = io.map(() => randomValue, n => (console.log('n', n), n < 0.5 ? 'below the average' : 'above the average'));

const program: IO<void> = io.chain(randomBool, log2);

console.log('randomBool', randomBool());
console.log('randomBool', randomString());
console.log('randomBool', randomString2());
program();
