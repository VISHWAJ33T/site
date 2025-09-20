---
draft: false
title: "Human-in-the-Loop CI/CD: When to Pump the Brakes on Automation"
summary: "Automation in CI/CD is amazing, but sometimes you need a human touch. Let's explore when and how to strategically add manual steps to your pipeline without slowing everything down."
date: '2024-10-24'
images: []
tags: ['ARTICLE', 'DEVOPS', 'CICD', 'HITL']
slug: human-in-the-loop-cicd
publish: true
---

Automation has taken over the world—especially in software development. And let's be honest, we love it! Why wouldn't we? Continuous Integration (CI) and Continuous Deployment (CD) pipelines are a developer's best friend, making sure our code flows smoothly from commit to production, often faster than we can say "git push."

But, as with all things that run on autopilot, sometimes it helps to have a human step in and say, "Wait a second, something doesn't feel right." This is where Human-in-the-Loop (HITL) comes into play in CI/CD.

![A diagram showing a CI/CD pipeline with a manual approval step before the final deployment.](/static/images/blog/human-in-the-loop-cicd/hitl-flow-diagram.png)

Now, if you're reading this, I'm assuming you've already dabbled in CI/CD pipelines, particularly with Jenkins, and you're not here for the basics. You know your Jenkins from your CircleCI, and you're aware of how magical it feels when all the tests pass and Jenkins gives you that satisfying green light. But, let's not get carried away, because sometimes, even with all the automation in place, there's a need for manual intervention. Whether it's approving a critical production release or double-checking that your last-minute feature tweak won't break half the system, Human-in-the-Loop CI/CD is essential.

### Pre-Requirements:

Before you get too excited and dive into the code snippets, make sure you've got a few things in place:

-   **Jenkins Installed:** You've probably already done this, but just in case—ensure you've got Jenkins installed and running on your system. If not, a quick "sudo apt-get install jenkins" should get you there, assuming you have Java installed (you do, right?).
-   **Jenkins Pipeline Knowledge:** You should already know how to set up a basic Jenkins pipeline—none of that "click around the UI and pray" business. If you're fuzzy on pipelines, go ahead and brush up on that first.
-   **Git and GitHub:** Since we'll be pulling code from repositories, make sure you've got Git set up and have a repository you can use for testing.
-   **Access to Production Environment:** No kidding, don't do this in production. Or do, but don't say I didn't warn you.
-   **Basic CI/CD Knowledge:** Again, this is advanced stuff. So, if you're still figuring out what the "CD" in CI/CD stands for, it's best to go read up on that first.

With that out of the way, let's get into the good stuff.

## The Role of Human-in-the-Loop in Advanced CI/CD Pipelines

At the heart of any DevOps pipeline is one goal: automation. We automate testing, building, deploying, scaling, monitoring, and sometimes, even the celebratory team emails. But as much as we'd love to automate everything, there are certain points where a little human oversight can go a long way. That's where Human-in-the-Loop (HITL) comes into play.

So, why would we want to disrupt our lovely automated pipelines with manual intervention? Simple—because not every scenario is predictable, and there are things that automation just doesn't handle well:

-   **Critical Production Deployments:** Automation is awesome for routine deployments, but pushing a major release into production can be nerve-wracking. This is when you want a human to step in and give the final approval, making sure nothing is overlooked.
-   **Security Vulnerability Checks:** Automated security scans can flag issues, but a human might need to assess whether a vulnerability is critical or not. It's better to have someone verify that Jenkins didn't cry wolf before rolling out the change.
-   **Non-Deterministic Failures:** Automated tests can sometimes be flaky, producing inconsistent results. A human eye is often needed to decide whether the test is legitimately failing or if Jenkins just had a bad day.

In short, HITL in CI/CD is all about introducing a layer of human judgment—something that automation (for now) can't replicate.

## When to Introduce Human Intervention: Key Scenarios

Okay, so you've bought into the idea that some pipelines need a human in the loop. But how do you know when to introduce manual intervention? You don't want to be that person who inserts unnecessary manual steps just to feel important. The key is to find the balance between efficiency and control.

