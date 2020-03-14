---
title: "What You Need to Know About NPM Dependencies"
cover: "/images/npm-dependencies.jpg"
date: "2020-03-08"
author: sharif
category: "web development"
tags:
  - npm
---

Semantic Versioning is the syntax for the version numbers you see in `package.json` and `package-lock.json`. There are three numbers, separated by decimals. For example: `1.8.4`

- `1` is the major version
- `8` is the minor version
- `4` is the patch version

You can also use prefixes on the versions: `^` or `~`

- `^` allows the minor and patch versions to be updated, keeping the major version the same
- `~` allows the patch version to be updated, keeping the major and minor versions the same
- Omitting a prefix will use the exact version only (no updates)

It is generally safe to update minor and patch versions without breaking dependencies, but not major versions.

You may run across responses online that suggest deleting the `package-lock.json` file to get around issues like the one we are working on here, but there are some issues with that approach. For example, there could be exact versions required for a reason. Maybe updating those packages won't cause the install to fail, but introduces a security vulnerability instead.

devDependencies: These are dependencies that are only needed during the actual development of a package. As such, devDependencies aren't needed to actually _use_ the package. Another way to think about this is: devDependencies are not needed at runtime. Things like testing libraries and linters are common use cases for devDependencies.

When you run `npm install`, both "regular" dependencies and devDependencies are installed, because this default command assumes that you will be doing some development. However, if you run `npm install --production`, the devDependencies listed in your `package.json` file will not be installed.

It's also important to note that the devDependencies of your dependencies won't be installed when you run `npm install`. This threw me off at first, but when you think about it, it makes sense: Say `babel` is one of our dependencies; we aren't coding a new feature into `babel`, or improving the `babel` package, we are simply _using the existing functionality_ of `babel` to run our application.

If it's still not making sense, think about it this way: devDependencies listed in **your project's** `package.json` are installed so that you can work on your project. devDependencies listed in a `package.json` file inside a **package's sub-directory** in your project's `node_modules` folder are not installed because that package is already ready to use. Since the package is ready to use, it doesn't require any additional development as far as your project is concerned, and therefore the devDependencies specific to that package are not installed.

## peerDependencies

This type of dependency is a bit less common to see, but just as important to understand. These will appear in your `package.json` as `peerDependencies`.

The thing that sets peerDependencies apart from package-level dependencies and devDependencies is the fact that peerDependencies are not installed automatically. Why not?

This is typically seen with plugins that a different version of a package that is already defined at the top-level, but a different version of it. To avoid installing two versions of the same package, the peerDependencies are not installed.

Quite honestly, I don't understand peerDependencies much beyond this point. What I do know is that `yarn` seems to handle them better than npm. Throughout this post, I have tried to provide a base-level understanding of the underlying technologies -- but the point is primarily to get you past your installation issues without just saying "run these commands".
