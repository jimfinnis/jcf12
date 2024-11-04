---
date: 2023-11-06
title: CS12020
subtitle: Introduction to Programming
summary: Introduction to Programming
image:
  preview_only: true


---

This page contains material for students in the Graphics and
Games stream of CS12020.

## AberLED library

* The library for controlling the LED matrix shield can be downloaded
from [this link](/downloads/AberLED.zip), or (probably better) from
the CS12020 area on Blackboard.

* Automatically generated documentation is available
[from here](/docs/AberLEDdocs/).

### Downloading and installing a new version of the library

The latest version is **3.2**, dated **16th November 2023** and codenamed
**ETERNAL EVENING**. If you have a TFT display, it will show the version when
it start up. If you have a bicolor LED matrix, you will need to
look for the version() function in AberLED.cpp inside the library.

To install the latest version:
* Find your libraries directory - it should be something like Documents/Arduino/libraries in your home directory.
* Delete the existing AberLED directory.
* Download and reinstall the AberLED library as described in the first worksheet,
using either the link above or from Blackboard.
* Check that your programs still compile and run.

If you have any problems with this, please email me as soon as possible.


## Arduino cheatsheet


{{< download file=arduino.pdf text="Here is a (hopefully) useful cheatsheet">}}
describing almost
the entire Arduino C language on 4 sides of A4. It might make a useful
reference or revision aid.
