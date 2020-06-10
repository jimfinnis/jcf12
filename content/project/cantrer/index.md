---
date: 2020-03-17
title: Cantre'r Gwaelod
summary: "A piece of generative music, changing in real time with the weather
and the tide."
tags: ["music"]
---

Cantre'r Gwaelod is a constantly changing piece of music, based on the
famous story and using elements of the poem Boddi Maes Gwyddno. The music
alters according to the weather and tide conditions, reaching a climax at the
high tide as the rising sea endangers the land.

Horns and bells herald the high tide, low tide reveals bony drones. Guitar
loops and piano play with the intensity of the rain and wind. Things move
slower as the temperature falls.


The original piece ran online for a period of around two months in August and
September 2017 as part of Arad Goch's "Hen Linell Bell/Old Far Line" festival.
I've since deactivated it for lack of funds. The
[website is still up](http://www.cantrer.pale.org/), but there's no streaming.

However, it can still be heard on 
[Bandcamp](https://archfalhwyl.bandcamp.com/track/cantrer-gwaelod):
a relatively brief snippet has been produced using a compressed set of weather
data from a week of stormy and sunny weather in September 2017.

## Technology

Technology: 
* Linuxsampler piano
* Supercollider for loops, drones and bells
* zynaddsubfx for more drones
* Boss looper pedal to put together the 20 or so guitar loops.
* Everything is tied together with Jack and controlled through a
custom set of programs in Python, Angort and C++.

{{< figure src="blockdiag.png" title="Data flow diagram. Blue is MIDI, red is OSC, green is my own Diamond Apparatus comms, and black is Jack audio data." >}}
