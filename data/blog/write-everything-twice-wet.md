---
alias: WET Principle, Write Everything Twice, Duplication Over Premature Abstraction, We Enjoy Typing, Waste Everyone's Time
category: General
publish: true
slug: write-everything-twice-wet
title: "The WET Principle: Why Repeating Yourself is Sometimes Okay"
summary: "We're always told 'Don't Repeat Yourself,' but what if a little duplication is actually a good thing? Let's explore the WET principle and when to embrace it."
draft: false
tags: ['Best Practices', 'Code Quality', 'WET']
date: 2024-02-04
---

## Isn't Repeating Code Always Bad?

In the world of programming, the [**DRY (Don't Repeat Yourself)**](/blog/dont-repeat-yourself-dry) principle is king. We're taught that copying and pasting code is a cardinal sin. But what if I told you there's another side to the story? Enter the **WET (Write Everything Twice)** principle. It's a bit of a cheeky name, but the idea is serious: **sometimes, a little bit of duplication is better than creating the wrong abstraction.**

The WET principle doesn't mean you should go around copying code everywhere. Instead, it's a caution against being too quick to generalize your code. It argues that in certain situations, having two similar but separate pieces of code can be clearer and more flexible than forcing them into a single, complicated function.

## How to Be Smart About Repeating Code

The key to using the WET principle effectively is to find the right balance. You're not abandoning DRY; you're just being more thoughtful about when to apply it. The main idea is to **avoid premature abstraction**. Before you rush to create a reusable function for two pieces of code that look similar, take a moment. Are they *truly* the same, or do they just look alike for now? If they are likely to change in different ways in the future, a shared abstraction could become a tangled mess.

Sometimes, duplicated code is simply more readable. If the logic is simple and self-contained, having it right there where you need it can be much easier to understand than jumping to another file to figure out what a generic function is doing. The goal is to weigh the pros and cons and choose the path that leads to the most maintainable code in the long run.

## The Good and Bad of a Little Duplication

Choosing to be WET instead of DRY has its own set of trade-offs.

### When a Little WET is a Good Thing

One of the biggest wins is **clarity**. When the logic is simple, having it written out in full can be much easier to follow. This also gives you **flexibility**. When two components have their own separate code, you can change one without worrying about accidentally breaking the other. This independence can be a huge advantage, especially in a rapidly changing project.

This approach often leads to **simplicity**, as it saves you from building complex, generic functions before you truly need them. For a beginner, reading two simple, duplicated blocks of code is often much easier than trying to understand one complicated, abstract function.

### The Dangers of Getting Too WET

Of course, there's a reason DRY is so popular. The most obvious downside of WET code is **maintenance**. If you have the same logic in five different places, a bug fix or a feature update means you have to make that change in all five places. It's easy to miss one, which leads to inconsistencies and bugs.

Too much duplication can also lead to **code bloat**. A project with a lot of repeated code will have larger files, which can be harder to navigate and can even have a small impact on performance. It's a slippery slope from a little helpful duplication to a messy, unmanageable codebase.

## Let's See an Example

Imagine you're calculating the area and circumference of a circle.

### The Overly-Abstracted (Too DRY) Way

In an attempt to be DRY, you might notice that both calculations use `3.14 * radius` and decide to pull that into its own function.

```typescript
// This is a "bad" example because the abstraction adds complexity without much benefit.
function calculateArea(radius: number): number {
  return calculatePiTimesRadius(radius) * radius;
}

function calculateCircumference(radius: number): number {
  return 2 * calculatePiTimesRadius(radius);
}

// This function is so simple that it's probably not worth creating.
function calculatePiTimesRadius(radius: number): number {
  return 3.14 * radius;
}

const area = calculateArea(5);
const circumference = calculateCircumference(5);
```
While technically DRY, this has made the code more complicated to read. You have to jump between three different functions to understand two simple formulas.

### The Clearer (WET) Way

In this case, a little duplication is actually much clearer and easier to understand.

```typescript
// Sometimes, a little duplication makes the code more straightforward.
function calculateArea(radius: number): number {
  return 3.14 * radius * radius;
}

function calculateCircumference(radius: number): number {
  return 2 * 3.14 * radius;
}

const area = calculateArea(5);
const circumference = calculateCircumference(5);
```
Here, the formulas are simple and self-contained. Anyone can read these functions and immediately understand what they do.

## How WET Fits with Other Ideas

The WET principle is the natural counterbalance to [**DRY (Don't Repeat Yourself)**](/blog/dont-repeat-yourself-dry). It reminds us that DRY is a guideline, not an unbreakable law. It also fits nicely with the [**KISS (Keep it short and simple)**](/blog/kiss-keep-it-short-and-simple) principle, as the goal is to choose the simplest, most readable solution. And it's a core part of [**AHA (Avoid Hasty Abstractions)**](/blog/avoid-hasty-abstractions-aha), which is all about waiting until you truly understand a problem before you start creating abstractions.
