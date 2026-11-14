---
title: What is go package?
date: 2022-03-03
description: What the `package` line at the top of every Go file does, how packages split code across files, and how exporting works.
tags: [go, packages]
original_url: https://goforgophers.blogspot.com/2022/03/what-is-go-package.html
published: true
---

After we start a project and try to write a new go code, we start with

```go
package <package name>
```

## What does this line would do?

lets' explore :-)

It is used to organize the code into multiple files, we knew that every package resides in its directory and `.go` files in this directory should have a package name same as that of directory name.

With in this package each `.go` file can access every other function and variable with in the same package. This makes your code modular and maintainable.

In simpler words we can say that, instead of writing all the code in one source file it can be splitted into multiple source files.

Directory `p1`:

```go
package p1

import "fmt"

func hello() {
    fmt.Println("hello")
}
```

Directory `p2`:

```go
package p2

import "fmt"

func hello() {
    fmt.Println("hello")
}
```

## Exporting

If we need a function or a variable to use in another package then we have to export that function or variable, we can do that by making first character of the name of the variable or function to upper-case.

So simple as that. :)

```go
package p3

import "fmt"

func Hello() { // exported function
    fmt.Println("hello")
}
```
