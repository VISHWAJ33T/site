---
title: 'Composition vs. Inheritance: Which Should You Choose?'
draft: false
tags: ['OOP', 'Architecture', 'Best Practices']
date: 2024-04-21
summary: "When building with code, should you inherit traits like a family tree, or assemble parts like a LEGO set? Let's break down Composition and Inheritance to help you build better, more flexible code."
category: Classes
slug: composition-vs-inheritance-which-is-better-for-your-code
publish: true
---

## Building with Code: Family Trees or LEGO Sets?

When we write code using classes, we're creating blueprints for objects. A big part of making good blueprints is figuring out how they should relate to each other. Two of the most common ways to do this are **Inheritance** and **Composition**.

Think of it like this:

- **Inheritance** is like a **family tree**. A `GoldenRetriever` class can _inherit_ from a `Dog` class. The retriever gets all the general doggy traits (like `bark()` and `wagTail()`) automatically, and then can add its own specific traits (like `isAlwaysHappy: true`).
- **Composition** is like building with **LEGOs**. You create a `Car` class not by inheriting from a single "Vehicle" blueprint, but by _composing_ it from smaller, independent parts. The `Car` object _has-a_ `Wheel`, it _has-an_ `Engine`, it _has-a_ `SteeringWheel`. Each part is its own self-contained object.

So, how do you know whether to build a family tree or a LEGO set? It all comes down to the relationship between your objects.

## The Big Question: "Is-A" or "Has-A"?

The easiest way to choose between inheritance and composition is to ask yourself a simple question about the relationship between your classes.

### When to Use Inheritance (The "Is-A" Relationship)

You should use inheritance when one class truly **is a** more specific version of another. A `GoldenRetriever` **is-a** `Dog`. A `Car` **is-a** `Vehicle`. This relationship is fundamental and won't change.

Inheritance is powerful when you want to reuse a lot of code from a parent class and when you want to make a change in the parent class and have it automatically apply to all the children. For example, if you add a `sleep()` method to your `Dog` class, every type of dog that inherits from it will instantly know how to sleep.

### When to Use Composition (The "Has-A" Relationship)

You should use composition when a class **has a** component or a capability. A `Car` **has-a** `Engine`. A `Person` **has-a** `Job`. The `Car` is not a type of `Engine`; it's a separate thing that contains an engine.

Composition is incredibly flexible. If you want to give your `Car` a different kind of engine (say, an electric one instead of a gas one), you can just swap out the `Engine` object. The `Car` itself doesn't need to change. This makes your code much more adaptable and easier to maintain in the long run.

## Why Coders Often Say "Favor Composition Over Inheritance"

You'll often hear this phrase in the programming world. While inheritance is a powerful tool, it can also be rigid. A class family tree is hard to change. If you have a deep tree (a class that inherits from a class that inherits from another class...), making a change at the top can have unexpected and disastrous consequences for the classes at the bottom.

Composition, with its LEGO-like approach, avoids this problem. The parts are independent. Swapping out a wheel doesn't break the steering wheel. This flexibility is why it's often the preferred choice for building complex systems.

## A Quick Example

Let's look at a common mistake.

### The Wrong Way (Confusing "Is-A" and "Has-A")

Imagine you have an `Employee` class, and you want to store their tax data. You might be tempted to do this:

```javascript
// This is confusing because tax data IS NOT a type of employee.
class Employee {
  constructor(name) {
    this.name = name
  }
}

class EmployeeTaxData extends Employee {
  constructor(salary) {
    super()
    this.salary = salary
  }
}
```

This doesn't make logical sense. `EmployeeTaxData` is not a more specific _type_ of `Employee`.

### The Right Way (Using "Has-A")

A much cleaner way is to say that an `Employee` _has-a_ set of tax data.

```javascript
// This makes perfect sense! An employee HAS tax data.
class EmployeeTaxData {
  constructor(salary) {
    this.salary = salary
  }
}

class Employee {
  constructor(name) {
    this.name = name
  }

  setTaxData(salary) {
    this.taxData = new EmployeeTaxData(salary)
  }
}
```

This is a much more logical and flexible design.

## The Takeaway

When you're designing your classes, always stop and ask: is this an "is-a" or a "has-a" relationship? Getting that right is the key to building code that is not just powerful, but also flexible and easy to change.
