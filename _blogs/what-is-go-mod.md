---
title: What is go.mod?
date: 2022-01-31
description: What `go mod init` creates, what go.mod contains, and why Go tracks only the dependencies a project actually uses.
tags: [go, modules]
original_url: https://goforgophers.blogspot.com/2022/01/what-is-gomod.html
published: true
---

For every project in Go we create a directory with the name of the project. With in this directory we initialise with:

```sh
go mod init <name of the module>
```

What it actually do is, it creates a file named **go.mod** in the project directory.

## What it contains?

It contains the name of the module and also version of go you are using and also the names of the package along with their version.

## What is its use?

It automatically logs all the go packages and their version that are imported in the project.

## Why is it required?

In order to answer this question one should actually know the drawbacks of other programming languages. Let's have a high level understanding.

When ever an import is done, the compiler places the code of the imported file in the source code file this means that the imported file goes under compilation.

### So what is wrong in that?

> Think about what if we do not use any feature from the imported file?

It is just compiling of no use. As compilation takes times, having a few useless compilations takes out the useful time for the actual compilation. For smaller projects we cannot observe that loss in time because computers are fast. In case of the large projects multiple imports can be found at multiple source files. Which takes lot of effort to find the one which has not been used. In such cases, can you guess the time for compilation? It is actually in hours and days.

This is the spot why Go designers thought it as a big deal and so we have the dependency tracking which only maintains the packages that are used in the project.

Comments are appreciated.
