---
date: 2020-03-16
title: Instruments
summary: "A collection of odd musical instruments"
tags: ["music"]
---

Sometimes I make odd musical instruments, and here are two of them.

## The Roboglock

{{< figure src="glock.jpg" title="The Roboglock">}}

This is a self-playing glockenspiel. The user interface (such as it is)
works like an old mainframe control panel: you set a binary
register address with four switches, set a data value with four others,
and toggle the "write" switch. Easy. It plays pentatonic tunes based
on cycles of numbers of different lengths which drift in and out
of phase.

It's based on an ATMega328, with a PIC handling the user interface.
The strikers are underneath the bars, and use solenoids
made of cut-up Biros wrapped in copper wire.
Here's a video of the breadboard version:

{{< youtube sqY_jkpJWQg >}}

## The Dataglove

{{< figure src="glove.jpg" title="The Dataglove">}}

This is based on an Moteino[^2], one of those cheap gloves with
conductive tips that were all the rage a few years back, some
conductive thread, an LED and a 3-axis accelerometer. It communicates
with a base station[^3], sending back the accelerometer readings and
the voltage of the four finger pads. These are normally held high
and the thumb pad is grounded. The base station can also send
commands to change the RGB LED.

I use it to control musical performances with gestures. Here's a video
of the system at work, featuring my friend Cêt Haf. Hard to see what's
going on here, but it does work: the glove is controlling a set
of [SuperCollider](https://supercollider.github.io/) instruments (via an
[Angort](/project/angort) script).

{{< youtube XVR8LKClbXU >}}




## The Bloody Stupid Johnson Memorial Electroboe[^1]

This absurd machine is again ATMega based. It uses a pressure sensor
to handle the volume (and timbre) and a set of light-dependent resistors for the pitch:
covering a resistor is like covering a hole on a real instrument. There
are also a couple of switches for octave and semitone. It makes
a truly terrible sound, and the light levels have to be consistent
for it to work.

{{< figure src="oboe.jpg" title="The Oboe">}}

And here's me playing it, badly. I don't think it's possible to play it
well.

{{< youtube -jCtQWDylvc >}}

[^1]: With apologies to the late Terry Pratchett.
[^2]: A rather lovely little Arduino clone with radio communications.
[^3]: The Box of Knobs, not illustrated, and built from an old whiskey
presentation case!
