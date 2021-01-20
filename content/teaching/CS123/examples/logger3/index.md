+++
title = "Logging, Part 3: Using composition instead of inheritance"
summary = "Changing what the logger does by plugging in an output object"
date=2020-12-14  # Add today's date.
weight = 102
type = "example"
hidden = true
+++

## Introduction

[Last time]({{<relref "../logger2/">}}) we modified the logging system we built in
[the first logging example]({{<relref "../logger1/">}}) so that we could change the
behaviour by creating a new subclass of Logger. This left the actual logging method
in the Logger abstract, so that the subclasses could provide it in different ways.
Here's the UML diagram:

{{< figure src="../logger2/uml2.png" title="The abstract Logger" >}}

Unfortunately we found this was a little messy.
