---
title: "SOLID Principles, Part 5: The Dependency Inversion Principle"
draft: false
tags: ['SOLID', 'OOP', 'Architecture']
date: 2024-09-01
summary: "Don't call us, we'll call you. The 'D' in SOLID is all about inverting control to make your code flexible and testable. Let's wrap up our SOLID series with the Dependency Inversion Principle."
category: SOLID
slug: dependency-inversion-principle-dip
publish: true
---

## Don't Call Us, We'll Call You

We've arrived at the final letter of the SOLID acronym: "D," which stands for the **Dependency Inversion Principle (DIP)**. This one can sound a bit intimidating, but it's based on a powerful, real-world idea that you might know as the "Hollywood Principle": *Don't call us, we'll call you.*

The Dependency Inversion Principle has two parts:
1.  High-level modules should not depend on low-level modules. Both should depend on abstractions (like interfaces).
2.  Abstractions should not depend on details. Details should depend on abstractions.

In simple terms, this means that a high-level class (like a `UserService` that handles business logic) shouldn't be tightly coupled to the specific, low-level tools it uses (like a `PostgreSQLDatabase` class). Instead, the high-level class should only know about an *abstraction*, like a generic `Database` interface. The specific database class can then be "plugged in" from the outside.

This "inverts" the typical flow of control. Instead of the `UserService` creating and controlling its own database connection, the control is inverted, and the database connection is given to the `UserService`.

## How to Invert Your Dependencies

The most common way to apply the Dependency Inversion Principle is through a technique called **Dependency Injection**. This is a fancy term for a simple idea: if a class needs a tool to do its job, don't let it create the tool itself. Instead, give (or "inject") the tool to the class when you create it, usually through its constructor.

To make this work, you need to rely on **abstractions over concrete implementations**. You'll define an `interface` that describes what the tool can do (e.g., a `Database` interface with a `getUser` method). Your high-level class will only know about this interface. Then, you can create multiple concrete classes (like `PostgreSQLDatabase` or `MockDatabaseForTesting`) that all implement this same interface.

This allows you to swap out the low-level details without the high-level class ever knowing or caring.

## The Good and Bad of Inverting Control

Flipping the flow of control is a powerful technique, but it comes with its own considerations.

### The Power of "Pluggable" Code

The biggest benefit of DIP is that it dramatically **reduces coupling** between your classes. Your high-level business logic is no longer tied to the nitty-gritty details of your database or email server. This makes your system incredibly **flexible**. Need to switch from a PostgreSQL database to a MySQL database? No problem. Just create a new `MySQLDatabase` class that implements your `Database` interface and inject that instead. The `UserService` doesn't need to change at all.

This flexibility makes your code much **easier to test**. When you're testing your `UserService`, you don't need to connect to a real database. You can just create a simple `MockDatabase` class that implements the `Database` interface and returns fake data. This makes your tests faster, more reliable, and completely independent of external systems.

### The Cost of Abstraction

The main trade-off is that DIP can introduce a bit more **complexity** into your project. You now have interfaces to manage and dependencies to inject, which can feel like more moving parts, especially if you're new to the concept.

There's also a small risk of the **overuse of interfaces**. Not every single class needs to be hidden behind an interface. This principle is most valuable for decoupling major parts of your system, like the business logic from the data access layer, or your application from external services.

## Let's See an Example

Imagine a `UserService` that needs to fetch user data from a database.

### The Tightly Coupled Way

In this version, the `UserService` *knows* it's using a `DatabaseService`. It creates its own instance of it. This is a problem. What if we want to test `UserService` without a real database? We can't. What if we want to switch to a different kind of database? We have to change the `UserService` code.

```typescript
// The high-level UserService depends directly on the low-level DatabaseService.
class DatabaseService {
  getUser(id: string): User {
    // Logic to get a user from a real database...
  }
}

class UserService {
  private database: DatabaseService;

  constructor() {
    // The UserService is creating its own dependency. This is a tight coupling.
    this.database = new DatabaseService();
  }

  getUser(id: string): User {
    return this.database.getUser(id);
  }
}
```

### The Decoupled, Inverted Way

Here, we "invert the control." The `UserService` no longer knows or cares what kind of database it's using. It only knows about the `Database` interface. We "inject" the actual database service from the outside.

```typescript
// First, we define the abstraction.
interface Database {
  getUser(id: string): User;
}

// Then, we create a concrete implementation.
class DatabaseService implements Database {
  getUser(id: string): User {
    // Logic to get a user from a real database...
  }
}

// The UserService now depends only on the abstraction.
class UserService {
  private database: Database;

  // The dependency is "injected" from the outside.
  constructor(database: Database) {
    this.database = database;
  }

  getUser(id: string): User {
    return this.database.getUser(id);
  }
}

// Now we can create and "inject" any database we want!
const databaseService = new DatabaseService();
const userService = new UserService(databaseService);
```
This version is flexible, testable, and a perfect example of the Dependency Inversion Principle in action.

## The SOLID Series

And with that, our journey through the five SOLID principles is complete!

-   [S: Single Responsibility Principle](/blog/single-responsibility-principle-srp)
-   [O: Open-Closed Principle](/blog/open-closed-principle-ocp)
-   [L: Liskov Substitution Principle](/blog/liskov-substitution-principle-lsp)
-   [I: Interface Segregation Principle](/blog/interface-segregation-principle-isp)
-   **D: Dependency Inversion Principle** (You are here!)
