---
date: 2021-07-13
title: PCOT
summary: "PCOT (PanCam Operations Toolkit) is a Python application and
library for processing data obtained from the PanCam cameras on the
Rosalind Franklin ExoMars rover."
tags: ["artificial endocrine system", "phd","UESMANN"]

---

PCOT is both a Python application and a library for processing data 
obtained from the [PanCam cameras](https://www.ucl.ac.uk/mssl/research-projects/2021/jun/exomars-2022-rover-rosalind-franklin)
 on the Rosalind Franklin ExoMars rover.
Primarily it deals with calibrating
and processing multispectral images, although it also deals with other kinds of data.

A PCOT document consists of a directed graph of nodes which perform
transformations of data (usually an image, but not always). The inputs to a
PCOT graph are read directly from the DAR (Data Archive) in the Rover
Operations Centre (but can be cached). Scientists and engineers can share PCOT
documents and see the exact transformations which were used to generate the
images/data they produce.
