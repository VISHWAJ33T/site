---
alias: [DRY Principle, DRY Code, Duplicated Code Principle, Once and Only Once Principle]
category: General
publish: true
slug: dont-repeat-yourself-dry
title: "Don't Repeat Yourself: A Guide to the DRY Principle"
summary: "Ever written the same code twice? The DRY principle is here to save you from that headache. Let's learn how to write cleaner, smarter code by never repeating yourself."
draft: false
tags: ['Best Practices', 'Code Quality', 'DRY']
date: 2023-11-19
---

## What Does "Don't Repeat Yourself" Mean?

**Don't Repeat Yourself (DRY)** is one of the most famous principles in programming. The idea is simple: every piece of knowledge (like a piece of logic or a constant value) should have a single, clear, authoritative representation within your codebase.

In plain English? **Stop copying and pasting code!**

If you find yourself writing the same lines of code in multiple places, you're setting yourself up for trouble. When you need to make a change, you'll have to hunt down every single copy. Miss one, and you've got a bug. The DRY principle helps us avoid this mess by creating reusable pieces of code.

## How to Keep Your Code DRY

Here are a few practical ways to apply the DRY principle and stop repeating yourself.

- **Create Reusable Functions:** See a chunk of code that you've used more than once? Turn it into a function! Now, instead of ten lines of code, you have a single, clean function call.
- **Use Classes for Bigger Things:** If you have a bunch of functions and data that all relate to the same concept (like a `User` or a `Product`), group them together in a class. This keeps related logic organized and reusable.
- **Hunt Down Duplication:** Make it a habit to look for repeated code. When you find it, take a minute to refactor it into a reusable form. Your future self will thank you.

## Why Bother with DRY Code?

Is it really worth the effort? Absolutely. Here’s why.

### The Awesome Parts (Pros)

- **Super Reusable:** Write code once, use it everywhere. It's efficient and smart.
- **Easier to Maintain:** When logic lives in only one place, fixing a bug or making an update is a piece of cake. Change it once, and you're done.
- **Keeps Things Consistent:** DRY code ensures that the same logic is applied everywhere, reducing the risk of weird inconsistencies in your app.

### The Tricky Parts (Cons)

- **Can Get Complicated:** Sometimes, creating a reusable component can be more complex than just copying a few lines. You have to find the right balance.
- **The Wrong Abstraction:** Be careful not to create a "solution" that doesn't really fit. Sometimes, two things look similar but are actually different. Forcing them into one function can be a mistake. This is sometimes called creating the "wrong abstraction."
- **Takes a Little More Time Upfront:** It can take a bit more thought to write reusable code than to just copy-paste. But trust us, it's a worthwhile investment.

## Let's See It in Action

Imagine you're calculating the area of different shapes.

### The "WET" (Write Everything Twice) Way

Notice how `width * height` is repeated? For `calculateSquareArea`, we're essentially doing the same thing twice.

```typescript
function calculateRectangleArea(width, height) {
  return width * height
}

function calculateSquareArea(sideLength) {
  return sideLength * sideLength // This is just a special case of a rectangle!
}

function calculateTriangleArea(base, height) {
  return (base * height) / 2
}
```

### The DRY Way

This is much cleaner! We recognize that a square is just a special kind of rectangle, so we can reuse our `calculateRectangleArea` function. And a triangle's area is half of a rectangle's, so we can reuse it there too. One piece of logic, used in three places.

```typescript
function calculateRectangleArea(width, height) {
  return width * height
}

function calculateSquareArea(sideLength) {
  // A square is a rectangle with equal sides
  return calculateRectangleArea(sideLength, sideLength)
}

function calculateTriangleArea(base, height) {
  // A triangle's area is half the area of the enclosing rectangle
  return calculateRectangleArea(base, height) / 2
}
```

## Related Ideas

DRY is a team player and works well with other principles:

- [**KISS (Keep It Simple, Stupid)**](/blog/kiss-keep-it-short-and-simple): DRY code is often simpler code. They go hand-in-hand.
- **Separation of Concerns (SoC):** This is a fancy way of saying "keep different parts of your code from stepping on each other's toes." DRY helps you do this by creating neat, self-contained modules.
