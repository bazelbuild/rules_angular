# Angular rules for Bazel

**WARNING: this is an early release with limited features. Breaking changes are likely. Not recommended for general use.**

The Angular rules integrate the Angular compiler (`ngc`) with Bazel.

## Installation

First, install a current Bazel distribution, following the
[installation instructions].

Second, follow the steps to setup a TypeScript project, see
https://github.com/bazelbuild/rules_typescript/blob/master/README.md

Finally, in your `WORKSPACE` file, add

```python
git_repository(
    name = "build_bazel_rules_angular",
    remote = "https://github.com/bazelbuild/rules_angular.git",
    tag = "0.0.1", # check for the latest tag when you install
)
```

Make sure your `package.json` depends on `@angular/compiler-cli`, and that your
Angular version is at minimum 4.3.0.

We recommend using Yarn with Bazel to install packages into `node_modules`:

```sh
$ bazel run @yarn//:yarn
```

[installation instructions]: https://bazel.build/versions/master/docs/install.html

## Usage

We provide a rule called `ng_module` which invokes the Angular compiler on one
unit of code at a time. We recommend using one `ng_module` rule per directory,
though it's possible for one `ng_module` to compile code in subdirectories, as
well as to have more than one `ng_module` in the same directory.

A minimal usage looks like

```python
load("@build_bazel_rules_angular//:defs.bzl", "ng_module")

ng_module(
  name = "src",
  srcs = glob(["*.ts"]),
  tsconfig = "//:tsconfig.json",
)
```
