---
title: "How To Stop Your npm Installs From Failing"
cover: "https://unsplash.it/1152/300/?random"
date: "2020-02-27"
author: sharif
category: "web development"
tags:
  - npm
  - debugging
---

<span id='top'></span>

> TL;DR: <br /><br />
> Determine if the issue is the node version, the package version, or a peer dependency issue;<br /><br />
> If node version: install/use an older version of node with nvm;<br /><br />
> If package version: update dependencies in project directory (including devDependencies)<br /><br />
> If peer dependency: Try yarn

<!-- end -->

## Preface

If you're on this page, there's a good chance that you are currently struggling with an npm install, and just want to get to the resolution. Trust me, I get it. But if you feel shaky at all with npm, I recommend you read the post in its entirety. I know it's on the longer side, but I think it will give you a better understanding of how npm works as a whole.

I'm not claiming to be an npm expert, but I _can_ say that I've haven't had any issues with npm installations since making the discoveries I am about to share.

## Contents

[TL;DR](#top)<br />
[Managing and Prioritizing Errors](#managing-errors)<br />
[Understanding Version Locking](#version-locking)<br />
[Resolving Dependencies](#resolving-dependencies)<br />
[Semantic Versioning](#semantic-versioning)<br />
[npm update](#update-commands)<br />
[Managing Node Versions with nvm](#managing-nvm)<br />
[Peer Dependencies](#peer-dependencies)
[Still Having Issues?](#issues)

## The Problem

I was reminded of my rudimentary comprehension of npm when I was trying out [starter themes](https://www.gatsbyjs.org/starters/?v=2) for the blog. As you might guess, the themes are installed with npm.

A lot of the third-party themes seemed to offer what I was looking for, but I couldn't seem to get them installed. My initial thought was that I would look into the npm issues later, and decided to either:

1. Use one of the [official themes](https://www.gatsbyjs.org/docs/starters/#official-starters), since I was able to install those
2. Keep trying different themes until I found one that "just worked".

But I as I was going through the other themes, I kept looking back to the ones that I wasn't able to install. I didn't want to settle; I wanted to install the themes that I was initially drawn to.

I guess I'm learning npm now.

I started doing some research and found that my installs and/or builds were failing for one or both of these reasons:
<span id='reasons'></span>

1. A package fails to install/run correctly due to an outdated dependency
2. A package fails to install/run correctly because it requires an older version of node
3. A [peerDependency](#peer-dependencies) issue

If you've ever run into issues installing packages with npm, you've probably run across similar explanations in your Google searches. But how do you resolve the issues and actually get the packages to install?

It is my hope that this post will answer that question for you.

The examples here are in the context of installing Gatsby themes, but you can apply these same concepts to any npm installation.

<h2 id='managing-errors'>Managing and Prioritizing Errors</h2>

[TL;DR](#top)<br />
[Understanding Version Locking](#version-locking)<br />
[Resolving Dependencies](#resolving-dependencies)<br />
[Semantic Versioning](#semantic-versioning)<br />
[npm update](#update-commands)<br />
[Managing Node Versions with nvm](#managing-nvm)<br />
[Peer Dependencies](#peer-dependencies)<br />
[Still Having Issues?](#issues)

Sticking with the Gatsby theme (ahem), we will reproduce both scenarios listed above. It's unlikely that your development environment is identical to mine, so you may not get the same results, but the general concepts still apply.

Okay, time for some errors!

The first starter [theme](https://www.gatsbyjs.org/starters/baobabKoodaa/blog/) gives us an install command of:

`gatsby new blog https://github.com/baobabKoodaa/blog`

Alright, so there are lots of errors in the terminal. What I like to do at this point is paste all of the errors (not the warnings) into a text file. This way, I can write notes on the errors. An added benefit of making notes on the errors is that it prevents me from forgetting which errors I've already looked into.

My text file looks like this:

```js
gyp ERR! build error gyp ERR! stack Error:`make` failed with exit code: 2
gyp ERR! stack at ChildProcess.onExit (/home/idev/.nvm/versions/node/v13.8.0/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:194:23)
gyp ERR! stack at ChildProcess.emit (events.js:321:20)
gyp ERR! stack at Process.ChildProcess.\_handle.onexit (internal/child_process.js:275:12)
gyp ERR! System Linux 4.4.0-19041-Microsoft
gyp ERR! command "/home/idev/.nvm/versions/node/v13.8.0/bin/node" "/home/idev/.nvm/versions/node/v13.8.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /mnt/c/Users/j3ste/npmtest/blog/node_modules/sharp-cli/node_modules/sharp
gyp ERR! node -v v13.8.0
gyp ERR! node-gyp -v v5.0.7
gyp ERR! not ok

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! sharp@0.22.1 install: `(node install/libvips && node install/dll-copy && prebuild-install) || (node-gyp rebuild && node install/dll-copy)`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the sharp@0.22.1 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR! /home/idev/.npm/\_logs/2020-02-28T04_45_42_618Z-debug.log

ERROR

Command failed with exit code 1: npm install

Error: Command failed with exit code 1: npm install
```

This can be a lot to digest, and it's hard to know where to start. I typically follow these steps:

1. Start at the bottom (last entry) of the error log
2. Skip through the more generic messages
3. Google the first specific error message
4. If unsuccessful, go to the top of the error log
5. Repeat steps 2 and 3

<p id='error'>Looking through my error log from the bottom, the first specific error I see is:

`npm ERR! Failed at the sharp@0.22.1 install script.`

</p>

After putting the error into Google, I ended up on [this GitHub issues page](https://github.com/lovell/sharp/issues/1909). I see a comment from `sharp`'s maintainer, saying that <span id='version'>`v0.23.2`</span> supports node 13. That's great and all, but how do we actually use that version?

I could try and install that version of `sharp` explicitly, but then you need to know whether or not to install it as a normal dependency, or a devDependency.

In my experience, it is much easier to work with the `package-lock.json` file.

<h2 id='version-locking'>Understanding Version Locking</h2>

[TL;DR](#top)<br />
[Managing and Prioritizing Errors](#managing-errors)<br />
[Resolving Dependencies](#resolving-dependencies)<br />
[Semantic Versioning](#semantic-versioning)<br />
[npm update](#update-commands)<br />
[Managing Node Versions with nvm](#managing-nvm)<br />
[Peer Dependencies](#peer-dependencies)<br />
[Still Having Issues?](#issues)

Let's take a second to step back and understand what is really going on here. There is a newer version of the package available, but when we install directly from the repo link, it attempts to install an older version. If we were to install sharp with the default `npm install` command (without specifying a version), it would install the latest version. So why are we being "forced" to install an older version?

_Note: I use 'package' and 'library' interchangeably_

This is where `package-lock.json` comes into play. This file exists for portability and dependency purposes. To put this in context, let's imagine we are starting our own open source project from scratch. It's a simple project, and only requires two packages to be installed:

1. `some-made-up-library` (v0.9)
2. `another-fake-library` (v2.0)

Our project works perfectly with this configuration, until `some-made-up-library` updates to v1.0, which causes `another-fake-library` to stop working. We can solve this problem in our own environment by simply downgrading `some-made-up-library` back to v0.9. This is fine for our individual setup, but what about the other developers that want to utilize our project? We could specify the version requirements in the `README` file, but what if our project had 50 libraries with similar version dependencies? Are we going to list those all out in the `README`? That's no way to live your life!

This is what is known as a _dependency_, since the functionality of one package **depends on** the version of one or more _other_ packages. This is the reason the `package-lock.json` file exists.

`package-lock.json` specifies the versions to use for each package. This means that when someone clones the repo and runs `npm install`, the versions specified in `package-lock.json` will be installed locally to their system.

At this point, you might be wondering why our installation failed, since there is a package lock file included in the repo. The dependencies listed in the repo's `package.json` and `package-lock.json` function perfectly in a vacuum, but `node` is required to install those dependencies.

Let's think back to the comment from `sharp`'s maintainer: They stated that the new version of `sharp` has been adjusted so that it works with node 13. This implies that `sharp` was originally developed on an older version of node. And since we are competent developers who keep our tools up-to-date, we are using the latest version of node.

So we can conclude that the reason our installation failed is because the creator of the Gatsby theme did not update the repo to account for this new version of node.

We _could_ install the theme using an older version of `node`, but I like the idea of using a newer version of `sharp` a little better; we do this in the next section.

<h2 id='resolving-dependencies'>Resolving Dependencies</h2>

[TL;DR](#top)<br />
[Managing and Prioritizing Errors](#managing-errors)<br />
[Understanding Version Locking](#version-locking)<br />
[Semantic Versioning](#semantic-versioning)<br />
[npm update](#update-commands)<br />
[Managing Node Versions with nvm](#managing-nvm)<br />
[Peer Dependencies](#peer-dependencies)<br />
[Still Having Issues?](#issues)

Now that we have a better understanding of version locking and the purpose of the package lock file, we are better prepared to troubleshoot our [error](#error).

Going off of what we know about version locking, the solution that comes to mind is to alter the `package-lock.json` file to reflect the newer [version](#version) of sharp. But how do we actually do that?

1. `cd` into the project directory (`cd blog`, in this case)
2. Open the project directory in a text editor
3. Open both `package.json`and `package-lock.json` in the text editor
4. `ctrl + f` and search for the name of the package (`sharp` in our case) in both files

The instances of `sharp` in both files looks like this:

(`...` denotes text that I have omitted to save space.)

###### In package.json

```js
"gatsby-plugin-sharp": "^2.2.21",
"gatsby-transformer-sharp": "^2.2.14",
"sharp-cli": "^1.10.0",
```

###### In package-lock.json

```js
"gatsby-plugin-sharp": {
  "version": "2.2.21",
  ...
  "sharp": "^0.23.0",
}

"sharp": {
  "version": "0.23.0",
  ...
}

"gatsby-transformer-sharp": {
  "version": "2.2.14",
  ...
  "sharp": "^0.23.0"
}

"sharp-cli": {
  "version": "1.10.0",
  ...
  "dev": true,
      "requires": {
        ...
        "sharp": "0.22.1",
      }
}

"sharp": {
  "version": "0.22.1",
  ...
  "dev": true,
}

```

The idea of going through and manually updating the version multiple times doesn't really seem like a great approach, especially if there are multiple libraries with dependency issues. Plus, to me it is not clear where exactly the changes need to be made in the files.

Luckily, we don't have to do that! We can actually run some commands that will modify the `package-lock.json` file for us!

Before we get into the commands, it's a good idea to understand some of the file's syntax:

<h4 id='semantic-versioning'>Semantic Versioning</h4>

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

With that out of the way, we're ready to run our commands!

<h4 id='update-commands'>
  <a 
    href='https://docs.npmjs.com/cli-commands/update.html'
    target="_blank"
    rel="noopener noreferrer"
  >npm update</a></h4>

[Managing Node Versions with nvm](#managing-nvm)<br />

- `npm update`: Looks for packages with `^` or `~` and updates them to to latest minor or patch version, respectively

- `npm update -D`: Does the same thing as `npm update`, but also includes devDependencies in the update

So let's see what happens when we run `npm update`.

We get the following error:

```js
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! sharp@0.22.1 install: `(node install/libvips && node install/dll-copy && prebuild-install) || (node-gyp rebuild && node install/dll-copy)`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the sharp@0.22.1 install script.
```

This is essentially the same [error](#error) we got before. Why? Aren't we supposed to be updating `sharp`?

If you look back at where `sharp` was referenced in our `package.json` and `package-lock.json` files, you will see that `sharp` is actually a _devDependency_. devDependencies only get updated when we run `npm update -D`.

So let's go ahead and run `npm update -D`.

Alright, no error this time! We do however get a message at the end of the installation stating that there are vulnerabilities:

```js
found 15 vulnerabilities (4 low, 2 moderate, 9 high)
  run `npm audit fix` to fix them, or `npm audit` for details
```

So we can go ahead and run `npm audit fix`.

While that's running, we can check out our package files to see what changed:

In `package-lock.json`, `sharp-cli`, which is marked as a devDependency (`"dev":true`) now `"requires"` version `0.23.3` instead of `0.22.1`.

This happened because:

1.  `sharp-cli` was listed in our `package.json` file
2.  `package-lock.json` tells npm which packages `sharp-cli` **depends** on
3.  `sharp` is one of the packages `sharp-cli` depends on

Alright, things are looking good! But we aren't out of the woods yet. All we have done at this point is update any packages that needed updating.

We need to `npm install` again to actually install all of the packages in `package.json` (along with their dependencies).

Success!

**Bonus**: The command runs much more quickly this time because the update command installed the majority of the packages.

We get another message about vulnerabilities and run `npm audit fix` again.

Now we are finally ready to run `gatsby develop` and verify that the project can build and run correctly.

If only it were that easy! This time we get a brand new error message:

```js
Error: {
    err: Error: spawn /mnt/c/Users/j3ste/npmtest/blog/node_modules/cwebp-bin/ve  ndor/cwebp ENOENT
```

We see that the error is pointing to the `node_modules/webp-bin` folder. What probably happened is that when we ran our `npm update -D` command, parts of the `node_modules` directory became corrupted.

To fix it, we can "refresh" the `node_modules` folder. The rest of the commands should now work because we have resolved our dependencies.

1. `rm -rf node_modules/`
2. `npm install`
3. `npm audit fix`
4. `gatsby develop`

Phew! We made it!

In the next section, we go over how to handle a situation in which the version of node itself is the issue, rather than a particular package.

<h2 id='managing-nvm'>Managing Node Versions with nvm</h2>

[TL;DR](#top)<br />
[Managing and Prioritizing Errors](#managing-errors)<br />
[Understanding Version Locking](#version-locking)<br />
[Resolving Dependencies](#resolving-dependencies)<br />
[Semantic Versioning](#semantic-versioning)<br />
[npm update](#update-commands)<br />
[Peer Dependencies](#peer-dependencies)<br />
[Still Having Issues?](#issues)

To demonstrate the second [scenario](#reasons), we are going to install a [different starter theme](https://www.gatsbyjs.org/starters/greglobinski/gatsby-starter-hero-blog/).

1. `gatsby new gatsby-starter-hero-blog https://github.com/greglobinski/gatsby-starter-hero-blog`
2. `cd gatsby-hero-starter-blog`
3. `npm audit fix`
4. `gatsby develop`

I did not get an error when installing this theme, but if you did, you can refer to [this section](#update-commands) of the post to resolve it.

Although I did not get an error, there was an issue when running `gatsby develop`: The build always gets stuck on the 'generating image thumbnails` step, no matter how many times retry the command.

To investigate the issue, I:

1. Went to the theme's [repo](https://github.com/greglobinski/gatsby-starter-hero-blog).

2. Went to the [Issues tab](https://github.com/greglobinski/gatsby-starter-hero-blog/issues).

3. Found the issue titled [_Initial "gatsby develop" fails_](https://github.com/greglobinski/gatsby-starter-hero-blog/issues/67).

Reading through the page, several people say that using `node 10` solved their issue.

In my experience, the easiest way to use another version of node is to use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md).

We can install nvm with the following commands:

1. `sudo apt-get install curl`
2. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`

Once nvm is installed, you can switch to another version of node. Note that only the current terminal session will use that version of node. In other words, if you open a new terminal window and type `node -v`, you should see your default version of node.

To use node 10:

1. `nvm install 10`
2. `nvm use 10`

This version of node will not be aware of your Gatsby installation, so you will need to run `npm install -g gatsby-cli`.

Now we are ready to run `gatsby develop` again. This time, instead of the build getting stuck, we get an error:

```js
Something went wrong installing the "sharp" module

Module did not self-register.

- Remove the "node_modules/sharp" directory, run "npm install" and look for errors
- Consult the installation documentation at https://sharp.pixelplumbing.com/en/stable/install/
- Search for this error at https://github.com/lovell/sharp/issues
```

Hey, we got some instructions! Let's follow them:

1. `rm -rf node_modules/sharp`
2. `npm install`
3. `npm audit fix`
4. `gatsby develop`

Success!

In the next (and last) section, we cover peerDependencies.

<h2 id='peer-dependencies'>Peer Dependencies</h2>

This type of dependency is a bit less common to see, but just as important to understand. These will appear in your `package.json` as `peerDependencies`.

The thing that sets peerDependencies apart from package-level dependencies and devDependencies is the fact that peerDependencies are not installed automatically. Why not?

This is typically seen with plugins that a different version of a package that is already defined at the top-level, but a different version of it. To avoid installing two versions of the same package, the peerDependencies are not installed.

Quite honestly, I don't understand peerDependencies much beyond this point. What I do know is that `yarn` seems to handle them better than npm. Throughout this post, I have tried to provide a base-level understanding of the underlying technologies -- but the point is primarily to get you past your installation issues without just saying "run these commands".

Anyways, `yarn` does pretty much the same thing as `npm`, but in a slightly different way. `npm` waits for one package to be installed before starting to install the next, while `yarn` installs packages in parallel.

Let's look at an example -- another [Gatsby theme](https://www.gatsbyjs.org/starters/seabeams/gatsby-starter-auth-aws-amplify/), surprise!

1. `gatsby new gatsby-starter-auth-aws-amplify https://github.com/ben-siewert/gatsby-starter-auth-aws-amplify`
2. `cd gatsby-starter-auth-aws-amplify`
3. Look at the `README` file for the repo and issue the commands specified (listed in following steps)
4. `npm install -g @aws-amplify/cli`
5. `amplify configure`
6. Follow the prompts in your terminal
7. `amplify init`
8. `amplify add auth`
9. `amplify push`
10. `gatsby develop`

We get the following error:

`Error: Cannot create as TypeComposer the following value: Date.`

[Looking up this error](https://github.com/gatsbyjs/gatsby/issues/13278), it appears to come from conflicting versions of `graphql`. I tried manually installing the required version of `graphql`, but got the same result. However, it appears as if people have had success using `yarn`.

Let's try it!

- `npm install -g yarn`
- `yarn install`
- `gatsby develop`

We are able to run the development server this time! My understanding is that because `yarn` installs the packages in parallel, the package dependencies make more sense to our environment.

Again, I am by no means claiming to be an expert on this subject, but I always think it's better to try and understand why something works, instead of just knowing that it works.

I plan on updating this post as I gain a deeper understanding of the package manager. In the meantime, feel free to drop me an email with any questions or corrections you might have.

## Closing Thoughts

That was a lot to get through, but hopefully you feel a bit more comfortable with npm now. If something didn't quite make sense, or if you think I left something out, [let me know](mailto:whistle@theengine.tech)!

Learning how npm works wasn't necessarily something I was dying to do, but I'm really glad I invested the time. Now I feel like I know enough about npm to get past _any_ installation failures.

What a great feeling!

<h2 id='issues'>Still Having Issues?</h2>

[TL;DR](#top)<br />
[Managing and Prioritizing Errors](#managing-errors)<br />
[Understanding Version Locking](#version-locking)<br />
[Resolving Dependencies](#resolving-dependencies)<br />
[Semantic Versioning](#semantic-versioning)<br />
[npm update](#update-commands)<br />
[Managing Node Versions with nvm](#managing-nvm)<br />
[Peer Dependencies](#peer-dependencies)

If the steps above didn't solve your issue, you may want to try the following:

- Close text editor(s)
- **Completely** close terminal application (not just a new tab); start a fresh one
- `sudo apt upgrade`
- `sudo apt update`
- `sudo apt-get upgrade`
- `sudo apt-get update`
- Check for and install any Operating System updates
- Restart computer (yeah, yeah)
