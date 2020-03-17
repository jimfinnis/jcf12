---
date: 2020-03-17
title: "Off Road Driving"
summary: "Work with Fred Labrosse on autonomous off-road driving."
tags: ["robot","driving"]
---

As part of QinetiQ's team entering DSTL's
[Autonomous Last Mile Resupply competition](https://www.gov.uk/government/publications/accelerator-competition-autonomous-last-mile-supply/accelerator-competition-autonomous-last-mile-resupply), our group
at Aberystwyth designed and implemented an autonomous off-road driving
solution based on forming a set of simple statistical colour
models of a track to follow. This involves a rather unusual colour
model: $h a^\star b^\star$. This model is based on the well-known
$L^\star a^\star b^\star$ model but removes the luminance coordinate,
replacing it with $h$, which a factor of the ground height in the image
in robot space.

Here's a video of our robot Tryfan following a track through the woods:

{{< youtube EaiVWhpZMJ4 >}}
