---
title: "How To Stop Your NPM Installs From Failing"
cover: "/images/npm-fail.jpg"
date: "2020-02-27"
author: sharif
category: "web development"
tags:
  - npm
  - debugging
---

<span id='top'></span>

> TL;DR: <br /><br />
> Make sure your environment is set up with the proper build tools;<br /><br />
> Understand package.json, lock files, and the various types of dependencies;<br /><br />
> Know what to look for in the error log;<br /><br />
> Look up issues about the specific package/theme/library that is failing;<br /><br />
> Try manually installing the failing package without specifying a version;<br /><br /> > `npm update` and `npm update -D` are your friends;<br /><br />
> Nuke your `node_modules` folder and try again

<!-- end -->

## What's This Post About?

If you're just getting started with web development, package managers can be a tough nut to crack. I know this because I've given up on projects after having spent days going around in circles, just trying to get a library to install.

When I started this blog, I reached for a Gatsby theme, and was reminded of my rudimentary knowledge of npm. I had plenty of blog posts lined up, but I found myself fixated on grasping npm. I was able to get _some_ themes installed, but not others. I put my other posts on hold and decided to immerse myself in npm so that I could gain a deeper knowledge of it, and in turn, share that knowledge with you.

I still don't know _nearly_ everything about npm and dependencies -- but I now have enough knowledge to get any package to install / build with minimal warnings and vulnerabilities. My hope is that this post and its supplementary post will allow you to say the same.

This post doesn't go into npm fundamentals; I wrote another post for that. What this post does include is **solutions for six different scenarios** that might cause you issues with npm installations and builds. These scenarios are not exhaustive, but they are the ones I found most useful in my research.

All of the scenarios deal with Gatsby themes, but the concepts all apply to npm in general.

Let's go get 'em.

## Build Tools

Before getting started, you'll want to make sure that you have the proper build tools installed for your operating system. The Gatsby documentation has some pretty good guides on getting you set up:

