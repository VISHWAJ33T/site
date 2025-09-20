---
title: "SOLID Principles, Part 1: The Single Responsibility Principle"
draft: false
tags: ['SOLID', 'OOP', 'Architecture']
date: 2024-07-07
summary: "Ever seen a class that does everything, including the dishes? Let's talk about the 'S' in SOLID—the Single Responsibility Principle—and why your classes should have only one job."
category: SOLID
slug: single-responsibility-principle-srp
publish: true
---

## Let Your Code Do One Thing Well

Imagine hiring a chef who is also a plumber and a dentist. While impressive, it would be a bit chaotic. If their cooking is bad, do you replace the plumber or the dentist? This is the kind of confusion we want to avoid in our code.

This brings us to the first of the five SOLID principles of object-oriented design: the **Single Responsibility Principle (SRP)**. It's a simple but profound idea: **a class should have only one reason to change.**

This doesn't mean your class can only have one method. It means that all the methods and properties in your class should be focused on a single, clear purpose. Your class should have one job, and it should do that job well. If a class is trying to be a chef, a plumber, and a dentist all at once, you're going to have a bad time.

## How to Build Focused, Single-Purpose Classes

Applying the SRP is all about learning to **separate concerns**. When you're designing a class, take a moment to think about the different "jobs" it's trying to do. If you can spot more than one, that's a sign that you should probably split it into multiple, smaller classes.

A great way to do this is to give your classes very clear, descriptive names. A class named `UserManager` sounds like it might be doing too much. Does it manage users in the database? Does it send them emails? Does it also handle their billing? The name is a clue that it's probably breaking the SRP.

If you find a class has grown too large and is juggling too many jobs, don't be afraid to **refactor** it. Carve out the different responsibilities and give each one its own dedicated class. This will make your codebase more modular, easier to understand, and much more pleasant to work with.

## The Good and Bad of a One-Track Mind

Sticking to the Single Responsibility Principle has huge benefits, but it also requires a thoughtful approach.

### The Joys of Focused Code

The most significant advantage is **readability**. A class with a single, clear purpose is incredibly easy to understand. You don't have to guess what it's for; its job is obvious. This makes your code much **easier to maintain**. When you need to change how emails are sent, you know you just have to go to the `EmailService` class. You don't have to worry that your change will accidentally break something in the user database logic.

This modular design also leads to much more **reusable** code. A well-designed `EmailService` can be used anywhere in your application that needs to send an email, not just for user-related tasks.

### The Potential Downsides

The main challenge with SRP is that it can lead to a project with a lot of small files. Breaking down a single `UserManager` class into a `UserDatabase` class, an `EmailService`, and a `BillingManager` is great for organization, but it does mean you now have three classes to manage instead of one. For a very small project, this might feel like overkill.

There's also a very minor risk of a **performance impact** if your classes need to call each other frequently, but in most modern applications, this is not something you need to worry about. The clarity and maintainability you gain from SRP are almost always worth the trade-off.

## A Real-World Example

Let's look at that `UserManager` class we talked about.

### Before SRP: The Class That Does Everything

Here, our `UserManager` is trying to do three different jobs: talk to the database and send emails. If we need to change how we send emails (for example, switching from one email provider to another), we have to modify the `UserManager` class, which has nothing to do with database logic. This is a classic violation of SRP.

```typescript
// This class has two reasons to change: database logic and email logic.
class UserManager {
  getUser(id) {
    // Logic to get a user from the database...
  }

  updateUser(id, data) {
    // Logic to update a user in the database...
  }

  sendEmail(user, message) {
    // Logic to send an email to the user...
  }
}
```

### After SRP: Every Class Has One Job

By splitting the class, we now have two separate classes, each with a single, clear responsibility.

```typescript
// This class is only responsible for database interactions.
class UserDatabase {
  getUser(id) {
    // Logic to get a user from the database...
  }

  updateUser(id, data) {
    // Logic to update a user in the database...
  }
}

// This class is only responsible for sending emails.
class EmailService {
  sendEmail(user, message) {
    // Logic to send an email to the user...
  }
}
```
Now, if we need to change our email provider, we only have to touch the `EmailService`. The `UserDatabase` class remains safe and untouched. This is the power of the Single Responsibility Principle.

## The SOLID Series

This is the first of five posts on the SOLID principles. Stay tuned for the rest!

-   **S: Single Responsibility Principle** (You are here!)
-   [O: Open-Closed Principle](/blog/open-closed-principle-ocp)
-   [L: Liskov Substitution Principle](/blog/liskov-substitution-principle-lsp)
-   [I: Interface Segregation Principle](/blog/interface-segregation-principle-isp)
-   [D: Dependency Inversion Principle](/blog/dependency-inversion-principle-dip)
