+++
title = "Logging, Part 2: Changing behaviours with abstract classes" 
summary = "Changing what the logger does by making it abstract and using subclasses"
date=2020-12-14  # Add today's date.
weight = 101
type = "example"
hidden = true
+++

## Introduction

[Last time]({{<relref "../logger1/">}}) we built a very simple logging system based around the **Logger** class, where several objects can share
a single Logger object like this:

{{< figure src="../logger1/obj2.png" >}}

If an object needs to log information, you provide a reference to a 
Logger object as a parameter to its constructor. It then stores that reference as an instance
variable, so it can use it whenever we need to log something:
```java
/**
 * A class which uses a logger provided to it in
 * its constructor
 */
public class SomeClass {

    /** instance variable which holds a logger */
    private Logger logger;

    /**
     * Constructor which takes a reference to a logger
     * and stores it in an instance variable
     * @param logger
     */
    public SomeClass(Logger logger) {
        this.logger = logger;
        logger.log(Logger.INFO,"SomeClass instance created");
    }

    /** a method which doesn't actually do anything - it's just
     * an example showing how the logger instance variable might
     * be used.
     */
    public void someMethod(){
        // .. insert code here to actually do something ..

        // log a message
        logger.log(Logger.INFO,"Did something");
    }
}
```

Here's a UML diagram of what we have so far:

{{< figure src="uml1.png" title="Basic Logger and an example class which uses it" >}}

Note that the link between object and logger is still one-to-one,
despite objects sharing loggers. This is because each object only has a connection
to a single logger, and loggers do not have connections to the objects
that use them: the link is one way.

Here is an example of how the logger might be used in a **Main** class:
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

At the moment, the Logger class itself doesn't do much except print the message.
Here's the *log()* method (the entire
class can be found [in the previous example]({{< relref "../logger1/#loggercode">}})):
```java
    /**
     * the actual logging method, which calls performLog - an abstract method -
     * to do something with the message if the severity of the message
     * is higher or equal to the current severity level
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
```
How can we make the logger more flexible?

## Adding flexibility with an abstract class

At the moment the logger simply prints a message when it is called, provided the severity
is greater or equal to than the logger's current severity level.
We want our logger to be able to do different things when it logs a message.
We could simply write a *switch* statement inside the *log()* method which does
different things, but we might want to be able to add new kinds of logging action - we don't
want to limit them to code we provide in the class.

One possibility is to do the actual logging in an *abstract method*, and implement different
kinds of logger as subclasses of Logger. Like this:

{{< figure src="uml2.png" title="Using an abstract Logger" >}}

Here, the Logger class is an *abstract class* because it contains an *abstract method* called *performLog()*. This is
a method which doesn't have any code in it. Abstract classes cannot be instantiated: you can never create an
instance of an abstract class with "new". They can't actually exist in a running program.

So what's the point of them? We can create subclasses of abstract classes which have the abstract methods filled in
with code that does things. If an object is an instance of one of the subclasses, it is also
an instance of the abstract class, and so can be used wherever
we have code that uses the abstract class. 

Let's look at how this might work in our Logger. We're going to replace the printing code in *log()* with a call to
an abstract method called *performLog()* that will actually do this logging. However, we won't write any code
for *performLog()* - just the method signature:

```java
/**
 * This is the abstract logger class, which cannot be instantiated
 * (you can't make one of these with "new"). Instead, create a subclass
 * which extends this and provides code for the performLog()
 * method.
 */
public abstract class Logger {
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
     * will be ignored.
     */
    private int severityLevel=INFO;

    /**
     * Constructor which does nothing, but it's good practice to have one.
     */
    public Logger(){
    }

    /**
     * the actual logging method, which calls performLog - an
     * abstract method -to do something with the message
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
            // call the abstract method that will actually do the logging.
            // That will be in one of the subclasses of this class.
            performLog(message);
        }
    }

    /**
     * this method must be implemented by concrete subclasses of Logger
     * @param message
     */
    protected abstract void performLog(String message);

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

Now we can write *concrete* subclasses of Logger which actually do some logging (*concrete*
just means "not abstract").
Here's one which just prints the messages to the console, as the previous version did:

```java
/**
 * Console logger: prints logging messages the console
 */
public class ConsoleLogger extends Logger {
    /**
     * Method which does the actual logging,
     * printing a message to the console.
     * Called from log() in the superclass.
     * @param message message to log
     */
    @Override
    protected void performLog(String message) {
        System.out.println("Console Logger: "+message);
    }
}
```

Of course, we have to change our Main code - we can't create a Logger any more, we have to create
concrete classes (I'm omitting the Javadoc on Main here, you know how it works):

```java
public class Main {
    public static void main(String args[]){
        // create a logger
        Logger logger = new ConsoleLogger();
        // now create some objects, giving each of them a reference
        // to the logger.
        SomeClass obj1 = new SomeClass(logger);
        SomeClass obj2 = new SomeClass(logger);
        SomeClass obj3 = new SomeClass(logger);
    }
}
```
Note that line:
```java
        Logger logger = new ConsoleLogger();
```
We're creating a ConsoleLogger and assigning it to a variable of type Logger.
This is absolutely fine, because a ConsoleLogger is a kind of Logger (that's what subclasses are). We're
just saying that *logger* is a Logger of some kind, and we don't care what.

Now, when SomeClass calls its logging code, the actual Logger that will be
called is a ConsoleLogger. This will then check the severity in its *log*
method, and call *performLog* if the severity is high enough. Because this
Logger is really a ConsoleLogger, the *performLog* in ConsoleLogger is the one
that will run, and we'll see a message on the console.

We could write a FileLogger too, and I've put that in a
[separate page]({{< ref "../../filelogger/" >}}) because while it's quite long and involved, most of
that complication isn't necessary to understanding the core idea of abstract
classes.


[In the next section]({{< ref "../logger3/" >}}), we'll look at how to make this a little tidier
and more flexible by **favouring composition over inheritance**.
