+++
title = "Logging, Part 1: Creating links between objects"
summary = "An 'error logger' from an old project"  # Add a page description.
date=2020-12-14  # Add today's date.
weight = 100
type = "example"
#hidden = true
+++

## Introduction
In this example I'll talk about how we can make links between objects,
using real code from a real project I've worked on. We'll cover:
* references (again!)
* abstract classes
* favouring composition over inheritance:
There's [another page on this topic]({{<relref "../inheritcomp/">}}) too!



Let's imagine that we want to create some kind of logging system so
that we can see warning messages. There will be a Logger object, or
perhaps several, with each having a different "severity level." When
we want to log something, we just get access to the logger and call
one of its methods, perhaps something like 

```java
// I'll talk about Logger.FATAL later on.
logger.log(Logger.FATAL,"Something really bad happened");
```
The logger can be set up to ignore messages below a certain severity
level, so we can turn full logging on when we are debugging but leave it
just logging fatal errors most of the time.

## Creating and using a logger

Each class could create a logger as a private field:
```java
/**
 * A class which creates its own private logger
 */
public class SomeClass {
    /** create a private logger as a field */
    private Logger logger = new Logger();
    
    /**
     * Constructor which uses the logger field
     */
    public SomeClass() {
        logger.log(Logger.INFO,"SomeClass instance created");
    }
```

This is OK, but it's a bit wasteful - we only really need one for the whole
program. If we create several objects, we will end up with something like
this:

{{< figure src="obj1.png" >}}

