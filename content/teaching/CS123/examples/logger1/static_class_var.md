
but that's wasteful. There might be a need for multiple loggers in some
code, where different loggers do different things with their data, but
not here - I only really want one logger which I can use
everywhere. To leave both possibilities open, I'll create a single
Logger object and make it a *public static* instance variable inside
the Logger class itself: it's perfectly OK to have code inside a class
create instances of the class.
The bare bones of our class now look like this:
```java
public class Logger {
    // constructor doesn't do anything yet
    public Logger(){

    }

    // a logger anyone can use, created at program start
    public static Logger log = new Logger();
}
```
Remember that the **static** keyword turns what would normally be
an instance variable into a *class variable*. This is a variable
which belongs to the whole class - you don't need to create an
object to hold it[^1]. So once this class has been added to the project,
we can get a logger with ```Logger.log```.

This is still a little "impolite": just like instance variables,
class variables shouldn't be public but accessed through a getter.
So we'll make it private and write a *class method* to access it.
Like class variables, these are not attached to any particular object
but belong to the whole class. And just like class variables, we declare
them with *static*:
```java
public class Logger {
    // constructor doesn't do anything yet
    public Logger(){

    }

    // a logger anyone can use, created at program start
    private static Logger log = new Logger();
    
    // get the static logger created in the line above
    public Logger get(){
        return log;
    }
}
```
That's better from the "coding standards" point of view - other programmers
(or you) won't be tempted to write to the *log* variable.

Can we draw a 


[^1]: The word *static* is a historical accident - Java is based on C,
and you may remember that the *static* keyword in C makes a local variable
survive when a function returns, so that it still has the same function
when you call it again. For some reason the designer of Java (James Gosling)
decided to reuse this keyword for a different purpose rather than create
a new one.
