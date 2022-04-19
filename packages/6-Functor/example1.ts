// How can we compose two generic functions f: (a: A) => B and g: (c: C) => D?

//  pure program a function
// (a: A) => B

// effectful program
// (a: A) => F<B>


// Functors
// Functors are mappings between categories that preserve the categorical structure, i.e. that preserve identity morphisms and composition.

// Since categories are constituted of two things (objects and morphisms) a functor is constituted of two things as well:

// a mapping between objects that associates to each object X in C an object in D
// a mapping between morphisms that associates to each morphism in C a morphism in D
// where C and D are two categories (aka two programming languages).