Another problem is that all the loggers could have different severity
levels (which isn't what we want). Later on, I'll write code to let all
objects use a single logger with ease with a *class variable*. I won't do that
yet, though. Instead, I'll have all objects own a *reference* to just one
logger object. That means they can all share the same logger, like this:

{{< figure src="obj2.png" >}}

We can do this by writing the constructor for SomeClass so
that it takes a Logger as a parameter, which we can then store in
a field:
```java
/**
 * A class which uses a logger provided to it in
 * its constructor
 */
public class SomeClass {

    /** field which holds a reference to a logger */
    private Logger logger;

    /**
     * Constructor which takes a reference to a logger
     * and stores it in a field
     * @param logger
     */
    public SomeClass(Logger logger) {
        this.logger = logger;
        logger.log(Logger.INFO,"SomeClass instance created");
    }

    /** a method which doesn't actually do anything - it's just
     * an example showing how the logger field might be used.
     */
    public void someMethod(){
        // .. insert code here to actually do something ..

        // log a message
        logger.log(Logger.INFO,"Did something");
    }
}
```
Note that I've had to say ```this.logger``` in the constructor because
the parameter and the field have the same name. Because
the parameter name (and local variable names) takes precedence, I tell
the compiler "no, I really mean the *field*" by putting
"this" in front.



We can now use SomeClass and Logger in another class - let's say Main:
```java
/** Main class */
public class Main {
    /** Main method
     * @param args command line arguments
     */
    public static void main(String args[]){
        // create a logger
        Logger logger = new Logger();
        // now create some objects, giving each of them a reference
        // to the logger.
        SomeClass obj1 = new SomeClass(logger);
        SomeClass obj2 = new SomeClass(logger);
        SomeClass obj3 = new SomeClass(logger);
    }
}
```
We now have three objects sharing the same logger. Remember what's
happening here: we're creating a single logger, and then passing
references to that logger (its location in memory) to the three objects,
which store the reference in a field. So while there
are quite a few references to Logger in the system, there's only one
actual Logger object. **Copying a reference to an object, or passing
it as a parameter, doesn't make a copy of the object. It just gives you
a new "pointer" to it.**


Now each SomeClass object can use the logger (as they do in the SomeClass
constructor),
and they'll all be using the same one. To sum up the situation:
* We have three objects of the same class.
* The constructor of this class takes a reference to an object of another class
* and makes a copy of that reference for its private use.
* So we now have three objects with references to a single object.

If you're having difficulty with this idea, go back to
[my previous pages on references]({{< relref "../refs/" >}}) and revise
the idea.

## The Logger itself

At the moment, the logger doesn't do anything. It should at least print
a message to the console. In the examples above, we've used code like
this:
```java
Logger.log(Logger.FATAL,"Oh no!");
```
Here, we have a method ```log()``` which takes two parameters: a severity
code (how urgent the message is and what kind of thing happened) and a
string.

### Severity codes

The logger should have a "severity level", and ignore any log messages
which are lower than the current level. That means we're going
to need to compare the severity codes, so we'll make them integers.
We'll implement these with a group of constants inside Logger, which we'll
declare as "public static final":
* **public** means that other classes can use them;
* **static** means that they belong to the class, not to objects of
the class (they aren't fields);
* **final** means they are constant: once their value has been assigned
it can never be changed.

### The methods

The logger will two methods:
* **public void setSeverityLevel(int level)** will change
the logger's severity level;
* **public void log(int severity,String message)** will print the message,
but only if the severity is higher than (or equal to) the logger's severity
level.

### The code {#loggercode}
Now we can write the Logger class:

```java

/**
 * This is the basic logger class given in the first Logger example.
 * It has no flexibility, and only logs messages to the console.
 * Use it by creating a Logger object and then calling its log() method.
 * Typically, we will create a single Logger (perhaps in the Main class)
 * and give pass all objects a reference to this, so they can access it.
 */
public class Logger {
    // these are the different severity codes as "public static final"
    // values.

    /** Most severe code - the error is fatal and the program
      * will probably exit */
    public static final int FATAL=4;
    /** A serious error - the program will not work correctly */
    public static final int ERROR=3;
    /** A warning - the program will work, but the user should be careful */
    public static final int WARN=2;
    /** Information message, not an error */
    public static final int INFO=1;
    /** Debugging message */
    public static final int DEBUG=0;

    /**
     * The current severity level - messages with a LOWER severity
     * will be ignored. The default is INFO, so only DEBUG messages
     * will be ignored unless we change it.
     */
    private int severityLevel=INFO;

    /**
     * Constructor which does nothing, but it's good practice to have one.
     */
    public Logger(){
    }

    /**
     * the actual logging method, which prints the message
     * if the severity of the message is higher than or equal
     * to the current severity level
     * @param severity
     * @param message
     * @throws IllegalArgumentException
     */

    public void log(int severity,String message)
            throws IllegalArgumentException {

        if(severity<INFO || severity>FATAL){
            throw new IllegalArgumentException("invalid severity level!");
        }
        if(severity>=severityLevel) {
            // if the severity of the message is greater than
            // or equal to the current severity level, print
            // the message
            System.out.println(message);
        }
    }

    /**
     * Change the severity level - after this is called, messages
     * of severity >= level will be logged.
     * @param level
     * @throws IllegalArgumentException
     */

    public void setSeverityLevel(int level) throws IllegalArgumentException {
        if(level<INFO || level>FATAL){
            throw new IllegalArgumentException("invalid severity level!");
        }
        severityLevel = level;
    }
}
```
Notice that I am carefully checking that the severity levels are valid:
because they are integers, it's easy to pass in any number at all and
we want to make sure they are in range[^1].

Also note that there is no getter for the severity level. This is
deliberate - I don't want people to be able to find out what the current
severity level is from outside, because that might be abused. I'm not
sure how, I just have a feeling. There's a principle - "YAGNI" ("You
Ain't Gonna Need It") -  and I think getting the severity level is something
you shouldn't need.

## What next?

So now we have a working logger, but there are a few things we'd like
to be able to do:
* Having to give a reference to the logger to every object is a
bit painful. It would be good to be able to access a single logger with
ease from anywhere in the code.
* It would be good if the logger could be made to do different things:
write to a file, display a message in a window - or even a whole
set of things.

I'll talk about these in later posts.

## One last word

If you need a logging system and don't really care how it works,
you should probably use something more powerful - there's a handy guide
to modern Java logging systems
[here](https://www.marcobehler.com/guides/java-logging).
I wrote this logging system
before I was aware of these systems, and because I enjoy "reinventing
the wheel."

However, I also suggest that you build my system. 
Reinventing the wheel is not a complete waste of time,
provided that you are aware that you are doing it. It's often a good
way to practice coding.

[In the next example]({{<relref "../logger2/">}}) we'll look at how to change what the logging
system actually does in a flexible way.
Sometimes we might want to write to a file,
sometimes we might want to write to the console, or even pop up a message.
We might even want to do all these things, or do something we haven't
yet thought of.

[^1]: There's a better way - we could use an *enumeration* instead.
That brings in some complications (we can't use "<" or ">" to compare
enumerations), so I'm not doing it here.

