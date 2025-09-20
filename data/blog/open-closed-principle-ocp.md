---
title: 'SOLID Principles, Part 2: The Open-Closed Principle'
draft: false
tags: ['SOLID', 'OOP', 'Architecture']
date: 2024-07-21
summary: "Want to add new features without breaking old ones? The 'O' in SOLID is here to help. Let's explore the Open-Closed Principle and how to write code that's ready for the future."
category: SOLID
slug: open-closed-principle-ocp
publish: true
---

## Adding New Features Without Breaking Everything

Imagine you've built a beautiful, stable piece of software. It works perfectly. Now, your boss comes to you and says, "We need to add a new feature." The scary part of this request is the risk of breaking the code that already works. How can you add new functionality without having to change—and potentially break—your existing, stable code?

This is the problem that the **Open-Closed Principle (OCP)** is designed to solve. It's the "O" in the SOLID acronym, and it states that: **software entities (like classes or modules) should be open for extension, but closed for modification.**

In simple terms, this means you should be able to add new functionality to a class _without_ changing its source code. It sounds like a magic trick, but it's a powerful design principle that leads to incredibly stable and maintainable software.

## How to Be "Open for Extension"

The key to following the Open-Closed Principle is to rely on **abstractions**, like interfaces or abstract classes. Instead of writing code that works with one specific, concrete class, you write code that works with a general abstraction. This way, you can create brand new classes that fit this abstraction, effectively "extending" the behavior of your system without ever touching the original code.

A great way to achieve this is through **polymorphism**. This is a fancy word for the idea that you can have many different classes that all share a common interface and can be used interchangeably. By designing your system around these shared interfaces, you create "pluggable" components. Need a new feature? Just create a new "plug" that fits the same socket.

This often goes hand-in-hand with techniques like **Dependency Injection**, where you "inject" the specific implementation a class needs, rather than having the class create it itself. This decouples your code and makes it much easier to extend.

## The Good and Bad of OCP

Building code that is open for extension is a powerful goal, but it comes with its own set of challenges.

### The Power of Future-Proof Code

The biggest advantage of OCP is **maintainability**. When you don't have to change existing code, your risk of introducing new bugs into stable features drops to nearly zero. This makes your codebase much more robust and easier to manage.

This also leads to enhanced **modularity**. Changes are contained within new, independent classes, which reduces the ripple effect of a change across your application. Over time, this makes your code much more **reusable**. The stable, core components of your system can be reused in new projects, and you can simply write new extensions to fit the new requirements.

### The Risk of Over-Engineering

The main challenge with OCP is that it requires you to think ahead and design good abstractions. This can sometimes lead to **increased complexity**. Creating interfaces and abstract classes can feel like more work upfront compared to just writing a simple, concrete class.

There's also a risk of **potential over-engineering**. If you try to apply OCP to every single part of your application, you can end up with a system that is overly abstract and difficult to understand. It's a balance. OCP is most valuable in the parts of your application that you expect to change or expand in the future.

## Let's See an Example

Imagine we have an `Order` class that needs to handle different kinds of calculations and actions.

### Before OCP: The Rigid Class

In this version, all the logic is inside the `Order` class. What happens when we need to add a new type of discount for VIP users? We have to go back and _change_ the `applyDiscount` method. What if we want to generate a PDF invoice instead of a regular one? We have to change the `generateInvoice` method. This class is "closed" for extension.

```typescript
// Any new feature requires changing this class.
class Order {
  // ...
  calculateTotal() {
    // ...
  }
  applyDiscount() {
    // ...
  }
  generateInvoice() {
    // ...
  }
}
```

### After OCP: The Flexible System

A much better approach is to create an `Order` interface and have different classes implement it.

```typescript
// The core logic only knows about the `Order` interface.
interface Order {
  calculateTotal(): number
}

// We can create as many new types of Orders as we want...
class RegularOrder implements Order {
  calculateTotal() {
    // ...
  }
}

class DiscountedOrder implements Order {
  calculateTotal() {
    // ...
  }
}

// ...without ever changing this class.
class OrderInvoice {
  generate(order: Order) {
    // This method can now accept any kind of Order.
  }
}
```

Now, if we need to add a "VIPOrder" with a special discount, we can simply create a `VIPOrder` class that implements the `Order` interface. We never have to touch the `RegularOrder` or `DiscountedOrder` classes. The `OrderInvoice` class doesn't need to change either, because it can accept any object that conforms to the `Order` interface. Our system is now "open" for extension!

## The SOLID Series

This is the second of five posts on the SOLID principles.

- [S: Single Responsibility Principle](/blog/single-responsibility-principle-srp)
- **O: Open-Closed Principle** (You are here!)
- [L: Liskov Substitution Principle](/blog/liskov-substitution-principle-lsp)
- [I: Interface Segregation Principle](/blog/interface-segregation-principle-isp)
- [D: Dependency Inversion Principle](/blog/dependency-inversion-principle-dip)
