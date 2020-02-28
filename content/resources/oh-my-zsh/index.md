---
title: "Oh My Zsh"
url: "https://ohmyz.sh/"
anchor: "oh-my-zsh"
tags:
  - terminal
  - tools
---

This is a terminal framework that is built on top of Z Shell (most commonly referred to as “zsh”). If you want to use oh-my-zsh, you will need to first have zsh installed. So, why would you want to use oh-my-zsh? Great question! This tool has tons of themes and plugins that you can install to fully customize your terminal experience. Not only will it make your terminal look better, but it also has the potential to make you work more efficiently. For instance, many of the terminal themes will give you a visual cue in your terminal prompt that lets you know if your current git branch is clean or not. This way, you don’t need to issue a `git status` just to see if you have any uncommitted changes.

The main extension I use for oh-my-zsh is [z](https://github.com/rupa/z) (I know, too many Z’s!). In essence, z builds directory shortcuts into your terminal based on your history. This lets you move between files and folders **_much_** more quickly. Say you are a few folders deep within a directory and want to go back to the root: Instead of typing `cd ../../..`, you can simply type `z` followed by the first letter or two of the desired folder, then press `tab` to auto-complete.

Zsh will also allow you to write your own configurations, [such as this one](https://stackoverflow.com/questions/5407916/zsh-zle-shift-selection), which enables you to use your `ctrl` and `shift` keys with your arrow keys to navigate and select text in your terminal as if you were using a text editor.

I have a blog post coming soon on configuring these tools with [WSL](#wsl), but [Wes Bos's free course](#command-line-power-user) is also a great way to get started.
