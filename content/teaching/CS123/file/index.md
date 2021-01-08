+++
title = "The FileLogger class"
date=2020-12-14  # Add today's date.
+++
Here is the code for a FileLogger class, a subclass
of the Logger abstract class introduced [here]({{< ref "../examples/2/" >}}) which
logs to files. 

To use it, you pass a filename for a log file into its constructor. When you've finished
with it, you must call its *shutdown()* method.


```
import java.io.FileWriter;
import java.io.IOException;

public class FileLogger extends Logger {

    // an object representing an open file we are writing log
    // messages to

    FileWriter fw;

    // create a new file logger, opening a file and storing
    // a reference to it. This file will remain open for the
    // entire run of the program - remember to close it at
    // the end by calling close() on this logger.

    public FileLogger(String filename){
        try
        {
            FileWriter fw = new FileWriter(filename);
        }
        catch(IOException ioe)
        {
            System.err.println("IOException: " + ioe.getMessage());
        }
    }

    // call this at the end of the program to close the output file.

    public void shutdown(){
        try {
            fw.close();
        } catch (IOException ioe) {
            System.err.println("IOException: " + ioe.getMessage());
        }
    }

    // actually perform the logging, writing the message to the open
    // file and "flushing" the writer, to guarantee the message is
    // stored on the disk. If we don't do this, and we forget to call
    // shutdown(), the final messages might never make it into the
    // actual disk file.

    @Override
    protected void performLog(String message) {
        try
        {
            fw.write(message);
            fw.flush();
        }
        catch(IOException ioe)
        {
            System.err.println("IOException: " + ioe.getMessage());
        }
    }
}
```

## Usage

Here is an example of using both the FileLogger and the ConsoleLogger. Perhaps
*obj1* is a really important task where we want all the log data to be stored in 
a file, while *obj2* and *obj3* are less important:

```java
public class Main {
    public static void main(String args[]){
        // create loggers
        Logger fileLogger = new FileLogger();
        Logger consLogger = new ConsoleLogger();
        
        // create some objects using the loggers - obj1 uses
        // the file logger, the others use the console logger.
        
        SomeClass obj1 = new SomeClass(fileLogger);
        SomeClass obj2 = new SomeClass(consoleLogger);
        SomeClass obj3 = new SomeClass(consoleLogger);
        
        // add some code here which actually does things with those
        // objects!
        
        // when we're finished, shut down the file logger

        fileLogger.shutdown();
    }
}
```
