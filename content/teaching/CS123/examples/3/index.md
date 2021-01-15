+++
title = "3. Using composition instead of inheritance"
summary = "Changing what the logger does by plugging in an output object"
date=2020-12-14  # Add today's date.
weight = 102
categories = ["example123"]
type = "example"
+++

## Introduction

[Last time]({{<relref "../2/">}}) we modified the logging system we built in
[the first logging example]({{<relref "../1/">}}) so that we could change the
behaviour by creating a new subclass of Logger. This left the actual logging method
in the Logger abstract, so that the subclasses could provide it in different ways.
Here's the UML diagram:

{{< figure src="../1/uml2.png" title="The abstract Logger" >}}

Unfortunately we found this was a little messy.
