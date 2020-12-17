+++
title = "Creating links between objects"
summary = "An example from an old assignment"  # Add a page description.
date=2020-12-14  # Add today's date.
categories = ["example123"]
type = "example"
+++

## Introduction
In this example I'll talk about how we can make links between objects,
and how this is often done in the constructor of one of the classes.
I'm going to be using real code from a real project I've worked on.

## The Logger

Let's imagine that we want to create some kind of logging system so
that we can see warning messages. There will be a Logger object, or
perhaps several with each having a different "log level." When
we want to log something, we just get access to the logger and send
a message to it, perhaps something like 

```java
// I'll talk about Logger.FATAL later on.
logger.log(Logger.FATAL,"Something really bad happened");
```

How do we make sure we can have access to a Logger at all times? Well,
each class could just create one:

```java
class SomeClassOrOther {
    // create a private logger as an instance variable
    private Logger logger = new Logger();
    
    // and use it in the constructor
    public SomeClassOrOther() {
        logger.log(Logger.FATAL,"Something really bad happened");
    }
```
