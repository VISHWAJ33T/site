---
title: "SOLID Principles, Part 3: The Liskov Substitution Principle"
draft: false
tags: ['SOLID', 'OOP', 'Architecture']
date: 2024-08-04
summary: "If it looks like a duck and quacks like a duck, it should behave like a duck. The 'L' in SOLID is all about making sure your child classes are perfect stand-ins for their parents. Let's dive in."
category: SOLID
slug: liskov-substitution-principle-lsp
publish: true
---

## If It Looks Like a Duck...

Let's continue our journey through the SOLID principles. So far, we've learned that a class should have a single job (SRP) and that it should be open to new features but closed to changes (OCP). Now we come to the "L," which stands for the **Liskov Substitution Principle (LSP)**.

It might sound complicated, but the core idea is actually very intuitive. LSP states that **if you have a child class that inherits from a parent class, you should be able to use the child class anywhere you would use the parent class without breaking anything.**

In other words, a child class must be a perfect substitute for its parent. If you have a function that expects a `Bird` object, and you pass in an `Ostrich` object (which is a type of bird), your program shouldn't crash or behave in a weird, unexpected way. The `Ostrich` has to honor the "contract" of being a `Bird`.

## How to Build Trustworthy Subclasses

Following LSP is all about making sure your inheritance hierarchies make sense and behave predictably. When you create a child class, you're making a promise that it can do everything its parent can do, in the same way.

This means you must **respect the parent's method signatures**. If a method in the parent class takes a number and returns a string, the same method in the child class should do the same. You can't change the rules.

More subtly, you have to honor the parent's behavior. The child class shouldn't be stricter than the parent. For example, if a `saveFile(file)` method in the parent can handle any type of file, a child class shouldn't override it to *only* accept image files. It should also fulfill the promises of the parent. If the parent's `saveFile` method guarantees it will always close the file handle, the child's version must do the same. Breaking these unwritten rules is the fastest way to violate LSP.

## The Good and Bad of Substitutability

Designing your classes to be perfectly substitutable is a hallmark of great object-oriented design, but it requires careful thought.

### The Power of Reliable Inheritance

The main benefit of LSP is that it creates **reliable and reusable code**. When you know that any child class can be safely used in place of its parent, you can write more generic, flexible code that works with a whole family of objects, not just one. This naturally supports the **Open-Closed Principle**, as you can add new functionality by creating new, substitutable child classes without having to change the code that uses them.

This leads to clearer, more robust **abstractions**. A well-designed parent class acts as a strong, predictable contract that all its children must follow, making your entire system easier to reason about.

### The Challenges of Perfect Substitution

The biggest challenge with LSP is that it **requires careful design upfront**. You have to think deeply about your inheritance hierarchy to make sure it's logical and that your child classes don't need to "undo" or fight against the behavior of their parents.

If you're not careful, trying to force a class into an inheritance structure where it doesn't quite fit can lead to **increased complexity**. You might end up writing weird workarounds or conditional logic to handle the cases where a child class behaves differently, which is exactly what LSP is trying to help you avoid.

## The Classic Example: Birds That Can't Fly

This is the most famous example used to explain the Liskov Substitution Principle.

### The Problem: A Lying Ostrich

Let's say you have a `Bird` class with a `fly()` method.

```typescript
class Bird {
  fly() {
    console.log("I am flying!");
  }
}

class Duck extends Bird {} // A Duck is a Bird, and it can fly. Makes sense.

class Ostrich extends Bird {} // An Ostrich is a Bird, but... it can't fly.
```
Here's the problem: we've created an `Ostrich` class that inherits the `fly()` method, but an ostrich can't fly. If we have a function that takes any `Bird` and calls `fly()` on it, our program will lie when we pass in an ostrich. This violates LSP. The `Ostrich` is not a perfect substitute for a generic `Bird`.

### The Solution: A Better Family Tree

The solution is to create a more accurate inheritance hierarchy. Not all birds can fly, so the `fly()` method shouldn't be in the base `Bird` class.

```typescript
// The base class only has properties common to all birds.
class Bird {}

// We create a new, more specific class for birds that can fly.
class FlyingBird extends Bird {
  fly() {
    console.log("I am flying!");
  }
}

class Duck extends FlyingBird {} // A Duck is a FlyingBird. Perfect.

class Ostrich extends Bird {} // An Ostrich is a Bird, but not a FlyingBird. Perfect.
```
Now our classes are honest. A `Duck` can be used anywhere a `FlyingBird` is expected, and both a `Duck` and an `Ostrich` can be used where a generic `Bird` is expected. Our program is now logical, predictable, and follows the Liskov Substitution Principle.

## The SOLID Series

This is the third of five posts on the SOLID principles.

-   [S: Single Responsibility Principle](/blog/single-responsibility-principle-srp)
-   [O: Open-Closed Principle](/blog/open-closed-principle-ocp)
-   **L: Liskov Substitution Principle** (You are here!)
-   [I: Interface Segregation Principle](/blog/interface-segregation-principle-isp)
-   [D: Dependency Inversion Principle](/blog/dependency-inversion-principle-dip)
