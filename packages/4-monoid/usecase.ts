// As an example, getLastMonoid can be useful for managing optional values

import { Option, getLastMonoid, some, none } from 'fp-ts/Option';
import { getStructMonoid } from 'fp-ts/Monoid';
import { Monoid } from './def';

/** VSCode settings */
interface Settings {
    // Controls the font family
    fontFamily: Option<string>;
    // Controls the font size in pixels
    fontSize: Option<number>;
    // Limit the width of the minimap to render at most a certain number of columns.
    maxColumn: Option<number>;
}

const monoidSettings: Monoid<Settings> = getStructMonoid({
    fontFamily: getLastMonoid<string>(),
    fontSize:  getLastMonoid<number>(),
    maxColumn: getLastMonoid<number>(),
});

const workspaceSettings: Settings = {
    fontFamily: some('Courier'),
    fontSize: none,
    maxColumn: some(80)
}

const userSettings: Settings = {
    fontFamily: some('Fira Code'),
    fontSize: some(12),
    maxColumn: none
}

/** userSettings overrides workspaceSettings */
console.log(monoidSettings.concat(workspaceSettings, userSettings));
