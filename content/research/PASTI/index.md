---
date: 2026-10-30
title: "PASTI"
summary: "A shared online whiteboard for panoramic photos, where a team
can mark and discuss points of interest." 
tags: ["pasti","mars","exomars","python"]
image:
    preview_only: true
---

{{< figure src="pasti.png" title="The PASTI web application showing a rough mosaic captured in Aberystwyth with some user suggestions" >}}

PASTI is a planning tool for scientists working on the ExoMars Rosalind
Franklin rover, the European mission due to land on Mars and drill up to two
metres underground to look for signs of past life.

A Mars rover can't be steered in real time, because signals take many minutes
to travel each way and contact windows are limited. Instead, each Martian day
("sol") the rover sends back photos - mostly panoramas of its surroundings
from its cameras. On Earth, the science team has a short window to study those
pictures and decide what the rover should do next: which rock to look at
closely, where to drive, what to photograph in more detail and where it might
be worth drilling. Those commands are uploaded, the rover carries them out,
and the cycle repeats.

{{< figure src="Rover_s_science_room.png"
title="The ROCC Science Room during the SKP Field Test 1. PASTI is in use on the central laptop on the nearest desk. Image &copy; ESA">}}


Pasti gives the team a single "space" to do this work. Every sol, new
panoramas are loaded in and organised. Science team members can then
log in and mark points of interest directly on the images, with
each "suggestion" tagged with keywords and the scientist's name. Everyone
sees these marks as they are added, so they can discuss them easily.
Special team members - the PanCam Operations Science Analysts, or POSAs -
can then decide which suggestions become "targets" for further study.

PASTI is very much a collaborative development. The
back-end and database structure was written by me, while the HTML and
Javascript front-end (which does all the fancy 3D graphics) was written
by my colleague James Cole  at the Open University. The project as a whole
is managed by [Matt Balme](https://schools.stem.open.ac.uk/people/matt-balme/)
at the OU, who is the deputy PI of the PanCam project (the rover's main camera
system).


Image source: [European Space Agency](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/European_rover_trains_for_Mars_in_the_desert)


