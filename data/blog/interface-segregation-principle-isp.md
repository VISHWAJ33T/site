---
title: 'SOLID Principles, Part 4: The Interface Segregation Principle'
draft: false
tags: ['SOLID', 'OOP', 'Architecture']
date: 2024-08-18
summary: "Don't you hate being forced to implement methods you don't need? The 'I' in SOLID is here to fix that. Let's learn how the Interface Segregation Principle helps us create lean, focused code."
category: SOLID
slug: interface-segregation-principle-isp
publish: true
---

## Don't Force Me to Use Things I Don't Need

We're moving right along with our SOLID series! Next up is the "I," which stands for the **Interface Segregation Principle (ISP)**. This principle has a simple but very important goal: to prevent us from creating bloated, "fat" interfaces that force classes to implement methods they don't actually need.

The official definition is: **clients should not be forced to depend upon interfaces that they do not use.**

In simpler terms, it's better to have many small, specific interfaces than one big, general-purpose one. If a class only needs to be able to `fly()`, it shouldn't be forced to also have a `swim()` and `dig()` method just because they're all part of some giant `IAnimalActions` interface.

## How to Create Lean, Focused Interfaces

Applying ISP is all about understanding the specific needs of the classes that will be using your interfaces. Instead of thinking about all the possible things an object _could_ do, you should focus on creating small, cohesive interfaces that are tailored to a single behavior.

This means you should actively **avoid "fat" interfaces**. If you find yourself creating an interface with a dozen methods, that's a huge red flag. It's very likely that no single class will ever need to implement all of those methods. The solution is to **segregate**, or split, that big interface into several smaller, more focused ones.

This approach encourages you to think in terms of capabilities. For example, instead of a giant `IShape` interface, you might have an `IDrawable` interface, an `IResizable` interface, and an `IRotatable` interface. A class can then choose to implement only the interfaces for the capabilities it actually has.

## The Good and Bad of Specific Interfaces

Like the other SOLID principles, ISP is a powerful tool for creating clean code, but it's a tool that requires thoughtful application.

### The Power of Being Specific

The biggest benefit of ISP is that it makes your code much more **flexible and adaptable**. By creating small, focused interfaces, you decouple your classes from methods they don't care about. This leads to a system that is much **easier to maintain**. When you change a small, specific interface, you only have to worry about the classes that actually use it, which dramatically reduces the ripple effect of changes.

This also promotes **reusability**. A small, focused interface like `IDrawable` can be reused in many different contexts, for many different types of objects, not just for shapes.

### The Challenges of Many Small Interfaces

The main downside is that following ISP can lead to a project that has a lot of small interface files. For some developers, managing this can feel like a bit of extra **complexity** compared to just having one big interface.

This also means you have to be more thoughtful about **dependency management**. A class might need to implement multiple small interfaces, and you have to make sure you're composing them correctly to get the behavior you want. This can require a bit more design effort upfront, but it's an investment that almost always pays off in the long run.

## Let's See an Example

Imagine we're creating interfaces for different kinds of shapes.

### The "Fat" Interface Problem

A common mistake is to create one giant interface that includes every possible action a shape could perform.

```typescript
// This interface is too "fat."
interface IShape {
  draw(): void
  resize(): void
  rotate(): void
  calculateArea(): void
  calculatePerimeter(): void
}
```

Now, what happens if we have a `Circle` class? It can be drawn, resized, and can calculate its area and perimeter. But it can't be rotated in a meaningful way (a rotated circle looks the same). So, the `Circle` class would be forced to have a `rotate()` method that it doesn't actually need. This is a violation of ISP.

### The Lean, Segregated Solution

A much better approach is to break that fat interface down into smaller, more specific ones based on capabilities.

```typescript
// Each interface now has a single, clear purpose.
interface IDrawable {
  draw(): void
}

interface IResizable {
  resize(): void
}

interface IRotatable {
  rotate(): void
}

interface ICalculatable {
  calculateArea(): void
  calculatePerimeter(): void
}
```

Now, our `Circle` class can simply implement `IDrawable`, `IResizable`, and `ICalculatable`. It doesn't have to worry about the `IRotatable` interface at all. This design is cleaner, more logical, and perfectly follows the Interface Segregation Principle.

## The SOLID Series

We're almost at the end! Just one more principle to go.

- [S: Single Responsibility Principle](/blog/single-responsibility-principle-srp)
- [O: Open-Closed Principle](/blog/open-closed-principle-ocp)
- [L: Liskov Substitution Principle](/blog/liskov-substitution-principle-lsp)
- **I: Interface Segregation Principle** (You are here!)
- [D: Dependency Inversion Principle](/blog/dependency-inversion-principle-dip)
