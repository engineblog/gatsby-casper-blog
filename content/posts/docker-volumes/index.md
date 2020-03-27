---
title: "How to Easily Fix Your Docker Volumes in Windows"
slug: "docker-volumes-windows"
cover: "/images/docker-volume.jpg"
credit: "Thomas Kelley on Unsplash"
date: "2020-03-25"
author: sharif
category: "web development"
tags:
  - windows
  - docker
  - quick tips
---

<span id='top'></span>

> TL;DR: Make sure Docker is installed in 'C:\Users'

<!-- end -->

I've included the "TL;DR" up top because it really is that simple of a fix. However, I still thought that this was worthy of a post, for those interested in a bit more detail.

So yes, that's really all there is "solution-wise" to this post:

- Make sure Docker is installed in `C:\Users\yourUserName`
- You can then use the following syntax for your volume:

`docker container run -it --rm -p 5000:5000 -e FLASK_APP=app.py --name web1 -e FLASK_DEBUG=1 -v $PWD:/app web1`

- `$PWD` is our 'present working directory' on your local machine

- `/app` is the `WORKDIR` in the container

- You should now be able to refresh the application to see changes, without stopping and restarting the image

If you're having issues with Docker volumes on Windows for a reason other than the installed location, [drop me a line](https://twitter.com/engineBlog), and I'll do my best to help you out!

## Background

When I ran into this issue, I was using an MSI gaming laptop.

Why does that matter?

Since it's a gaming laptop, the hard drive setup is a bit differently than your run-of-the-mill machine:

`C:\` is a solid state drive, mainly intended for quicker boot times. As such, there isn't a ton of hard drive space remaining after Windows is installed.

The idea is to install software on `D:\`, a 1TB HDD. This setup makes sense for installing games, but I found myself installing development tools in my `D:\` drive so that `C:\` didn't get filled up.

Being in the habit of using `D:\` as my main drive, that is where I installed Docker.

This caused issues with more than just Docker. I had a heck of a time setting up SSH keys because I saved them in `D:\` instead of the default location in `C:\Users\me`.

What I took away from the experience is:

**They're called "gaming laptops" for a reason**.

Sure, you can use a gaming laptop for development and get along just fine. In my experience, however, it was more trouble than it was worth -- not to mention the _horrendous_ battery life.

In my opinion, it's much better to use a general purpose laptop for development, rather than a purpose-built laptop.

If you use a gaming laptop for development, and don't need to take extra steps to circumvent storage issues and battery life, [let me know](https://twitter.com/engineBlog) which one you use!