### High-Risk Releases

Imagine you're deploying a new version of an app that your company has spent months building. It's the big one. The release where everything has to go right. Would you really trust automation to make all the decisions here? Heck no! This is when you need human approval—someone who can review the deployment and give the thumbs-up (or down) before production chaos ensues.

This is usually set up with approval gates in Jenkins, where a human reviewer is notified and required to approve the deployment manually. Jenkins provides a handy `input` step to facilitate this process, allowing the pipeline to pause and wait for a human to confirm the deployment.

Here's an example of how you can add an approval step to your Jenkins pipeline:

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running Tests...'
                sh 'make test'
            }
        }
        stage('Approval') {
            when {
                expression {
                    return (env.BRANCH_NAME == 'main') // Only on the 'main' branch
                }
            }
            input {
                message "Do you approve deploying to production?"
                ok "Proceed"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'make deploy'
            }
        }
    }
}
```
In this case, once the tests pass, Jenkins pauses and asks for approval before proceeding with deployment. You've essentially inserted a "hold up, let's double-check" step into your pipeline.

### Dealing with Non-Deterministic Test Results

Let's face it: automated tests sometimes fail for no apparent reason. Whether it's a network hiccup or just one of those weird bugs that only happens once in a blue moon, Jenkins can't always tell the difference between a real failure and a false alarm. This is where human intervention saves the day. By having a manual review step in place, a developer can decide whether to ignore the test failure and continue with the deployment or investigate further.

### Security and Compliance Checks

Security is a big deal. Jenkins can run security tests all day long, but when it comes to compliance checks or critical vulnerabilities, you don't want to leave everything up to automation. Human intervention ensures that potential security issues flagged by automated tools are properly reviewed before pushing anything to production. Tools like SAST (Static Application Security Testing) can raise alarms, but it's up to a security engineer to decide if it's something worth halting the release for.

![A diagram illustrating the key stages in a CI/CD pipeline where human intervention might be added, such as security checks and high-risk releases.](/static/images/blog/human-in-the-loop-cicd/hitl-pipeline-steps.png)

## Practical Techniques for Manual Intervention

Now that we've gone over the *when*, let's dive into the *how*. When you think of adding manual steps to your pipeline, the goal is to keep the flow efficient without turning your shiny automated process into a bureaucratic nightmare.

### Approval Gates and Conditional Steps

In Jenkins, adding manual intervention is pretty straightforward with the `input` step. But remember, you don't want to overdo it and turn every minor commit into a meeting. The key is to strategically place manual checkpoints in your pipeline—typically before risky operations like deploying to production or after a flaky test failure.

You can even introduce conditional logic in your pipeline to skip manual intervention unless certain conditions are met. For instance, you could automatically deploy to production if the changes are minor but require manual approval for more significant releases.

### Alternatives to Jenkins

Let's be real for a second. If Jenkins isn't your cup of tea, I can't really blame you. We all have our preferences, and maybe you like the way GitLab CI smells in the morning or how GitHub Actions always has your back. Whatever floats your DevOps boat, the good news is that pretty much every major CI/CD platform offers similar tools for injecting human intervention. Whether it's CircleCI or Azure Pipelines, they all have their way of making sure you can halt automation and bring in the humans when needed.

But no matter which platform you use, there's a universal truth: You don't want to bog down your pipeline with manual steps unless absolutely necessary. We love automation because it's fast and efficient, right? So the trick is to strike a balance—using manual intervention wisely to catch edge cases or mitigate risks without throwing a wrench into your sleek DevOps machine.

Now that we've set the stage and agreed we don't want humans unnecessarily poking around in the pipeline every two minutes, let's get into the meat of it - how to design efficient CI/CD pipelines that use human intervention effectively without sacrificing speed. Because, as much as we love a good safety net, we don't want to slow things down every time Jenkins sneezes.

## Tooling and Advanced Configurations

When it comes to tooling and configurations, Jenkins gives you a lot of room to play. You can introduce manual intervention steps, but here's the kicker: you don't have to overdo it. Think of manual intervention as your emergency brake—it's great to have, but you don't pull it every time you hit a red light. The idea is to integrate human oversight in the pipeline only when it's necessary and configure the tools to keep things moving when it's not.

### Smarter Approval Gates

We already discussed using Jenkins' `input` step for manual approval. You can take this one step further by making the conditions smarter. Instead of having a human approve every deployment, you can add some conditional logic. For instance, you could configure Jenkins to only request approval for deployments to production, while other environments (like staging or testing) get a free pass. Here's an example:

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'make build'
            }
        }
        stage('Testing') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        echo 'Running unit tests...'
                        sh 'make test-unit'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        echo 'Running integration tests...'
                        sh 'make test-integration'
                    }
                }
            }
        }
        stage('Pre-Production Approval') {
            when {
                branch 'release'
            }
            input {
                message "Ready for Pre-Production Deployment?"
                submitter "qa-team"  // Specifying who can approve
                parameters {
                    string(name: 'TARGET_ENV', defaultValue: 'staging', description: 'Environment to deploy to')
                }
            }
            steps {
                echo "Deploying to ${params.TARGET_ENV}"
                sh 'make deploy'
            }
        }
    }
}
```
This little nugget ensures that manual approval only kicks in when it's absolutely necessary—like when you're about to deploy to production. For other branches or less critical environments, Jenkins will breeze right through, saving you (and your team) from unnecessary hand-holding.

