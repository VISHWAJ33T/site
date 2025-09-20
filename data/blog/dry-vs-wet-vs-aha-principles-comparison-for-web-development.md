---
tags: ['Best Practices', 'Code Quality', 'Architecture']
draft: false
title: "DRY, WET, or AHA? Choosing the Right Coding Philosophy"
summary: "DRY, WET, and AHA are three competing ideas about the 'right' way to write code. But which one is best? Let's break them down and learn how to find the perfect balance."
date: 2024-03-10
images: []
slug: dry-vs-wet-vs-aha-principles-comparison-for-web-development
publish: true
---

## The Big Debate: To Repeat or Not to Repeat?

As a developer, your main goals are to write code that works, is easy to fix, and doesn't give your teammates a headache. To help us do that, we have a few guiding philosophies. But sometimes, those philosophies seem to contradict each other, especially when it comes to repeating code.

This leads to a big debate in the coding world, centered around three main ideas: [**DRY (Don't Repeat Yourself)**](/blog/dont-repeat-yourself-dry), [**WET (Write Everything Twice)**](/blog/write-everything-twice-wet), and [**AHA (Avoid Hasty Abstractions)**](/blog/avoid-hasty-abstractions-aha). Let's explore what each of these means and how to find the right balance for your projects.

## The Classic Rule: Don't Repeat Yourself (DRY)

The DRY principle is probably the most famous of the three. It's the classic advice that you're taught early on: **don't copy and paste code.** The idea is that every piece of logic should have one, and only one, home in your codebase.

By following DRY, you create reusable pieces of code, like functions or classes. This is great for maintainability. If you need to fix a bug or update a piece of logic, you only have to do it in one place. This makes your code more consistent and reliable.

```tsx
// A reusable Greeting component is very DRY.
import React from 'react';

interface Props {
  name: string;
}

const Greeting: React.FC<Props> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```
In this example, the `Greeting` component can be used anywhere you need to say hello, ensuring every greeting on your site looks and acts the same.

## The Rebel Yell: Write Everything Twice (WET)

The WET principle is the rebellious sibling of DRY. It suggests that sometimes, **a little duplication is better than the wrong abstraction.** While it sounds counterintuitive, there are situations where duplicating code can actually make it clearer and more independent.

This approach is best for small projects or when two pieces of code look similar now, but you know they are going to change in different ways later. A good example is utility classes in CSS frameworks like Tailwind. While you might use `flex items-center justify-center` in many places, abstracting it into a `.flex-center` class is often discouraged because it makes the HTML harder to understand and change later.

However, you have to be careful. Too much WET code leads to a maintenance nightmare. A change might require you to hunt down and edit a dozen different files.

## The Middle Way: Avoid Hasty Abstractions (AHA)

This brings us to the AHA principle, which is all about finding the perfect balance between DRY and WET. AHA programming advises you to **wait for the "Aha!" moment before you create an abstraction.**

Instead of immediately abstracting the first time you see similar code, you wait. You let the duplication exist for a little while until you have a much deeper understanding of the true pattern. This prevents you from creating "hasty" abstractions that don't really fit the problem and end up making your code more complex.

You might start with a simple, slightly WET component:
```tsx
import React from 'react';

const Greeting: React.FC = () => {
  const name = 'John Doe';
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```
As your project grows, you might realize you need this greeting in many places, with different names. That's your "Aha!" moment. Now you can refactor it into the reusable, DRY component we saw earlier, confident that you're creating the *right* abstraction.

## Finding Your Balance

So, which one is the best? The answer is: **it depends.**

The journey to becoming a great developer isn't about blindly following one rule. It's about understanding the trade-offs of each approach and knowing which one to apply in different situations.

Start by leaning towards being a little WET. Don't be afraid of a little duplication at first. As you write more code, you'll start to see the real patterns emerge. When you have that "Aha!" moment and the right abstraction becomes clear, you can then refactor your code to be more DRY. This patient, thoughtful approach will help you write code that is clean, maintainable, and easy to work with for years to come.
