---
title: "Getters and Setters: Your Code's Bodyguards"
draft: false
tags: ['OOP', 'Encapsulation', 'Best Practices']
date: 2024-05-05
summary: "Why let just anyone mess with your object's data? Learn how getters and setters act like bodyguards for your properties, keeping your code safe, flexible, and bug-free."
category: Classes
slug: use-getters-and-setters
publish: true
---

## Why Your Properties Need Bodyguards

When you create a class in object-oriented programming, you're creating a blueprint for objects that will hold data. This data, stored in properties, is the heart of your object. Now, you could just make all your properties public, allowing any part of your code to read and change them whenever it wants. But that's like leaving the front door of your house wide open. It's risky!

This is where **getters and setters** come in. Think of them as the friendly but firm bodyguards for your object's properties. They are special methods that give you control over how other parts of your code can access and modify your object's data. Instead of letting code barge in and change a property directly, you make it go through the "setter" bodyguard, who can check its credentials first. And when code wants to read a property, it has to ask the "getter" bodyguard, who can provide the data in a safe, controlled way.

This principle of protecting an object's internal data is a core concept in programming called **encapsulation**, and getters and setters are your primary tools for achieving it.

## Putting Your Bodyguards to Work

Using getters and setters is all about adding a layer of control. When you design a class, you can decide exactly what kind of access each property needs.

A common practice is to make your properties `private` (often denoted with a leading underscore, like `_name`), which means they can't be accessed directly from outside the class. Then, you create a public `getter` and `setter` for that property. The real power comes from the logic you can add inside these methods. For example, a setter is the perfect place to **perform validation**. Before you allow a new value to be set, you can check if it's valid. You wouldn't want to allow a user's age to be set to a negative number, right? The setter can prevent that.

You can also be strategic about which bodyguards you hire. Does a property's value depend on other properties? Create a **getter** for it, but no setter, making it a read-only, calculated value. For example, a `Rectangle` class might have a getter for `area` that calculates `_width * _height`. Do you have a property that should only be set once and never read? Give it a **setter**, but no getter. This fine-grained control is what makes your classes robust and reliable.

## The Good and the Not-So-Good

While getters and setters are incredibly useful, they're not a silver bullet for every situation.

### Why You'll Love Getters and Setters

The biggest win is **encapsulation**. By hiding the internal details of your class, you create a clean, predictable "public interface" for other developers to use. This also gives you incredible **future flexibility**. Let's say you're storing a person's `name` as a single string, but later you decide to store it as `_firstName` and `_lastName`. If other code was accessing the `name` property directly, that change would break everything. But if you were using a `getName()` getter, you can just update the *inside* of that getter to return `${this._firstName} ${this._lastName}`, and none of the code that *uses* your class will ever know the difference!

As we mentioned, **validation** is another huge benefit. Setters are your first line of defense against bad data, helping to prevent bugs before they even happen.

### The Potential Downsides

Introducing getters and setters for every single property can sometimes feel like overkill and add a bit of **extra complexity** to your code, especially for very simple classes. There's also a tiny, usually unnoticeable, **performance cost** compared to accessing a property directly, because you're calling a method instead.

The biggest practical issue is that if you decide to add getters and setters to a class that other people are already using, it can be a **breaking change**. You'll have to go and update all the places where the properties were being accessed directly. This is a great reason to start with getters and setters from the beginning!

## Let's See an Example

Imagine we have a `Person` class.

### The "Door Wide Open" Approach

Without getters and setters, anyone can change the `name` property to anything, including an empty string, which might not be what we want.

```typescript
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}

const person = new Person('Alice');
console.log(person.name); // Directly accessing the property
person.name = ''; // Uh oh, we can set it to an invalid value!
person.greet();
```

### The "Bodyguard" Approach

With getters and setters, we can protect our `_name` property. We'll make it private and add a getter and a setter. Notice the validation logic in the setter!

```typescript
class Person {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    // Our "setter" bodyguard checks the new value first!
    if (newName.length === 0) {
      throw new Error("The name cannot be empty");
    }
    this._name = newName;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}!`);
  }
}

const person = new Person('Alice');
console.log(person.name); // Uses the getter
person.name = 'Bob'; // Uses the setter

try {
  person.name = ''; // The setter will now throw an error!
} catch (e) {
  console.error(e.message);
}
```
Now our `Person` object is much safer and more predictable.
