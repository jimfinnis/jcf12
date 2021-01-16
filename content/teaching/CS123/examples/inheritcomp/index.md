+++
title = "Favour composition over inheritance"
summary = "Use 'has a' instead of 'is a' relationships"
date=2020-12-14  # Add today's date.
weight = 80
categories = ["example123"]
type = "example"
+++

## Introduction

**"Favouring composition over inheritance"** is something you may have heard
about or seen on the web as a principle for object-oriented programming,
but what does it mean?

There are two basic relationships two classes can have.
In **inheritance**, one class is a subclass of another. This is often
described as an **is-a** relationship, where one thing is a particular
kind of other thing:
* a Dog is a Mammal
* a Manager is an Employee
* a PushButton (in a user interface) is a Widget
* a List is a Collection

The other relationship is **composition**, where objects of one class 
contain objects of another class. This is often called a **has-a** relationship:
* a Dog has a Head and four Legs
* a Manager has a PayrollID
* a Window (in a user interface) has a collection of Widgets
* a List has Elements

In general, we should use the second kind of relationship in our programs,
even when it might feel more natural to use inheritance. Some programming
languages (like Go) don't allow inheritance at all.

## Why is it a good idea?
Firstly, it's actually easier once you get used to it. Building a "family
tree" of classes with inheritance involves finding common properties and
behaviours they all have, and this can be difficult. It can be tempting
to try to put things into the tree which don't really belong there.

Secondly, you get more flexible code which is easier to reuse because the
links between objects are much "looser." A subclass will inherit all of
its parent's properties when perhaps it doesn't need to.

## But how does polymorphism work?
Remember that **polymorphism** is the idea that one class (say Collection)
can represent all its subclasses (Set, Queue, List, ArrayList, PriorityQueue and so on).
Code which uses a Collection can use any of those subclasses instead.

How can this work if we don't use inheritance? 

The answer is that while we avoid inheritance of classes, we can still
implement interfaces. Implementing an interface is a lot like creating
a subclass, except that the methods we are implementing don't have 
any actual "body code" (code which does stuff) in the interface definition.

## An example

### With inheritance

Let's try a simple example. Imagine we are writing a game which has 
a player and some monsters. The monsters behave in different ways, but
have some things in common with the player. We might write something
like this using inheritance:

{{< figure src="umlgameinher.png" title="Game design with inheritance" >}}

At the root of this tree we have the Entity class, which is anything 
in the game which can move around. 
We can see that each class has a constructor, which takes the object's
initial position in the world, and Entity has three members which the
subclasses can override to change the behaviour:
* **move** to move the object,
* **makeNoise** to make some kind of random noise at intervals,
* **render** to draw it.

Entity will have some kind of default behaviour
for each method - for example, *makeNoise* might not do anything. In this
case, Player doesn't override it, so the Player doesn't make any noise.

There are probably going to be lots of other members too, but this is just
an outline.


Each subclass changes the behaviour in ways you should be familiar with by
now. For example, *move* will be very different for Player than for Monster:
the Player code will read the input and move the object, while the Monster
code might automatically move the object towards the Player.

Let's imagine that *move* for GuardFast
has special code allowing that monster to move very quickly. Let's also
imagine that *makeNoise* and *render* for GuardStealth make that monster
hard to see and hear.

Let's also imagine that we've designed this system and got it all working,
when our manager walks in and asks us to make a new kind of monster: a fast,
silent guard. It's going to be very difficult, because we need a class which
is a subclass of Guard, but has the *move* of GuardFast and the *makeNoise*
and *render* of GuardSilent.

### With composition

With composition, we imagine our Entity contains different objects, each
of which controls a different aspect of its behaviour. We'll combine
sound and visuals into a single concept for convenience, so Entity needs:
* A **Mover** to move the object around,
* an **Appearance** to draw the object and make sounds.

We'll create these as **interfaces**, and then create classes which implement
the Mover and Appearance interfaces in different ways. The Mover interface
will specify that there must be a *move* method to move an entity,
and Appearance will specify  *render* and *makeNoise* methods.
Each class will have constructors which take the Entity they should work on.

This leads us to something like this:

{{< figure src="umlgamecomp.png" title="Game design with composition (click to zoom)" >}}

Note that there should also be relationships going from each behaviour class
to Entity, since they each keep a reference to the Entity they control,
but that makes the UML very messy!

{{< figure src="umlgamecomp.png" title="Above with ALL relationships" >}}

### Code for composition example

How would we use this in actual code?

