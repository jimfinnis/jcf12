---
date: 2020-03-16
title: A UML Example
type: cs123
categories:
    - cs123
subtitle: Programming Using an Object-Oriented Language
summary: Programming Using an Object-Oriented Language
image:
  preview_only: true
---

This page contains information my CS12320 tutorial groups may
find useful.

## Tutorial 5 class diagram and UML tools

Here is the diagram I produced for the MONSTER LAND "game" code, generated
using [PlantUML](https://plantuml.com). This takes a text description
of a UML diagram in a special markup language and builds it for you.
Other, more user-friendly alternatives include
[UMLetino](http://www.umlet.com/umletino/umletino.html) and
[diagrams.net](https://diagrams.net/),
formerly known as draw.io. There are quite a few more, google around!

{{< figure src="classdiag.png" title="Monster Land Class Diagram" lightbox="true">}}

This is missing a few attributes on Monster (name, hair and so on).

## Object diagrams

Object diagrams are not the same as class diagrams. While a class diagram
shows the relationships between the program's classes, an object
diagram shows the relationships between actual objects which might be running.
You can think of it as a "snapshot" of how the application's data looks
at a particular moment in time.

Chris Loftus uses a particular "standard" of his own for these, and
here's one I've made in [diagrams.net](https://diagrams.net/):

{{< figure src="objectdiagram.png" title="Monster Land Object Diagram" lightbox="true">}}

Here's how the diagram works:

* Each blob is an object in the running program.
* Each object has:
    * an optional label (just to help people talking about the diagram), followed by a colon, 
    followed by the class name;
    * a list of the attributes, either just *name=value* if it's a primitive
    attribute (or String), or just the name if it's a reference to another object;
    * Arrows pointing from object attributes to the object which is their value.
* If an object is a collection, it has some boxes showing the values in
the collection. If these are objects, they will have arrows pointing to the values
* If an object is a subclass, the object's blob is split into two sections with
dotted lines. The top part has the attributes the object has got from
its superclass, the bottom part has those which come from the subclass itself.

The point is that this is not a class diagram: it shows the objects a program
have while it's running. In this particular example, we have 

* an Application which has a Monster
* a Monster which has an array list of Weapons
* and three Weapons in the array list: two Sticks and a Gun.
