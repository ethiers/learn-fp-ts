// What if we want to represent a synchronous effectful computation that may fail?

import * as fs from 'fs';
import { toError } from 'fp-ts/Either';
import { IOEither, tryCatch } from 'fp-ts/IOEither';
//import { IOEither, tryCatch } from './def';

const readFileSync = (path: string): IOEither<Error, string> => tryCatch(() => fs.readFileSync(path, 'utf8'), toError);

console.log(readFileSync('foo')()); // => left(Error: ENOENT: no such file or directory, open 'foo')
console.log(readFileSync(__filename)()); // => right(...)