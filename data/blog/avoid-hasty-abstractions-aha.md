---
alias: AHA Principle, Avoiding Hasty Abstractions, Moist Programming
category: General
publish: true
slug: avoid-hasty-abstractions-aha
title: 'AHA! The Moment to Abstract Your Code (and When to Wait)'
summary: "We love DRY code, but rushing to abstract can create a mess. The AHA principle is all about finding that 'Aha!' moment before you generalize. Let's learn to wait for the right abstraction."
draft: false
tags: ['Best Practices', 'Code Quality', 'AHA']
date: 2024-02-18
---

## What is an "Aha!" Moment in Coding?

As developers, we're trained to spot patterns. When we see similar-looking code, our first instinct is often to create an "abstraction"—a single, reusable piece of code (like a function or a class) that can handle all the similar cases. This is the heart of the [**DRY (Don't Repeat Yourself)**](/blog/dont-repeat-yourself-dry) principle. But what if our instinct is a little too fast?

This is where the **AHA (Avoid Hasty Abstractions)** principle comes in. It's a simple, powerful idea: **prefer a little bit of duplication over creating the wrong abstraction.** The "Aha!" in the name represents that moment of clarity when you _truly_ understand a pattern in your code, making it the perfect time to generalize. Before that moment, any attempt to abstract is just a guess—a hasty one that can lead to more problems than it solves.

## The Art of Waiting for the Right Abstraction

AHA programming is all about patience. It asks you to be comfortable with a little bit of duplicated code in the short term, giving you time to fully understand the problem you're solving. Instead of abstracting the first time you see a similar piece of code, you wait until you've seen it three or more times. This is often called the "Rule of Three."

By waiting, you gather more information. You start to see the _true_ pattern, not just the superficial similarities. You'll begin to notice which parts of the code are genuinely the same and which parts are slightly different but important. This deeper understanding allows you to design an abstraction that is both accurate and flexible. When you finally have that "Aha!" moment and the right abstraction becomes obvious, the code you write will be much cleaner and more maintainable than if you had rushed it.

## The Good and Bad of Waiting

Delaying your abstractions is a powerful technique, but it's a balancing act.

### The Power of Patience

The biggest benefit of the AHA approach is the **clarity** it brings. By working with concrete, duplicated code for a while, you gain a much deeper understanding of the problem. When you finally do create an abstraction, it will be much more accurate and useful. This patience also leads to more **flexible** code. A hasty abstraction is often too rigid, making it hard to adapt to new requirements. A well-thought-out abstraction, born from real-world use cases, is much easier to change and extend.

Ultimately, by avoiding the wrong abstractions, you end up with a codebase that is simpler and more accurately reflects the problems it solves.

### The Risks of Waiting Too Long

Of course, the most obvious downside is the temporary **code duplication**. This can feel wrong to developers who are used to being strictly DRY. If you're not careful, this duplication can lead to a higher **maintenance overhead**. If a bug is found in a piece of duplicated logic, you have to remember to fix it in every single place it appears. The key is to see this duplication as a temporary state, not a final destination.

## Let's See an Example

Imagine you have a function that performs different operations on a list of items.

### The Hasty Abstraction

A common mistake is to create a generic "operation" function that takes a string to decide what to do.

```typescript
// This abstraction is hasty because it forces all operations to work on a single item at a time,
// and uses a string to control logic, which is not very flexible.
function performOperation(items: Item[], operation: string): void {
  for (const item of items) {
    performCustomOperation(item, operation)
  }
}

function performCustomOperation(item: Item, operation: string): void {
  if (operation === 'operation1') {
    // Logic for operation 1 on a single item
  } else if (operation === 'operation2') {
    // Logic for operation 2 on a single item
  }
  // What if a new operation needs to work on the whole list at once? This design makes that hard.
}
```

This seems DRY, but it's a trap. It's not very flexible. What if a new operation needs to be more efficient and process the items in a batch? This design makes that difficult.

### The Patient (AHA) Approach

By waiting, we allow the duplication to exist for a while. We see how each operation really works.

```typescript
// By allowing some duplication, we keep our options open.
function performOperation(items: Item[], operation: string): void {
  if (operation === 'operation1') {
    // We can see the full logic for this operation here.
    for (const item of items) {
      // Custom operation 1 logic
    }
  } else if (operation === 'operation2') {
    // And the full logic for this one here.
    for (const item of items) {
      // Custom operation 2 logic
    }
  }
  // More operations...
}
```

This might seem WET, but it's a temporary step. After seeing a few of these, we might have an "Aha!" moment: "Aha! Each operation is really its own strategy. Let's pass in a function instead of a string!" This leads to a much better, more flexible abstraction than our first attempt.

## How AHA Plays with Other Principles

AHA is the perfect bridge between the two extremes of [**DRY (Don't Repeat Yourself)**](/blog/dont-repeat-yourself-dry) and [**WET (Write Everything Twice)**](/blog/write-everything-twice-wet). It encourages you to start with WET code and move towards DRY code only when you have a clear and confident understanding of the problem. It's all about making your code flexible enough to **optimize for change first**, which is one of the most important skills a developer can learn.
