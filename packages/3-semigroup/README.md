# Semigroup

source: https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7

## Definition

A semigroup is a pair (A, *) in which A is a non-empty set and `*` is a binary associative operation on `A`. 
i.e. a function that takes two elements of `A` as input and returns an element of `A` as output...

## Examples of semigroup

```
(number, *) where * is the usual multiplication of numbers
(string, +) where + is the usual concatenation of strings
(boolean, &&) where && is the usual conjunction
```

the semigroup operation can be interpreted with different meanings

"concatenation"
"merging"
"fusion"
"selection"
"addition"
"substitution"

