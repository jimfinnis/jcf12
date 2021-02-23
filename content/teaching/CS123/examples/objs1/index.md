+++
title="Objects and methods"
summary="How are classes different from structs?"
date=2021-01-19
weight=10
hidden=true
type="example"
+++

[Earlier]({{< relref "../whatAreObjects/" >}}) we looked at **objects**, which are
blocks of data in memory, and **classes**, which describe how those blocks
are made up.

This description applies to C's structs too, but classes and objects have some
extra features. The most important is that **classes can contain code that
does stuff**: methods.


## Methods

We can write blocks of code inside our classes which look very much
like functions. However, we don't call them functions - we call them
**methods** of the class they are inside. They are almost exactly like
functions, but they have extra features. Here's what a method called
```moveBy``` might look like inside the Enemy class:
```java
class Enemy {
    public int x,y;
    public float hp;
    public int ammo;
    
    // add dx and dy to x and y inside the object
    public void moveBy(int dx,int dy){
        x = x+dx;
        y = y+dy;
    }
}
```
The first thing to realise is that while methods look a lot like
functions, they can't be used the same way.
Instead, you **must
call a method on a particular object**. Here's an example:
```java
Enemy e = new Enemy();
e.moveBy(0,1);
```
Here, we are creating an Enemy and storing a reference to it in ```e```.
We then call the method ```moveBy``` on the object referred to by
that reference. We know that method exists, because it's defined in
the Enemy class and ```e``` is a member of that class.

We can't use a method like a function because methods get access to all the
fields of the object on which they were called just as if they
were local variables. Look again at the example above, in the body
of the method:
```java
x = x+dx;
y = y+dy;
```
The method accesses the instance variables ```x``` and ```y``` 
belonging to the instance on which ```moveBy``` was called.

Summing up:
* **Methods can only be called on objects**, by using a reference to the
object: for example, ```e.moveBy(0,1)``` where ```e``` is a reference
to an Enemy object and ```moveBy``` is a method of the Enemy class.
* Inside a method, **fields look like variables**. For example, we can write
```x = 10``` if ```x``` is a field of the class.

Some more points:
* There is a special reference called **this** which we can use inside
methods, which points to the object itself. That means we could write
```this.x = 10```
instead of ```x = 10```. It's sometimes useful when we want to pass a
reference to this object into the method of another object.
* Fields can be **public**, in which case they can be used outside
the class's code, so you could write ```e.x``` inside some other class
to get a public ```x``` field. That's how we have been using fields so far.
* Fields can be **private**, in which case they can only be used inside
the class' own code (there are some other "access modifiers" too, but
don't worry about them for now).
* Methods can be public and private too!

## A tidier Room
The [Room class from our previous example]({{< relref "../refs2/">}})
is just a description block of data, with public fields and no methods.
This is a **really bad idea**. It's usually good practice to make
all fields private, only accessing them via members.

This is because we want to hide as many details as we can of how
our classes work. To the rest of the code, each class should be a
very simple machine. Only things we absolutely have to "expose" to
the outside world should be public, and we should only expose those
by methods.

Let's rewrite Room, step by step, with this in mind. Here it is from
the previous page:

```java
public class Room {
    public String text;
    
    public Room north;
    public Room south;
    public Room east;
    public Room west;
}    
```

### Adding a constructor

The first step will be adding a **constructor**. This is a special
method runs when we do ```new Room()```, and it runs
on the freshly instantiated object after default field values are set
but before anything else. We can provide parameters, and those go
inside the brackets after the class name: ```new Room(arg1,arg2..)```.

Our constructor will have a single argument: the String text for the room.
It will use that argument to set the ```text``` field:
```java
public class Room {
    public String text;
    
    public Room north;
    public Room south;
    public Room east;
    public Room west;

    public Room(String t){
        text = t;
    }
}    
```

### Making the text private
Now we can write a **getter** for the text field, and make that field
private:
```java
public class Room {
    private String text;
    
    public Room north;
    public Room south;
    public Room east;
    public Room west;

    public Room(String t){
        text = t;
    }
    
    public getText(){
        return text;
    }
}    
```

QUIZ advantages
