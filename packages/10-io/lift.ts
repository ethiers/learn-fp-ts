// The fp-ts/IOEither module provides other helpers which allow to create values of type IOEither,
// they are collectively called lifting functions.

import { randomInt } from 'fp-ts/Random';
import { ioEither, rightIO, tryCatch } from 'fp-ts/IOEither';
import { toError } from 'fp-ts/Either';
import { IOEither } from './def';
import * as fs from 'fs';

const readFileSync = (path: string): IOEither<Error, string> => tryCatch(() => fs.readFileSync(path, 'utf8'), toError);


// const randomFile = ioEither.chain(
//     randomInt(1, 3), // static error
//     n => readFileSync(`${__dirname}/${n}.txt`)
// )

const randomFile = ioEither.chain(rightIO(randomInt(1, 3)), n =>
    readFileSync(`${__dirname}/${n}.txt`)
)

console.log('randomFile', randomFile);
