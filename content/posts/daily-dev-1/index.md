---
title: "Daily Dev: First day with the Raspberry Pi"
slug: "daily-dev-1"
cover: "/images/pi-nes.jpg"
credit: "Hello I'm Nik 🎞 on Unsplash"
date: "2020-04-11"
author: sharif
category: "web development"
tags:
  - daily dev
---

My girlfriend got me a Raspberry Pi for Christmas. I just put it together yesterday.

Of course, I got it together, then took it back apart to put the heat sinks on, and then saw the warning card that said not to do that. Oh. that's what the holes in the case are for. Oops.

Since my girlfriend is awesome, the kit had a lot of stuff in it: Boards, LEDs push buttons, an SD card with Raspbian already installed. But I realized I didn't have an external keyboard to plug into it. It was getting late, so I just plugged it in, installed Raspian, and made sure it worked.

This morning, I connected an Ethernet cable from my MSI into the Pi. Hey, that rhymes. I Googled around for ways to use a laptop keyboard with a Pi and found some blog posts and followed the instructions to get the IP address of the Pi.

I used the IP address and put it into PuTTy. I Was able to SSH into the Pi, and realized that the Pi was actually getting Internet connectivity through the MSI. Neat. Now to actually get it to recognize the laptop keyboard.

I looked at a [YouTube video](https://www.youtube.com/watch?v=QF-eFEqB8w8&t=372s), which instructed to also install [Xming](https://en.wikipedia.org/wiki/Xming). At first, I wasn't able to get it to work, but then after looking into it a little bit / reading through the YouTube comments, I realized that Xming needs to first be running before you run the `startlxde` command. It was a little confusing because Xming automatically minimizes to the system tray when you launch it.

I finally got it connected through the MSI. It was essentially just remoting into the Pi through the MSI. I had originally wanted to just use the MSI keyboard. The remote interface is a little clunky, and I noticed that things don't launch as smoothly as they do when I'm logged directly into the Pi. The important thing was that I was able to launch [Sonic Pi](https://sonic-pi.net/), and write code using the laptop keyboard.

I didn't have any sound, though. I spent a long time trying different settings, both within the UI (with just the mouse, directly connected to the Pi) and through the PuTTy shell on the MSI. Nothing seemed to work. I tried plugging in my earbuds to the 3.5mm jack, and only then was I able to get sound.

I did a few modules in the [Sonic Pi Tutorial](https://sonic-pi.net/tutorial.html). It was pretty damn fun. I commented things out, changed the rates and pitches around, and was able to make some pretty cool sounding stuff, considering it was only the beginning of the tutorial.

I really wanted to keep going in the Sonic Pi tutorial, but the cord for the earbuds was really bugging me. I was using a pretty temporary setup, so the cords kept getting in the way when I would try and type. Knowing that the Pi has Bluetooth capability, I decided I would try my bluetooth headphones.

I didn't try _all_ of the options for bluetooth, but I tried probably half of the immediate ones I ran into. I was able to get the headphones to pair, but then I would get an error when I would actually try and connect to the headphones. Something about using the audio device interface. I tried a bunch of the system options, but nothing seemed to make any difference.

I finally realized that I could right-click the sound icon on the taskbar and select a device. I successfully connected the bluetooth headphones, but still wasn't getting output when I would run my code in Sonic Pi.

Then, I managed to pull up a YouTube video on the Pi. I had to copy paste random characters from my code into the browser, since I wasn't able to use the keyboard directly on the Pi; I could only use the keyboard through the SSH client. The YouTube video played sound through the Bluetooth headphones, but it didn't work in Sonic Pi.

I looked into that issue for a bit. I probably could have looked into it a bit more, but it was taking longer than I would have liked, and I felt like I had already spent a lot of time troubleshooting stuff.

I tried a solution that involved disabling all other audio channels besides Bluetooth. It seemed hopeful, but still didn't work with Sonic Pi.

I ended up trying the tried-and-true 'update everything' method. I was pretty hopeful, since it was taking a long time to run `sudo apt-get upgrade`, etc.

Because it was taking so long, I was starting to think of other ways to get around my limiting setup, while waiting for the updates to complete. I started looking into using my phone as a display / keyboard. I downloaded Terminus and VNC Viewer on my phone, followed the instructions in a tutorial, but the connection kept timing out, and I wasn't able to get it to work.

Naturally, I became obsessed with trying to make it work. I tried installing a couple of different VNC applications on the Pi, and tried to use them with VNC Viewer on my phone, but I wasn't able to get that to work, either.

At one point, I thought that I had found the tutorial I needed. I sort of just followed it blindly, because the title was a bit misleading. Turns out, the tutorial was for turning the Pi into a hotspot, not using a phone as a display for the Pi. It ended up messing with my network settings, and I wasn't able to connect back to the WiFi. After not being able to find a solution for awhile, I thought about trying to reset the OS to the defaults.

But then I looked up how to uninstall the access point software. That seemed to fix the network issue. I tried another tutorial for the phone display, but still didn't have any luck.

So I _finally_ decided to just go back to coding music in Sonic Pi. Only now, the app won't open at all. It won't open through the Xming / SSH method **or** when I try to launch it directly from the Pi.

Okay, so maybe it _is_ time to set the OS back to the defaults. Except, it looks like the only way to do that is by holding down the Shift key on boot. But I don't have a keyboard. It's at my dad's, and I'm going to get it tomorrow. I looked for ways to get into recovery mode through the command line, but came up short. I did run across one method that involved putting the SD card in the caddy, then plugging that into a Windows machine, but it just seemed too involved, considering I would have my hands on a USB keyboard soon.

I am really hoping that once I trigger the recovery mode, and re-install Raspbian, that Sonic Pi will launch reliably, the way it did before I heavily messed with the configuration. I want to try and get the more "luxurious" configurations figured out eventually, but for now, coding music sounds pretty dang sweet.

Even though Sonic Pi is available on Windows, I want to make sure I can run it reliably on the Pi. The idea of wiring a push button to the Pi (and using that to trigger musical code) is what I want to go for, and I'll be pretty disappointed if I don't find a way to run it reliably on Raspbian before the weekend is over.
