---
tags: ['Next.js', 'React', 'Node.js', 'Tooling']
draft: false
title: 'How to Automatically Sync Files to Your Public Folder in Next.js'
summary: "Tired of manually copying assets into your 'public' folder? Learn how to use a simple Node.js script with Chokidar to automatically watch for changes and keep your files in sync."
date: 2025-01-19
images: []
slug: syncing-files-to-public-folder-in-react-or-nextjs-using-chokidar-and-fs-extra
publish: true
---

## The Annoying Task of Copying Files

When you're building a website with a framework like Next.js or React, the `public` folder is a special place. Anything you put in there, like images, fonts, or videos, is made directly accessible to the browser. This is great, but it can also be a bit of a pain.

Often, you want to keep your assets organized in a separate folder, maybe alongside the components that use them. But this means you have to remember to manually copy any new or updated assets into the `public` folder every time you make a change. Forget to do this, and you end up with broken images and a frustrating development experience.

In this tutorial, we'll solve this problem once and for all by creating a simple script that automatically watches a source folder and copies any changes over to the `public` folder instantly.

## The Tools for the Job

We'll use two small but powerful Node.js packages to make this happen:

- **`chokidar`**: A fantastic library for watching files and directories for changes. It's more reliable and efficient than the built-in file watching in Node.js.
- **`fs-extra`**: A super-charged version of the built-in `fs` module. It adds a bunch of convenient methods, including a reliable way to copy files and folders.

First, let's get these installed in your project. You can use your favorite package manager for this.

```bash
npm install chokidar fs-extra --save-dev
```

or

```bash
yarn add chokidar fs-extra --dev
```

or

```bash
pnpm add chokidar fs-extra -D
```

## The Sync Script

Now, let's create the script that will do the actual work. Create a new folder named `scripts` in the root of your project, and inside that, create a file named `sync.js`.

This script will do two things:

1.  Immediately copy everything from our source folder to our destination folder when it first runs.
2.  If we're in "watch mode," it will keep an eye on the source folder and instantly copy over any new files, changes, or deletions.

```javascript
// scripts/sync.js
const chokidar = require('chokidar')
const fs = require('fs-extra')
const path = require('path')

// Define the source of your assets and the destination in the public folder
const sourceDir = path.resolve(__dirname, '../assets-source')
const publicDir = path.resolve(__dirname, '../public/assets')

// Ensure the source directory exists
fs.ensureDirSync(sourceDir)

// A function to handle the file syncing
const syncFile = (filePath) => {
  const relativePath = path.relative(sourceDir, filePath)
  const destinationPath = path.join(publicDir, relativePath)
  console.log(`Syncing ${relativePath}...`)
  fs.copySync(filePath, destinationPath)
}

// A function to handle file deletion
const removeFile = (filePath) => {
  const relativePath = path.relative(sourceDir, filePath)
  const destinationPath = path.join(publicDir, relativePath)
  console.log(`Removing ${relativePath}...`)
  fs.removeSync(destinationPath)
}

// Check if we should be in watch mode
const watch = process.argv.includes('--watch')

// Perform an initial sync of all files
console.log(`Performing initial sync from ${sourceDir} to ${publicDir}...`)
fs.copySync(sourceDir, publicDir, { overwrite: true })
console.log('Initial sync complete.')

// If in watch mode, set up the file watcher
if (watch) {
  console.log('Watching for file changes...')
  const watcher = chokidar.watch(sourceDir, {
    persistent: true,
    ignoreInitial: true, // Don't fire "add" events on the initial scan
  })

  watcher
    .on('add', syncFile)
    .on('change', syncFile)
    .on('unlink', removeFile)
    .on('addDir', (dirPath) => {
      // Also sync new directories
      const relativePath = path.relative(sourceDir, dirPath)
      const destinationPath = path.join(publicDir, relativePath)
      fs.ensureDirSync(destinationPath)
    })
    .on('unlinkDir', (dirPath) => {
      // Also remove deleted directories
      const relativePath = path.relative(sourceDir, dirPath)
      const destinationPath = path.join(publicDir, relativePath)
      fs.removeSync(destinationPath)
    })
}
```

_Note: This script assumes your source folder is named `assets-source`. You can change this to whatever you like!_

## Hooking It Into Your Project

The final step is to make this script easy to run. We'll add a few commands to the `scripts` section of your `package.json` file.

```json
{
  "scripts": {
    "dev": "node scripts/sync.js --watch & next dev",
    "build": "node scripts/sync.js && next build",
    "sync": "node scripts/sync.js"
  }
}
```

Let's break down what these do:

- **`sync`**: A simple command to run our script once.
- **`build`**: When you build your project for production, this will first run the sync script to make sure all your assets are in the right place, and then it will run the `next build` command.
- **`dev`**: This is the magic command for development. It starts our sync script in `watch` mode (thanks to the `--watch` flag) and then starts the Next.js development server.

Now, when you run `npm run dev`, your `assets-source` folder will be constantly monitored. Any time you add, change, or delete a file, it will be instantly reflected in your `public/assets` folder. No more manual copying!