[Setting up your development environment](https://www.gatsbyjs.org/tutorial/part-zero/)

**Note:** If you're using WSL, skip the Windows instructions and use the Linux instructions instead.

# YOU NEED TO GO BACK THROUGH AND LOOK FOR ANY npx install-peerdeps AND MAKE SURE YOU ARE INSTALLING THE CORRECT TYPE OF DEPENDENCY (dev vs regular)

-`gatsby-react-boilerplate` : bootstrap should be devDependency

## When the Initial Install Fails

Alright! So this is probably the most common scenario, and arguably the most frustrating for beginners (it was for me):

You run the exact command you were given, but npm fails to complete the installation because of an issue with a particular package.

[The theme in question](https://www.gatsbyjs.org/starters/GatsbyCentral/gatsby-v2-starter-casper/)

`gatsby new gatsby-v2-starter-casper https://github.com/GatsbyCentral/gatsby-v2-starter-casper`

The theme fails to install (as expected), and we have a good amount of errors in our terminal. **Sometimes scrolling to the top of the error log is necessary**, but in our case, the issue is pointed out right near the bottom:

```js
npm ERR! Failed at the sharp@0.20.8 install script.
```

Before beginning to troubleshoot, we need to move into the directory where the theme was cloned into.

`cd gatsby-v2-starter-casper`

Sometimes we can manually install the "problem package" without specifying a version; the idea is to update the package to the latest semver-compliant version. In this case, that would look like:

`npm install sharp`

But if we run that command, we actually get the same error. So what's going on?

If we inspect our `package.json` file, and search the file for `sharp`, we notice that the "sharp" package is not listed explicitly in the file. However, we do have one result returned from the search, which is `gatsby-plugin-sharp`.

If we look to our `package-lock.json` file and search for "gatsby-plugin-sharp", we see that `sharp` is listed under `requires`:

```json
    "gatsby-plugin-sharp": {
      ...
      "requires": {
        ...
        "sharp": "^0.23.4",
        ...
      },
```

Since we now know that `sharp` is not a **direct** dependency of our project, we can start looking into `gatsby-plugin-sharp`:

https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/

If we scroll _allllll_ the way to to the bottom of the plugin's documentation, we see a **Troubleshooting** section:

> To fix this, you’ll need to update all Gatsby plugins in the current project that depend on the sharp package.

The documentation then provides us with a list of all of the gatsby plugins that depend on `sharp`. To find out which of those packages are included in our theme, we can use the `npm ls` command:

- `npm ls gatsby-plugin-sharp`
- `npm ls gatsby-plugin-manifest`
- `npm ls gatsby-remark-images-contentful`
- `npm ls gatsby-source-contentful`
- `npm ls gatsby-transformer-sharp`
- `npm ls gatsby-transformer-sqip`

After running these commands, the only ones that do not return `(empty)`
are `gatsby-plugin-sharp` and `gatsby-plugin-manifest`.

Per the Gatsby docs, we update them like so:

`npm install gatsby-plugin-sharp gatsby-plugin-manifest`

This install completes successfully, and now we can attempt to install the remaining packages:

`npm install`

The install completes successfully; we have some vulnerabilities and peer dependency warnings, but we cover how to deal with those in the following sections.

For now, the important thing is that we can run `gatsby develop` and get our theme up and running.

## When 'npm audit fix' Breaks Your Dependencies

Sometimes, the theme will install successfully, but with a lot of vulnerabilities. npm suggests running `npm audit fix` to resolve them.

[The theme in question](https://www.gatsbyjs.org/starters/PrototypeInteractive/gatsby-react-boilerplate/)

`gatsby new gatsby-react-boilerplate https://github.com/PrototypeInteractive/gatsby-react-boilerplate`

We get the following error:

```js
npm ERR! Failed at the node-sass@4.9.3 postinstall script.
```

So we change into the project directory:

`cd gatsby-react-boilerplate`

And attempt to install the package manually:

`npm install node-sass`

The install completes, and we see that we now have a newer version of `node-sass`.

Next, we install the remaining packages:

`npm install`

The install completes successfully, but with a large number of vulnerabilities:

```js
found 1261 vulnerabilities (694 low, 17 moderate, 548 high, 2 critical)
run `npm audit fix` to fix them, or `npm audit` for details
```

For the sake of demonstration, let's check if we can run the development server before fixing the vulnerabilities:

`gatsby develop`

The dev server spins up:

```
You can now view gatsby-react-boilerplate in the browser.
⠀
  http://localhost:8000/
```

Now to kill the dev server and resolve the vulnerabilities:

`ctrl + c`

`npm audit fix`

When we run `gatsby develop` now, we get a big fat error!

Before analyzing the error message, we should attempt to take care of our peer dependencies, to see if that resolves the issue. Let's go through the warnings one by one.

Before installing peer dependencies, I like to check to see if another version of that package is already installed:

`npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.`

- `npm ls ajv`: It looks like we already have `ajv` in our project; let's skip it for now

`npm WARN extract-text-webpack-plugin@1.0.1 requires a peer of webpack@^1.9.11 but none is installed. You must install peer dependencies yourself.`

- `npm ls webpack`: We see that `webpack@4` is already installed -- skipping.

`npm WARN gatsby-plugin-postcss-sass@1.0.22 requires a peer of gatsby@^1.0.0 but none is installed. You must install peer dependencies yourself.`

- We shouldn't need to have both version 1 _and_ version 2 of Gatsby.

_Skip-a-dee-doo-da_

`npm WARN sass-loader@4.1.1 requires a peer of webpack@^2 || ^2.2.0-rc.0 || ^2.1.0-beta || ^1.12.6 but none is installed. You must install peer dependencies yourself.`

- We already confirmed that webpack was installed. Yep, skip it!

`npm WARN bootstrap@4.4.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.`

- `npm ls jquery`: Hey, this one is empty! Let's install it. There are more dependency warnings in the console, but we'll revisit them after the installation. I've found that the most straightforward way to install peer dependencies with `npm` is to use `npx`:

- `npx install-peerdeps bootstrap@4.4.1`

```js
+ bootstrap@4.4.1
+ popper.js@1.16.1
+ jquery@3.0.0
added 2 packages from 3 contributors, updated 4 packages and audited 27496 packages in 53.519s

found 48 vulnerabilities (47 low, 1 moderate)
  run `npm audit fix` to fix them, or `npm audit` for details
SUCCESS bootstrap
  and its peerDeps were installed successfully.
```

We still have peer dependency warnings, but we also have the opportunity to run an audit. Let's do that:

`npm audit fix`

When the audit completes, we have a new peer dependency warning:

```js
npm WARN eslint-config-react-app@5.2.0 requires a peer of eslint@6.x but none is installed. You must install peer dependencies yourself.
```

`npm ls eslint`

```js
├── eslint@5.12.0
└─┬ UNMET PEER DEPENDENCY gatsby@2.19.48
  └── UNMET PEER DEPENDENCY eslint@6.8.0

npm ERR! peer dep missing: gatsby@^1.0.0, required by gatsby-plugin-postcss-sass@1.0.22
```

This one is a bit different, since we are missing the _newer_ version of `eslint`. Let's see what happens if we install this dependency:

`npx install-peerdeps eslint-config-react-app@5.2.0`

Another thing that's different in this case is that it is pointing us to an unmet peer for `gatsby@2.19.48`. Why is that? Let's see if we can get some more information:

If we look at our `package.json` file, we see:

```js
  "devDependencies": {
    ...
    "gatsby": "^2.19.48",
    ...
  },
```

For some reason, when we ran the audit fix the first time, it broke this dependency. To update all dependencies (including devDependencies), we can run:

`npm update -D`

Again, lots of warnings, with the opportunity to run an audit:

`npm audit fix`

Okay, so we still have some of the same peer warnings. The only one left that doesn't require an already-installed package is:

`npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.`

`npx install-peerdeps tsutils@3.17.1`

But when we run this, we get an error:

```js
npm ERR! notarget No matching version found for typescript@3.7.0.
```

It looks like the version of typescript specified is not correct. Not to worry, we can just install the latest applicable version:

`npm install typescript`

Alright, so we still have 3 of the original warnings, plus the `eslint` warning from when we installed the newer version earlier. One for `react`, one for `webpack`, and another for `ajv`. These all already had versions installed when we checked with `npm ls`. Installing multiple versions of `react` and/or `webpack` has given me trouble in the past, so we'll go for `ajv`:

`npx install-peerdeps ajv-keywords@3.4.1`

Okay, so that cleared the one warning, but didn't really change much else. We can try and install the other peer dependencies, but a lot of times it ends up with me needing to delete the directory and restart.

Let's think about what our other options are. We started off with a `package.json` file that was somewhat outdated, and installed the necessary packages to clear the majority of the dependency issues. In doing so, both our `package.json` and `package-lock.json` files were updated accordingly.

However, we still have unmet peers, and we can't run the dev server.

Because we had a decent amount of vulnerabilities on the initial install, and then ran the fix command, these fixes were "on top of" our existing `node_modules` folder, which already had packages present within it.

In other words, our `package.json` and `package-lock.json` files are probably now correct, but the actual structure of the packages installed in our project's directory could be incorrect.

To try and resolve this issue, we can remove the `node_modules` folder and try the install again:

1. `rm -rf node_modules`
2. `npm install`

Success!

We installed all of the dependencies without getting any warnings about missing packages.

The moment of truth: `gatsby develop`

```js
 ERROR #98123  WEBPACK

Generating development JavaScript bundle failed

Cannot find module 'webpack/package.json'
Require stack:
- /home/idev/.nvm/versions/node/v13.8.0/lib/node_modules/gatsby-cli/lib/index.js

File: src/components/icon/github.icon
```

Ouch..

Alright, at this point, we need to do something that probably should have been done at the beginning, but I wanted leave it until now so that its importance could be demonstrated.

What we need to do is check the `README` on the [repo](https://github.com/PrototypeInteractive/gatsby-react-boilerplate)!

Here, we see that we are instructed to run `npm run dev`, and not `gatsby develop`. If we look at the `package.json` file, we get some more insight:

```json
"scripts": {
    ...
    "dev": "(shx --silent rm -rf public || shx true) && gatsby develop",
    ...
  }
```

`npm run dev`

```js
npm ERR! Failed at the gatsby-react-boilerplate@1.0.0 dev script.
```

Okay, this is getting a little hairy. I'm not sure what the exact intent of the `dev` script is, but _do_ I know that deleting both the `public` and `.cache` folders is often a recommended troubleshooting step. The `dev` script is only removing the `public` folder. Perhaps something has changed since this script was written.

Let's see if we can alter the script to remove the `.cache` folder as well:

```json
"scripts": {
    ...
    "dev": "(shx --silent rm -rf public .cache || shx true) && gatsby develop",
    ...
  }
```

`npm run dev`

```
You can now view gatsby-react-boilerplate in the browser.
⠀
  http://localhost:8000/
```

Now we are able to run the dev server!

## Dealing with Overly-Restrictive package.json Files

It's not recommended to manually edit dependencies your `package.json` file, since the current version of `npm` automatically updates the file when you perform updates and installs. Sometimes, though, your options are limited by the semver syntax in the file.

[The theme in question](https://www.gatsbyjs.org/starters/DSchau/gatsby-blog-starter-kit/)

`gatsby new gatsby-blog-starter-kit https://github.com/dschau/gatsby-blog-starter-kit`

We get a familiar error message:

```js
npm ERR! Failed at the sharp@0.21.3 install script.
```

We follow the `npm ls` steps from the previous section and determine that we need to run:

`npm install gatsby-plugin-manifest gatsby-plugin-sharp`

```js
npm ERR! Failed at the sharp@0.21.3 install script.
```

This worked before; why isn't it working now?

A pattern emerges: We check our source of truth -- `package.json`

Alright, so what are we looking for here? Well, first we can look for the packages that we were trying to install:

Our `package.json` shows:

```json
"dependencies": {
    ...
    "gatsby-plugin-manifest": "~2.0.2-beta.3",
    "gatsby-plugin-sharp": "2.0.0-beta.5",
    ...
  },
```

If we look these packages up in the [npm registry](https://www.npmjs.com/), we can see that both of these packages have already released version 2, and are no longer in beta.

Now it's clear that the versions are being locked down too restrictively in `package.json`.

We can alter the semver to look like this:

```json
"dependencies": {
    ...
    "gatsby": "^2.0.0",
    "gatsby-plugin-manifest": "^2.0.2",
    "gatsby-plugin-sharp": "^2.0.0",
    ...
  },
```

Note that we also altered the semver for `gatsby`. This is because the two packages we are trying to install are plugins that "plug in" to `gatsby`. So if we are updating the plugin version, it is likely that we need to update the "host" version as well (i.e. `gatsby`).

Now we try our install again:

`npm install gatsby-plugin-manifest gatsby-plugin-sharp`

This time the installation completes, and we can move onto installing the rest of the packages that failed during the initial install:

`npm install`

The install works this time, but we have some peer warnings to fix.

```js
npm WARN gatsby@2.0.120 requires a peer of react@^16.4.2 but none is installed. You must install peer dependencies yourself.

npm WARN gatsby@2.0.120 requires a peer of react-dom@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

Our `package.json`:

```json
"dependencies": {
    ...
    "react": "~16.3.0",
    "react-dom": "~16.3.0",
    ...
  },
```

We change it to:

```json
"dependencies": {
    ...
    "react": "^16.3.0",
    "react-dom": "^16.3.0",
    ...
  },
```

Now we can run `npm install` again to update. Except nothing actually updates. The script runs, and we get the same peer warnings again.

If we run `npm ls react`, we see that `react` was not actually updated according to our semver revision. So we can remove the `node_modules` folder and try again:

1. `rm -rf node_modules`
2. `npm install`
3. `npm audit fix`

The install goes through, but we still have some warnings:

```js
npm WARN gatsby@2.19.49 requires a peer of react@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

`npm ls react`

```js
├─┬ gatsby@2.19.49
│ └─┬ gatsby-cli@2.10.13
│   └── UNMET PEER DEPENDENCY react@16.13.1
└── UNMET PEER DEPENDENCY react@16.3.2

npm ERR! peer dep missing: react@^16.4.2, required by gatsby@2.19.49
npm ERR! peer dep missing: react@>=16.8.0, required by ink@2.7.1
npm ERR! peer dep missing: react@^16.8.2, required by ink-spinner@3.0.1
```

For some reason, `react` did not get installed when we ran `npm install` after deleting `node_modules`. So, we can attempt to install it now as a peer dependency. We want to get the latest version that also satisfies all of the packages that depend on it. If we install peers for `gatsby`, then we get `16.4.2`, which doesn't satisfy the other two packages that depend on `react`. Since `gatsby` will accept a version of `react` all the way up to `16.9.9`, we can do it this way:

`npx install-peerdeps ink-spinner@3.0.1`

Alright! All of our warnings for `react` missing are gone, and we are left with warnings for `react-dom`:

```js
npm WARN gatsby@2.19.49 requires a peer of react-dom@^16.4.2 but none is installed. You must install peer dependencies yourself.

npm WARN gatsby-link@2.2.31 requires a peer of react-dom@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

I am hesitant to install the dependencies for `gatsby`, since it is such a large library, and the potential for duplicates seems likely. Since both `gatsby` and `gatsby-link` are expecting the same version of `react-dom` as a peer, we'll go for `gatsby-link` instead:

`npx install-peerdeps gatsby-link@2.2.31`

Sweet! The only peer warning left is for `typescript`:

```js
npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
```

For whatever reason, this peer is defined incorrectly, and we get an error when we try to install it with `npx`. So we can install it directly instead:

`npm install typescript`

Now we have no more peer warnings, and all that's left are warnings for optional dependencies.

We are finally ready to run `gatsby develop` again:

```
You can now view gatsby-blog-starter-kit in the browser.
⠀
  http://localhost:8000/
```

## Using 'npm dedupe'

Sometimes, even when you install peers selectively, you still end up with with duplicates of a package. We cover how to resolve that in this section.

[The theme in question](https://www.gatsbyjs.org/starters/konsumer/gatsby-starter-bootstrap-netlify/)

`gatsby new gatsby-starter-bootstrap-netlify https://github.com/konsumer/gatsby-starter-bootstrap-netlify`

```js
npm ERR! Failed at the node-sass@4.10.0 postinstall script.
```

`cd gatsby-starter-bootstrap-netlify`

`npm install node-sass`

`npm audit fix`

```js
npm WARN bootstrap@4.4.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
```

`npm ls jquery`

```
└── (empty)
```

`npx install-peerdeps bootstrap@4.4.1`

```js
npm WARN ink-spinner@3.0.1 requires a peer of react@^16.8.2 but none is installed. You must install peer dependencies yourself.
```

`npm ls react`

```js
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── UNMET PEER DEPENDENCY react@16.13.1
└── react@16.6.3

npm ERR! peer dep missing: react@>=16.8.0, required by ink@2.7.1
npm ERR! peer dep missing: react@^16.8.2, required by ink-spinner@3.0.1
```

We are shown that `gatsby`'s dependencies are met as far as `react` is concerned, but other packages are missing their required version.

Let's open `package.json` to see what's going on:

```json
"dependencies": {
    ...
    "react": "^16.5.2",
    ...
  },
```

We should be covered, but we don't have the most up-to-date version.

`npm update`

```js
npm WARN gatsby-link@2.3.0 requires a peer of @reach/router@^1.1.1 but none is installed. You must install peer dependencies yourself
```

`npm ls @reach/router`

```js
└─┬ gatsby@2.20.2
  └── UNMET PEER DEPENDENCY @reach/router@1.3.3

npm ERR! peer dep missing: @reach/router@^1.0, required by gatsby-react-router-scroll@2.2.0
```

At this point, it can be a little confusing as to which package we should install the peers for. We originally checked due to the warning we got for `gatsby-link`, but the `npm ls` command tells us that it's also missing for `gatsby-react-router-scroll`. The package we choose to install can lead to different results.

Let's see what happens if we install the peer listed at the end of our `npm ls` output:

`npx install-peerdeps gatsby-react-router-scroll@2.2.0`

```js
npm WARN gatsby-link@2.3.0 requires a peer of react@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

`npm update`

Now we only have this warning left:

```js
npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
```

`npm install typescript`

We have cleared all of our missing package warnings, and are ready to run `gatsby develop`:

```js
  Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  1. You might have mismatching versions of React and the renderer (such as React DOM)
  2. You might be breaking the Rules of Hooks
  3. You might have more than one copy of React in the same app
  See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

If we visit the link provided in the error, it suggests we run the following to check for multiple copies of `react`:

`npm ls react`

```json
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── react@16.13.1
└── react@16.13.1
```

Okay, so this is a problem for a couple of reasons:

1. React should only have one copy in your application. Too many things depend on it for multiple copies to work together.
2. We have two copies, and they are both the same version.

`npm` provides a command to resolve this issue:

`npm dedupe`

Once we run it, we can run `npm ls react` again to see if it worked:

```json
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── react@16.13.1  deduped
└── react@16.13.1
```

We can see that `npm` removed the extra copy for us -- "deduping" it, so to speak.

So now we should be ready to run `gatsby develop` again:

```
You can now view gatsby-starter-bootstrap-netlify in the browser.
⠀
  http://localhost:8000/
```

**Note:** If `gatsby develop` gave you an error after the `dedupe`:

1. Run `gatsby clean`
1. Run `gatsby develop` again

## Using a Previous Version of Node

The troubleshooting tips and strategies covered above don't always solve the issue. One such example can be seen if a dependency was developed using a previous version of `node`, and has not been updated to account for any "breaking changes" introduced in the current `node` version.

[The theme in question](https://www.gatsbyjs.org/starters/the-road-to-react-with-firebase/react-gatsby-firebase-authentication/)

`gatsby new firebase-authentication https://github.com/the-road-to-react-with-firebase/react-gatsby-firebase-authentication`

```js
npm ERR! Failed at the grpc@1.23.3 install script.
```

My first thought is to install `grpc` explicitly, since that seems to work most of the time.

`cd firebase-authentication`

`npm install grpc`

`npm install`

We get this same error. Why didn't this work?

If we scroll up and look at our warnings in detail, we see this:

```js
node-pre-gyp WARN Pre-built binaries not found for grpc@1.23.3 and node@13.8.0 (node-v79 ABI, glibc) (falling back to source compile with node-gyp)
```

From installing a fair amount of themes in preparation for this blog post, I know that the latest version of `node` does not always work, depending on what dependencies are specified in the package and lock files. At the time of this writing, `node 10` seems to work most of the time when we run into this scenario.

To use another version of node, we need to use `nvm`, which we can install with the following commands:

1. `sudo apt-get install curl`
2. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`

Once nvm is installed, you can switch to another version of node. Note that only the current terminal session will use that version of node. In other words, if you open a new terminal window and type `node -v`, you should see your default version of node.

To use node 10:

1. `nvm install 10`
2. `nvm use 10`

This version of node will not be aware of your Gatsby installation, so you will need to run `npm install -g gatsby-cli`.

Now that we are all set up, we need to run the install again, since it initially failed. Since we had to downgrade `node` for the install, it seems likely that there are other outdated definitions in the them. Therefore, we run:

1. `npm update`
2. `npm install`

The install goes through this time. If we run `gatsby develop`, the dev server spins up!

## Navigating Troublesome Peer Dependencies

[The theme in question](https://www.gatsbyjs.org/starters/Vagr9K/gatsby-advanced-starter/)

`gatsby new gatsby-advanced-starter https://github.com/Vagr9K/gatsby-advanced-starter`

Installation goes fine, with a good amount of vulnerabilities.

`cd gatsby-advanced-starter`

`npm audit fix`

```js
npm WARN netlify-cms-widget-code@1.1.3 requires a peer of codemirror@^5.46.0 but none is installed. You must install peer dependencies yourself.
```

`npm ls codemirror`

```
└── (empty)
```

`npx install-peerdeps netlify-cms-widget-code@1.1.3`

`npm audit fix`

```js
npm WARN react-redux@4.4.10 requires a peer of redux@^2.0.0 || ^3.0.0 but none is installed. You must install peer dependencies yourself.
```

`npm ls redux`

```json
├─┬ gatsby@2.19.12
│ ├─┬ gatsby-cli@2.8.29
│ │ └── redux@4.0.5  deduped
│ └── redux@4.0.5
└─┬ netlify-cms-app@2.11.13
  └─┬ netlify-cms-core@2.16.0
    ├─┬ react-dnd@7.7.0
    │ └─┬ dnd-core@7.7.0
    │   └── redux@4.0.5  deduped
    └── redux@4.0.5  deduped
```

Instead of installing another version of `redux`, we can try an `npm update` since we have installed more dependencies since running our last install.

`npm update`

`npm audit fix`

We are still left with the peer warnings for `typescript` and `redux`. We might as well install `typescript`:

`npm install typescript`

`npm audit fix`

We still have the `redux` peer warning. At this point, we can employ the same strategy we have used in other scenarios:

1. `rm -rf node_modules`
2. `npm update`
3. `npm install`
4. `npm audit fix`

Unfortunately, we still have the `redux` warning. We can try and install this peer with `npx`, but it will break. I tried.

But hold on a second! In the previous examples, whenever we had a missing peer warning, and we ran a `npm ls` command, we would get notified of that missing peer. `npm ls redux` doesn't give us that message.

Why not?

If we look in `node_modules/react-redux/package.json`, we see that the dependencies are actually listed as...

```json
"peerDependencies": {
    "react": "^0.14.0 || ^15.0.0-0 || ^16.0.0-0",
    "redux": "^2.0.0 || ^3.0.0 || ^4.0.0-0"
  },
```

# JUST NOTICED IT SAYS 4.0.0-0 INSTEAD OF 4.0.0. TRY EDITING AND SEE IF THE ERROR DISAPPEARS. Edited to 4.0.0 and ran npm install. Still shows redux message. Ran npm cache clean --force. npm install. npm update. npm update -D. no difference

But in the terminal, we were told that we needed `redux@^2.0.0 || ^3.0.0`. This clearly isn't the case, and that's why we aren't getting the error message when we run `npm ls redux`.

Since we are not getting the error with `npm ls`, and the `node_modules/react-redux/package.json` shows that version 4 of `redux` is acceptable, we can actually ignore this message.

Run `gatsby develop` and enjoy the fruits of your labor.

## Yarn Resolutions

Remember in the first section when we didn't deal with peer dependencies, and just left it as-is after the initial installation was fixed? This section is the reason why.

Sometimes, the peer dependencies don't work correctly with `npm`, as we saw in the last section. But in that section, we ended up with a warning that we were able to ignore.

But what happens when you get a warning that you can't ignore? Do you just run your application without having that peer installed? I suppose you could, if you want to have issues.

In this section, we explore `yarn` and how we can use it to resolve peer dependency issues with the use of its `resolutions` feature.

To see the list of peer warnings, we can change into the theme directory from the first project"

`cd gatsby-v2-starter-casper`
`npm audit fix`

Starting from the first peer warning:

```js
npm WARN react-disqus-comments@1.2.0 requires a peer of react@^15.0.1 but none is installed. You must install peer dependencies yourself.
```

`npm ls react`

```json
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── UNMET PEER DEPENDENCY react@16.13.1
└── UNMET PEER DEPENDENCY react@16.5.2

npm ERR! peer dep missing: react@^15.0.1, required by react-disqus-comments@1.2.0
npm ERR! peer dep missing: react@>=16.8.0, required by ink@2.7.1
npm ERR! peer dep missing: react@^16.8.2, required by ink-spinner@3.0.1
```

it seems we are missing `react` altogether.

`npm update`

`npm audit fix`

```js
npm WARN eslint-config-react-app@5.2.1 requires a peer of eslint@6.x but none is installed. You must install peer dependencies yourself
```

`npm ls eslint`

```js
├── eslint@5.16.0
└─┬ gatsby@2.20.2
  └── UNMET PEER DEPENDENCY eslint@6.8.0

npm ERR! peer dep missing: eslint@6.x, required by eslint-config-react-app@5.2.1
```

`npx install-peerdeps eslint-config-react-app@5.2.1`

```It seems as if you are using Yarn. Would you like to use Yarn for the installation? (y/n)

```

This message appears because there is a `yarn.lock` file included in the theme. We have been using `npm` up until this point, so let's try to continue that way.

Selected `n`

`rm yarn.lock`

`npx install-peerdeps eslint-config-react-app@5.2.1`

`npm audit fix`

```js
npm WARN acorn-jsx@5.2.0 requires a peer of acorn@^6.0.0 || ^7.0.0 but none is installed. You must install peer dependencies yourself.
```

`npm ls acorn`

```js
├─┬ UNMET PEER DEPENDENCY eslint@6.8.0
│ └─┬ espree@6.2.1
│   └── UNMET PEER DEPENDENCY acorn@7.1.1
└─┬ gatsby@2.20.2
  └─┬ webpack@4.42.0
    └── acorn@6.4.1

npm ERR! peer dep missing: eslint@^4.19.1 || ^5.3.0, required by eslint-config-airbnb@17.1.1
```

`npm update`

`npm audit fix`

Nothing changed. At this point, it's clear why the theme's author chose `yarn`. The dependencies seem to be confusing `npm`. It's saying that we are missing a version of `eslint` that looks to already be installed. Let's also try and use `yarn`:

`npm install -g yarn`

`rm -rf node_modules`

`yarn install`

```js
├─┬ UNMET PEER DEPENDENCY eslint@6.8.0
│ └─┬ espree@6.2.1
│   └── UNMET PEER DEPENDENCY acorn@7.1.1
└─┬ gatsby@2.20.2
  └─┬ webpack@4.42.0
    └── acorn@6.4.1

npm ERR! peer dep missing: eslint@^4.19.1 || ^5.3.0, required by eslint-config-airbnb@17.1.1
```

`yarn install --network-timeout 1000000`

`yarn upgrade -latest`

```js
warning "gatsby > react-hot-loader@4.12.20" has unmet peer dependency "@types/react@^15.0.0 || ^16.0.0".
```

`yarn list @types/react`

```
└─ @types/react@16.9.25
```

It looks like we should meet the criteria, as our `package-lock.json` and `yarn.lock` file both list `*` as the acceptable versions.

Wait, aren't we not supposed to have both lock files? Let's see if removing one makes a difference..

`rm package-lock.json`

`yarn install`

Does nothing.

What about...

`rm -rf node_modules`

`yarn install`

```js
warning "@typescript-eslint/eslint-plugin > tsutils@3.17.1" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".warning "gatsby > react-hot-loader@4.12.20" has unmet peer dependency "@types/react@^15.0.0 || ^16.0.0".
warning "gatsby-plugin-lodash > lodash-webpack-plugin@0.11.5" has unmet peer dependency "webpack@^2.0.0 || ^3.0.0 || ^4.0.0".
warning " > eslint-config-airbnb@17.1.1" has incorrect peer dependency "eslint@^4.19.1 || ^5.3.0".
warning "eslint-config-airbnb > eslint-config-airbnb-base@13.2.0" has incorrect peer dependency "eslint@^4.19.1 || ^5.3.0".
```

## Still Having Issues?

If the steps in the examples above didn't solve your issue, you may want to try the following:

- Close text editor(s)
- **Completely** close terminal application (don't just open a new tab)
  - Start a fresh terminal session
- `sudo apt upgrade`
- `sudo apt update`
- `sudo apt-get upgrade`
- `sudo apt-get update`
- Check for and install any updates to your OS
- Restart computer (yeah, yeah)