### Feature Flags and Rollbacks: The Unsung Heroes

Let's talk about feature flags. Feature flags allow you to toggle features on or off without rolling out a new deployment. In the context of HITL CI/CD, they provide a level of control that's ideal for larger, riskier deployments. Instead of doing a manual intervention every time you want to test a new feature, you can use feature flags to release it to a subset of users, and if things go south, just flip the flag off.

This is a brilliant way to keep things moving quickly while still having that manual oversight when needed. Pair this with a strong rollback strategy, and you'll be deploying faster than Jenkins can send you a congratulatory email.

Alternatives like GitLab and CircleCI have similar capabilities, but Jenkins has robust integrations for feature flagging tools like LaunchDarkly and Flagsmith, making it easier to incorporate this strategy into your pipeline. Here's an example:

```groovy
pipeline {
    agent any
    environment {
        LAUNCH_DARKLY_KEY = credentials('launchdarkly-api-key')
    }
    stages {
        stage('Feature Deployment') {
            steps {
                script {
                    def response = httpRequest(
                        url: 'https://app.launchdarkly.com/api/v2/flags/my-project/my-feature',
                        httpMode: 'PATCH',
                        customHeaders: [[name: 'Authorization', value: LAUNCH_DARKLY_KEY]],
                        requestBody: '''{
                            "patch": [
                                {"op": "replace", "path": "/on", "value": true}
                            ]
                        }'''
                    )
                    echo "Feature flag toggled: ${response.status}"
                }
            }
        }
    }
}
```

## Best Practices for Balancing Automation and Humans

Let's be honest: if you could automate every little thing and still sleep soundly at night, you probably would. And that's what you should aim for. Automation is your friend, and human intervention should only be the last resort—a fail-safe for those "Oh no, did we break production again?" moments.

But what happens when we over-rely on humans? Pipelines slow down, bottlenecks form, and the whole purpose of DevOps efficiency goes out the window. So, how do you ensure that human intervention is there when you need it, but doesn't hold your pipeline hostage?

### Design Pipelines with Minimal Disruption

The goal of every CI/CD pipeline should be fast feedback with minimal friction. If you're introducing manual approval steps, make sure they're strategic. Don't insert human intervention just for the sake of it—be intentional about where and why you're adding these checkpoints. For example, use manual steps for high-risk deployments, like major updates to production or when working in a highly regulated industry (think healthcare or finance). Skip manual approvals for low-risk environments (e.g., staging or internal testing), and instead rely on your automated tests and security scans.

You can even parallelize your approvals if necessary. For instance, if both the security team and the product team need to sign off on a release, Jenkins allows you to have multiple approval points happening simultaneously to reduce waiting time.

### Use Metrics to Optimize

