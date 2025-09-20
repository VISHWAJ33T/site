---
tags: ['React', 'Next.js', 'Performance', 'SSR']
draft: false
title: "SSR vs. CSR: Understanding the Page Load Waterfall"
summary: "Why do some websites feel instant while others make you wait? It often comes down to Server-Side Rendering (SSR) vs. Client-Side Rendering (CSR). Let's dive into the 'waterfall' to see how they work."
date: 2024-12-01
images: []
slug: server-side-rendering-vs-client-side-rendering-waterfall
publish: true
---

## Who Builds Your Website? The Server or The Browser?

When you visit a modern website, the content you see has to be put together, or "rendered," before it can be displayed on your screen. There are two main ways this can happen: on the website's server before it even gets to you, or inside your own web browser after you've arrived. This choice between **Server-Side Rendering (SSR)** and **Client-Side Rendering (CSR)** has a huge impact on how fast and responsive a website feels.

To really understand the difference, we need to look at something called the "network waterfall."

## The Network Waterfall: A Race Against Time

Imagine your web browser is a construction worker building a house (the website). To do its job, it needs a set of blueprints and a bunch of materials. The "network waterfall" is a chart that shows the order in which the browser requests and receives all these materials—HTML, CSS, JavaScript, images, and data.

It's called a waterfall because each step often has to wait for the previous one to finish, cascading down just like a real waterfall. A long, slow waterfall means a long, slow website.

![An illustration comparing the network requests for SSR and CSR. The SSR waterfall is much shorter, showing the browser gets a complete HTML page first. The CSR waterfall is longer, showing the browser gets a blank HTML page, then has to make several more requests for JavaScript and data before the page is complete.](/static/images/blog/server-side-rendering-vs-client-side-rendering-waterfall/react_waterfall_ssr_vs_csr.png)

## The Long Waterfall of Client-Side Rendering (CSR)

Client-Side Rendering is the approach used by many modern JavaScript frameworks out-of-the-box. With CSR, the server sends your browser a nearly empty HTML file. It's basically just a shell with a link to a big JavaScript file.

This is where the long waterfall begins. The browser has to go through a multi-step process:
1.  **Fetch the empty HTML:** A super-fast first step, but the user just sees a blank white screen.
2.  **Fetch the JavaScript:** The browser then has to download all the JavaScript code needed to build the page.
3.  **Run the JavaScript:** The browser executes the code, which builds the structure of the page.
4.  **Fetch the Data:** Now that the JavaScript knows what content it needs (like a blog post or user profile), it has to make *another* network request back to the server to get that data.
5.  **Render the Final Page:** Once the data arrives, the JavaScript can finally render the complete page for the user to see.

This long chain of requests is the classic CSR waterfall. While it can lead to very interactive, app-like experiences *after* the initial load, that first visit can feel painfully slow.

## The Short Waterfall of Server-Side Rendering (SSR)

Server-Side Rendering flips this process on its head. With SSR, the server does most of the heavy lifting *before* it sends anything to your browser. The server builds the full HTML of the page, including all the content, and sends it as a single, complete package.

The waterfall for SSR is much shorter and faster:
1.  **Fetch the Complete HTML:** The browser makes a single request and receives a fully-formed HTML document with all the text and content ready to be displayed. The user sees the page content almost instantly.
2.  **Fetch the JavaScript (in the background):** While the user is already reading the page, the browser can download the JavaScript in the background. Once it's loaded, it "hydrates" the page, making it interactive.

This approach leads to a much faster "time to first content," which is crucial for keeping users engaged and for good Search Engine Optimization (SEO), as search engines can easily read the content of the page.

## Which One is Better?

The truth is, neither one is "better" in every situation. **Client-Side Rendering** is often simpler to set up and is great for highly interactive, dashboard-like applications where the user will be staying for a long time after the initial load.

**Server-Side Rendering** is generally the better choice for content-focused websites like blogs, news sites, and e-commerce stores, where a fast initial load and good SEO are the top priorities.

Many modern frameworks, like Next.js, offer a hybrid approach, allowing you to choose the best rendering method for each page of your site, giving you the best of both worlds.
