---
title: "How To Hack Your Powershell's Syntax Highlighting"
slug: "powershell-syntax-highlighting"
cover: "/images/powershell-colors.jpg"
credit: "Robert Katzki on Unsplash"
date: "2020-03-25"
author: sharif
category: "web development"
tags:
  - windows
  - configuration
  - quick tips
---

I'll admit, it's pretty rare that I open up Powershell. But, I recently completed [Dive Into Docker](https://diveintodocker.com/), and found myself needing to use it for the course.

I decided to have some fun, and set a custom background image for Powershell using [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab).

I was loving my Powershell setup until I typed a parameter flag. The color was so hard to see in the screenshots I was taking for my notes:

![powershell dark parameter flags](/images/ps-screenshot.png)

I didn't want to ditch my super-cool background image just because _one color_ was hard to see. So instead, I started searching for ways to tweak the colors.

It took a bit more searching than I would have thought, but at least the solution is straightforward.

## Show Me Your True Colors

The first thing we need to do is access our `$profile` configuration file for Powershell.

1. Open a Powershell prompt
2. Type `$profile`

If the file path to your configuration file is not displayed in the console, you can follow [Microsoft's documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7#how-to-create-a-profile) on how to create the file.

Next, we need to open the configuration file in a text editor. You can do this right from the Powershell prompt by running:

`code $profile` (assuming you are using Visual Studio Code)

`notepad $profile` also works

Next, paste this configuration in, and alter the colors to your liking:

```powershell
Set-PSReadLineOption -Colors @{
  Command            = 'Magenta'
  Number             = 'Cyan'
  Member             = 'Green'
  Operator           = 'Magenta'
  Type               = 'Green'
  Variable           = 'Green'
  Parameter          = 'Yellow'
  ContinuationPrompt = 'Green'
  Default            = 'Cyan'
}
```

If you're getting an error at this point, it's because you need to allow Powershell to run scripts:

1. Open Powershell as an Administrator
2. Run `set-executionpolicy remotesigned`

If you're curious about the details of this execution policy, [Microsoft's Documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7#remotesigned) should answer any questions you might have.

Now our customized syntax highlighting color scheme will load each time a new Powershell terminal is launched.

And we're done!

If you feel like showing off your sweet Powershell setup, [send it on over](mailto:whistle@theengine.tech), or share it with me [on Twitter](https://twitter.com/sharifElkassed)!