Once you've added manual steps to your pipeline, monitor the metrics. If you find that human intervention is slowing down your pipeline too much, adjust the thresholds. If the manual approvals are unnecessary 90% of the time, it's time to re-evaluate when and where you need them. Use your pipeline performance metrics to fine-tune the human touchpoints, ensuring they're only called upon when absolutely needed.

### Human Oversight as a Fail-Safe, Not the Default

The last thing you want is to end up relying on human intervention to fix what automation should handle. Humans should only be the fail-safe, not the default. If you're finding that manual approvals are being triggered more often than you'd like, it's a sign that something's wrong in your automated testing or deployment processes. Use human intervention for edge cases, not as a crutch for an unreliable pipeline.

## Case Studies: Real-World Examples

Let's step out of the abstract and into the real world, where pipelines don't always behave as expected, and developers… well, we've all seen a Jenkins job fail in the weirdest ways. In this section, we'll walk through a few real-world examples (no, I'm not making this stuff up) where Human-in-the-Loop (HITL) CI/CD either saved the day or complicated things. Spoiler alert: a good balance between automation and human intervention makes all the difference.

### Case Study 1: A Security-First Approach at a FinTech Company

Let's talk about a FinTech company—because if there's one sector that loses its mind over security, it's finance. This company was rolling out an update to their mobile app, and while they had a pretty robust automated testing setup, security compliance was a nightmare. Any potential vulnerability could mean regulatory violations, millions in fines, or worse—a breach of customer data. Yikes.

They introduced manual approval steps right after their security scans in Jenkins. Here's how it worked:
1. Jenkins automatically built and tested the code.
2. An automated security scan flagged vulnerabilities.
3. Before deployment to production, the pipeline paused for a security review, which had to be manually approved by the security team.

This allowed the company to strike a balance between fast iterations and meeting stringent security requirements. The HITL approval ensured that no code went to production without being fully vetted by a real person, allowing them to avoid potential vulnerabilities being released due to automated misinterpretation. The manual approval process didn't slow things down significantly because it was only triggered in production deployments. The security team became a crucial part of the CI/CD pipeline, reviewing and approving code that would otherwise have been flagged and blocked by automated systems. They went from "I hope Jenkins didn't miss anything" to "Our security team gave the green light, so we're good."

### Case Study 2: Avoiding a Full-Blown Disaster in E-Commerce

Now, imagine you're working for a big e-commerce platform. Black Friday is around the corner, and you're pushing out a major update to your backend system. What could go wrong? Well, everything. The last thing you want is to take your platform down right when a million users are trying to buy discounted air fryers.

In this case, Jenkins was doing most of the heavy lifting. The pipeline ran automated tests, built the code, and was prepped to deploy to production. But—thankfully—the team had added a manual approval step for Black Friday deployments. This was not just any deployment; it was potentially make-or-break for the company.

Here's what went down:
1. Jenkins ran the build and passed all automated tests.
2. The pipeline paused for a manual review before hitting production.
3. A senior engineer stepped in, looked over the logs, and realized that while everything looked good on paper, a critical configuration file had been incorrectly updated (oh, the horror!).

Without that manual step, the faulty configuration would've gone straight to production, and the site would've gone down faster than a 90% off sale. The company avoided a catastrophic failure that could have cost millions in lost sales. The lesson here? Automated tests are great, but they don't catch everything. Sometimes, a fresh set of human eyes is all it takes to catch what automation misses.

### Case Study 3: The Human Bottleneck at a SaaS Startup

Okay, time for a cautionary tale. Picture this: a fast-moving SaaS startup with a brilliant but small team of developers. They were pushing updates multiple times a day, and everything was going great—until they decided to introduce manual approval for deployments. The idea was good: ensure no code hits production without a final sanity check by the lead developer.

But here's where it went sideways:
1. Jenkins ran the builds and tests.
2. After passing all tests, the pipeline halted for manual approval on every single deployment.
3. The lead developer was often busy or, you know, doing lead developer things.

The result? Their once fast-moving CI/CD pipeline was slowed to a crawl. Multiple times a day, deployments would just sit there, waiting for the lead to hit "approve." And when things piled up? Well, the backlog of changes waiting to go live became the perfect recipe for an eventual massive merge conflict. The startup quickly learned that while manual intervention is important, overusing it can turn your pipeline into a bottleneck. They pivoted to a more balanced approach—introducing manual approval only for critical deployments (like production) and letting the automated pipeline handle less risky environments like staging.

## Continuous Improvement: Optimizing Over Time

By now, we've covered the importance of using Human-in-the-Loop (HITL) strategically, provided some real-world examples, and learned how humans can either be the pipeline's saviors or the source of its delays. But, like with anything in DevOps, your pipeline shouldn't be a static, one-and-done affair. It needs to evolve and improve over time—including the manual intervention aspects.

### Embrace Feedback Loops

Your pipeline is like any other piece of software—it's not perfect the first time, and it can always be optimized. Start by treating it like any other product and introduce feedback loops. Get feedback from your engineers, ops team, and any other stakeholders who interact with the CI/CD process. If people feel like they're constantly being dragged into manual reviews unnecessarily, it's a sign that something's off. You should also analyze the data from your CI/CD pipeline. Take a look at the bottlenecks—if manual intervention is slowing down your pipeline, how often is it actually necessary? Could the same results be achieved with more robust testing or better code reviews?

### Use Metrics to Fine-Tune

Metrics are your best friend when optimizing HITL pipelines. You should be collecting data on how long manual intervention steps take and how often they catch something that automated checks missed. Key metrics to track include:
- **Mean Time to Approve (MTTA):** How long does it take for human intervention to occur? If it's taking too long, that's a problem.
- **Frequency of Interventions:** How often are manual approvals triggered? If this number is high, you may need to reassess the placement of manual steps.
- **Effectiveness of Interventions:** How often do these interventions catch real issues? If 90% of the time the human just clicks "approve" without making any changes, it's probably not adding value.

Armed with these metrics, you can make informed decisions about where to scale back manual steps or introduce more automated checks.

### Automate the Review Process

Automation is still your best friend, even when we're talking about human intervention. One key improvement is to automate parts of the manual review process. For instance, automatically collect logs or test reports and surface any anomalies to the person reviewing the deployment, so they're not digging through data manually. You can also use AI/ML tools to assist in code review or log analysis to speed up the decision-making process. Jenkins, for instance, can be integrated with machine learning tools that analyze past failures and successes to predict whether a build might need more scrutiny. These tools won't replace your engineers (yet…), but they can definitely help prioritize what needs a closer look and what doesn't.

### Iterate, Iterate, Iterate

The same way your codebase undergoes iterations, your CI/CD pipeline should be revisited regularly. Maybe that security review process was critical six months ago, but now your automated security tools have caught up and no longer require manual intervention. Or maybe a major incident occurred that requires more human oversight in certain stages. Don't set it and forget it. Your pipeline should evolve with your product, team structure, and the tools available.

## Final Thoughts: Striking the Right Balance

Ah, the holy grail of DevOps: finding the perfect balance between automation and human intervention. It's kind of like making a great cup of coffee—too much of one thing, and you've ruined it. Too much automation, and you risk missing out on catching critical issues that humans could have spotted. Too much manual intervention, and you're going to have a slow, cumbersome pipeline that feels like it's stuck in 2009.

At the end of the day, the goal of HITL is to bring in humans where they're most valuable—making strategic decisions that machines aren't yet capable of. But that doesn't mean you want to slow your pipeline down or waste your team's time with trivial approvals. It's about using human brains only when machines fail to handle the complexity.

By following these guidelines, you'll end up with a CI/CD pipeline that's fast, efficient, and secure—without turning it into a bottleneck of approvals and log reviews. And with that, we've covered all the bases. You now have everything you need to strategically integrate Human-in-the-Loop in your CI/CD pipeline, ensuring that your deployments are fast, reliable, and ready to handle whatever your product (or Jenkins) throws at them. So go forth, deploy wisely, and may your Jenkins jobs run smoothly… at least most of the time.