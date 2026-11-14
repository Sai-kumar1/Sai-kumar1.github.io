---
title: GO111Module Environment Variable
date: 2022-03-03
description: Why Go needed package versioning, where the "111" comes from, and how the GO111MODULE variable decides whether go.mod is used.
tags: [go, modules]
redirect_from: /blog/go111-mdoule/
published: true
---

Early releases of Golang do not have a feature for package versioning !

This means when a dependent package is downloaded then it always points to its latest version to download.

## Do we have any issue here ?
Yes, when we as a developer use a dependency expecting that it will not cause any harm in the future then it is totally a mistake, because packages are tend to upgrade.

## Why the name is having a 111?
The variable is named after the version of the go release 1.11 ,from here on the package versioning is available.

## What is its behaviour ?
GO111Module environment variable has 3 possible values:

- `auto`
- `on`
- `off`

The default value of this variable depends on version of Go, location of the project ( whether in GOPATH or not ) and whether the working directory contains a `go.mod` file.

In the latest versions of Go ,independent of the project location, if there is a go.mod file then `GO111Module is  on`, this implies that the required packages will be referred from the go.mod file.

## How to install a specific package ?

> **Note:** `packagelocation` is the link where the package is hosted.
{: .note}

For a specific version
```go
go install packagelocation@version
```

For a latest version
```go
go install packagelocation
```

```go
go install packagelocation@latest
```