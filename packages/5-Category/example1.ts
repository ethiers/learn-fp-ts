function f(s: string) : number {
    return s.length;
}

function g(n: number) : boolean{
    return n > 2;
}

// h = g ∘ f
function h(s: string): boolean {
    return g(f(s));
}

console.log(h('Sebastien'));
console.log(h('Seb'));
console.log(h('Se'));
console.log(h('S'));