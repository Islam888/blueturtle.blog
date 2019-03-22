---
title: "Let, Const, and ... Var"
date: 2019-02-11T14:20:24+02:00
draft: false
tags: ["article", "JS"]
---

{{% parawrap %}}

ES6 has introduced some new syntax features. One of them was key words [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), and [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) to declare variables. Let's talk about why they are preferred over [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).

{{% /parawrap %}}

{{% parawrap %}}

## Scope🔭

`var` has a function [scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope). This means it is accessible anywhere in the function it is defined inside. See this example:

{{< highlight js "linenos=table,linenostart=1" >}}
function buyHerChocolate(onDiet) {
    if (onDiet) {
        var decision = "Don't do it!";
    } else {
        var decision = "Go buy it!"
    }
    console.log(decision);
    }
buyHerChocolate(true);//"Don't do it!"
console.log(decision);//Uncaught ReferenceError: decision is not defined
{{</ highlight >}}

As you see _decision_ variable defined with `var` was availabe inside the function scope, but when we tried to log it outside the function the console throws an error `decision is not defined` as if it's never existed.

On the contrary, `let` and `const` have [block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) `{}` scope.

{{< highlight js "linenos=table,linenostart=1" >}}
function buyHerChocolate(onDiet) {
    if (onDiet) {
        let decision = "Don't do it!";
        console.log(decision);
    } else {
        let decision = "Go buy it!"
        console.log(decision);
    }
    console.log(decision);
    }
buyHerChocolate(true);
//"Don't do it!"
//Uncaught ReferenceError: decision is not defined
console.log(decision);//Uncaught ReferenceError: decision is not define
{{</ highlight >}}

Surprise! Logging the value of decision inside the expression block resulted in the predicted string while doing the same out of the block throw error and out of the function scope also throws an error.

The same happens with `const`.
{{% /parawrap %}}

{{% parawrap %}}
## Hoisting⏫

Variables declared with var are hoisted to the top of their scope. It is important to notice that the variable declaration is what is being hosted not the assignment.

{{< highlight js "linenos=table,linenostart=1" >}}
console.log(x);
var x = 5;//undefined
{{</ highlight >}}

What happened?! The `console.log()` function will not get executed until hoisting any `var` variable. Therefore, `var x;` will go up to the top of the global scope. Then `console.log(x)` is executed and logs undefined, because x has no value at that time. The x is assigned the value 5. It will look like this:

{{< highlight js "linenos=table,linenostart=1" >}}
var x;
console.log(x);
x = 5;
{{</ highlight >}}

Because of that if we `console.log(x)` after that it would log 5 to the console.

This quirky behavior can introduce bugs in larger programs.

`let` and `const` are not hoisted.

{{< highlight js "linenos=table,linenostart=1" >}}
console.log(x);
const x = 5;//Uncaught ReferenceError: x is not defined
{{</ highlight >}}
{{% /parawrap %}}

{{% parawrap %}}
## Declaration & Assignment 

`var` variables can be re-declared and reassigned different value multiple times in the same scope.

`let` variables can not be re-declared but can be reassigned in the same scope.

`const` variables can not be re-declared or reassigned in the same scope. In addition to that they must be declared and assigned a value at the same time. So we can not do that:

{{< highlight js "linenos=table,linenostart=1" >}}
const y;
//Uncaught SyntaxError: Missing initializer in const declaration
{{</ highlight >}}

But we must do that:

{{< highlight js "linenos=inline,linenostart=1" >}}
const y = 5;

{{</ highlight >}}

So if your variable would have changed values, declare it using let, if not always use const.

These differences between them and var will prevent naming conflictions.
{{% /parawrap %}}

{{% parawrap %}}
## Conclusion

For the mentioned reasons you should use `const` in all cases except when the variable would be reassigned new values. At such cases use `let` instead. Most of articles recommend developers to avoid using `var`. Why would anyone use var anymore?!
{{% /parawrap %}}

{{% parawrap %}}
**_For further readings_**:

📌[The Difference Between Function and Block Scope in JavaScript](https://medium.com/@josephcardillo/the-difference-between-function-and-block-scope-in-javascript-4296b2322abe)

📌[Demystifying JavaScript Variable Scope Hoisting](https://www.sitepoint.com/demystifying-javascript-variable-scope-hoisting/)

📌[What is Hoisting in JavaScript?](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-what-is-hoisting-in-javascript-a63c1b2267a1)

{{% /parawrap %}}




