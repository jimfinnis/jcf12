---
date: 2020-03-17
title: "Rover walking"
summary: "Is 'walking' a useful way of getting around on Mars?"
tags: ["robot","driving"]
---

This was my final year project, and this page is work in progress
(despite the work being fairly old now). 

There's more information on the robot, Blodwen, 
[here](/project/blodwen): the picture at the top of this page shows
it in an early incarnation, powered by a lead-acid battery and using
a network as the on-board PC.

The short answer, by the way, is "probably not." I'd hoped that using
some kind of walking gait on slopes would help overcome slip on the
powdery surface, but it's quite inefficient. More work needs to 
be done with better motor control algorithms, and probably better
motors. Here's a video:

{{< youtube 7vspI6JLdMA >}}


The full report is available {{< download file=report.pdf text="here" >}}.


This project heavily used the [Angort](/project/angort) language:
it proved very useful in developing both the subsumption system which
managed the gaits and the artificial endocrine system which switched
between them.

Angort is still used for everyday driving in Blodwen: it is trivial
to connect to the system and type

```bash
reset calib
300 d
```
to reset, recalibrate and drive.
