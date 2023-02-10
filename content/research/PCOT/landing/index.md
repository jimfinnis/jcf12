---
date: 2021-07-13
title: PCOT
summary: "PCOT (PanCam Operations Toolkit) is a Python application and
library for processing data obtained from the PanCam cameras on the
Rosalind Franklin ExoMars rover."
tags: ["pcot","mars","python"]

---

PCOT is both a Python application and a library for processing data obtained
from the [PanCam
cameras](https://www.ucl.ac.uk/mssl/research-projects/2021/jun/exomars-2022-rover-rosalind-franklin)
on the Rosalind Franklin ExoMars rover. Primarily it deals with calibrating
and processing multispectral images, although it also deals with other kinds
of data. It is open source software: 
[click here to view the repository](https://github.com/AU-ExoMars/PCOT).

A PCOT document consists of a directed graph of nodes which perform
transformations of data (usually an image, but not always). The inputs to a
PCOT graph are read directly from the DAR (Data Archive) in the Rover
Operations Centre (but can be cached). Scientists and engineers can share PCOT
documents and see the exact transformations which were used to generate the
images/data they produce.

For example, here is an image produced the traditional way:

{{< figure src="ROI_locations.jpg" title="ROI spectral plots">}}

Here is a pair of images showing similar data in PCOT (although I haven't
added all the ROIs, and the data is currently uncalibrated):

{{< figure src="out.png" title="histequal node output (artifacts are due to the TVL-1 autoregistration algorithm)">}}

{{< figure src="outspec.png" title="spectrum node output">}}

Viewing this data in the PCOT app lets us see how it was generated:

{{< figure src="outgraph.png" title="PCOT application">}}

* We have two inputs from two separate images (left and right cameras)
* We register these manually, distorting the left camera image to match the right
* This is imperfect, so we also do the process automatically on the output
of the manual registration. While this produces artifacts, it works well
enough on the parts of the image in which we are interested.
* We merge the two images into a single image
* We then have a sequence of "painted" regions of interest added to the merged image
* We plot a spectrum of these images (as seen above)
* We then strip out the ROIs, perform a histogram equalisation on the whole
image (normally it is confined to any ROIs), and then
reimpose the ROIs onto the image for viewing.
 The output is the image shown above, and is also shown in the PCOT app view.


## Calibration
Much of the PCOT work will be calibrating images. See 
[here]({{<relref "../maths/">}}).
