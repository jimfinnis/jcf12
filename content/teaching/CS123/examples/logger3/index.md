+++
title = "Logging, Part 3: Using composition instead of inheritance"
summary = "Changing what the logger does by plugging in an output object"
date=2020-12-14  # Add today's date.
weight = 102
type = "example"
#hidden = true
+++

## The problem

[Last time]({{<relref "../logger2/">}}) we modified the logging system we built in
[the first logging example]({{<relref "../logger1/">}}) so that we could change the
behaviour by creating a new subclass of Logger. This left the actual logging method
in the Logger abstract, so that the subclasses could provide it in different ways.
Here's the UML diagram:

{{< figure src="../logger2/uml2.png" title="The abstract Logger" >}}

This lets us pick which Logger to use: a FileLogger if we want to log to a file, or
a ConsoleLogger if we want to log messages to console.
But what we do if we want to log messages to a file **and** to the console?
What do we do if we want to change the kind of logging a Logger does do while
the program is running?

## The solution

Using inheritance we can't do this. Instead, we should
**favour composition over inheritance** - instead of having classes which
inherit from each other with lots of **is-a-kind-of** relationships, we
can build our programs out of classes which define objects which link to
other objects in **has-a** relationships.

{{<important>}}
It's nearly always better to have a **has-a** relationship than
an **is-a-kind-of** relationship.
{{</important>}}

With our logging system;
* instead of ConsoleLogger and FileLogger being **kinds of** Logger,
* in the new system Loggers will **have** objects which output messages to the console or a file.

Here's how:
* we design a special ILogOutput **interface**, which specifies a method to output a log message;
* we make the Logger hold a collection of references to objects with this interface;
* we have the Logger's ```log()``` method run through the references, telling each one to output.

The system will look something like this:

{{< figure src="uml1.png" title="Composition based Logger" >}}


## Designing ILogOutput

This is the interface which describes what the output objects will do. It
specifies a single method which takes a String to output:

```java
public interface ILogOutput {
    public void output(String message);
}
```

## Implementing the console output

Implementing an output class which writes to the console is very simple:

```java
public class ConsoleOutput implements ILogOutput {
    @Override
    public void output(String message) {
        System.out.println(message);
    }
}
```

## Implementing the logger

### Getting started
Our new logger class is no longer abstract, because we're not using inheritance and abstract classes any more
(we are implementing interfaces, but that's different):

```java
public class Logger {
```

We still have the severity levels as before:
```java
    // these are the different severity codes as "public static final"
    // values.

    /** Most severe code - the error is fatal, the program will probably exit */
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
```

### A new field to hold the output objects
but now we have an extra field - a collection of all the different outputs. There are lots of collection
types in Java, but for simplicity I'm going to use an ArrayList:

```java
    private List<ILogOutput> outputs = new ArrayList<ILogOutput>();
```
That will create a new ArrayList of output objects and assign it to a field which holds a reference to any kind of list
of output objects. It's usually a good idea to assign to a variable which holds the widest possible range of things. 

### Constructor and severity level setter
Once again, we have our empty constructor and our method for changing the severity level:
```java
    /**
     * Constructor which does nothing, but it's good practice to have one.
     */
    public Logger(){
    }
    
    /**
     * Change the severity level - after this is called, messages of
     * severity >= level will be logged.
     * @param level
     * @throws IllegalArgumentException
     */

    public void setSeverityLevel(int level) throws IllegalArgumentException {
        if(level<INFO || level>FATAL){
            throw new IllegalArgumentException("invalid severity level!");
        }
        severityLevel = level;
    }
```

### Method to add output objects
Now we can write our method for adding a new output object to the logger. We could add a method for removing
outputs, but I'm not going to do that - again, I feel it could be misused. Also, removing things from
an ArrayList is really slow.

```java
    /**
     * Add an outputter to the list of outputters we are going to write to
     * @param ilo the outputter to add
     */
    public void addOutput(ILogOutput ilo){
        outputs.add(ilo);
    }
```

### The logging method
Finally, we can write the logging method. If the severity of the message is high enough,
this will use Java's "for each" syntax to go over the list,
calling the output method for each one.


```java
    /**
     * the actual logging method, which calls the output method
     * of all outputters if the severity of the message is higher or
     * equal to the current severity level
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
            // for each output object in the list of outputs
            for(ILogOutput ilo: outputs){
                // tell that outputter to output the message
                ilo.output(message);
            }
        }
    }
```

## How do we use it?

Now we've got this class, and assuming we've written output classes for file output and console output, how do we use it?
Here's a simple example:

```java
public class Main {
    public static void main(String args[]){
        // create a pair of outputs
        ILogOutput consOut = new ConsoleOutput();
        ILogOutput fileOut = new FileOutput("/tmp/foo.log");
        
        // now create THREE loggers. One will output to console,
        // one to file, and one to both.
        
        Logger consLogger = new Logger();
        Logger fileLogger = new Logger();
        Logger bothLogger = new Logger();
        
        // connect up the outputs to their loggers.
        // First, the console logger:
        consLogger.addOutput(consOut);
        // then the file logger:
        fileLogger.addOutput(fileOut);
        // then the "both" logger:
        bothLogger.addOutput(consOut);
        bothLogger.addOutput(fileOut);
        
        // now create some objects, giving each of them a reference
        // to a logger.
        SomeClass obj1 = new SomeClass(consLogger);
        SomeClass obj1a = new SomeClass(consLogger);
        SomeClass obj1b = new SomeClass(consLogger);
        SomeClass obj2 = new SomeClass(fileLogger);
        SomeClass obj3 = new SomeClass(bothLogger);
    }
}
```

It's probably a good idea to read 
[my other page on this]({{<relref "../inheritcomp/">}}) too!
