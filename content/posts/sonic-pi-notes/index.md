---
title: "Sonic Pi Notes"
slug: "sonic-pi-notes"
cover: "/images/microphone.jpg"
credit: "Thomas Le on Unsplash"
date: "2020-04-15"
author: sharif
category: "web development"
tags:
  - notes
---

> **_Note_**: I will be copying many things directly from the [Sonic Pi Tutorial](https://sonic-pi.net/tutorial.html#section-4). I am keeping this document as a sort of quick reference for myself and others. I covered the basics of ASDR envelopes in [this post](/daily-dev-2), so this document will be covering from Section 4 of the tutorial onward.

`cutoff`:

- Essentially muffles the sound
- Must use a value <= 130
- Lower `cutoff` values produce more muffle

```ruby
live_loop :experiment do
  sample :loop_amen, cutoff: 70
  sleep 1.75
end
```

## Randomization

`rrand`: Short for 'ranged random'. Not actually random, but pseudorandom.

```ruby
## Play a value between 50 and 95
## Re-running the code will produce the same tone
play rrand(50, 95)

## In a loop, however, each iteration plays a new value
## The loop will play the same 'random' values each time it is run
loop do
  play rrand(50, 95)
  sleep 0.5
end

## rrand can be used with other options, not only pitch
## Here we get a 'Haunted Bells' effect
loop do
  sample :perc_bell, rate: (rrand 0.125, 1.5)
  sleep rrand(0.2, 2)
end

## Random cutoff
use_synth :tb303

loop do
  play 50, release: 0.1, cutoff: rrand(60, 120)
  sleep 0.125
end
```

`use_random_seed`: Forces a new sequence of notes when using randomization

```ruby
## Keep changing the seed value and see the different notes you get
use_random_seed 40
5.times do
  play rrand(50, 100)
  sleep 0.5
end
```

`choose`: Choose a random value from a provided list

```ruby
## Plays 1 of the 3 values each time through the loop
loop do
  play choose([60, 65, 72])
  sleep 1
end
```

`rrand_i`: Returns a random integer instead of float
`rand`: Returns a random number between 0 and 1
`rand n`: Returns a random number between 0 and n (n is 1 by default)
`rand_i n` Returns a random integer between 0 and n
`dice(n)`: Like `rrand_i`, but forces 1 to be the lower bound; returns values between 1 and n
`one_in(n)`: Has a 1 in n chance of returning true, else returns false
