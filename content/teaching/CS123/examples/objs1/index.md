+++
title="Objects and methods"
summary="How are classes different from structs?"
date=2021-01-19
weight=10
hidden=true
type="example"
topscripts=["js/quiz.js","js/slides.js"]
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
reference to this object into a method of another object.
* Fields can be **public**, in which case they can be used outside
the class's code, so you could write ```e.x``` inside some other class
to get a public ```x``` field. That's how we have been using fields so far.
* Fields can be **private**, in which case they can only be used inside
the class' own code (there are some other "access modifiers" too, but
don't worry about them for now).
* Methods can be public and private too!

## A tidier Room
The [Room class from our previous example]({{< relref "../refs2/">}})
is just a description of a block of data, with public fields and no methods.
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
You will already have seen a tutorial which includes a tidier Room
class - I'll probably be doing something different here. There are often
several ways to write the same class!

### Adding a constructor

The first step will be adding a **constructor**. This is a special
method which runs when we do ```new Room()```, and it runs
on the freshly [instantiated]({{<relref "../refs/#instantiation">}}) object after default field values are set
but before anything else. 

We can provide parameters, and those go
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

### Making the text private and "read-only"
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
    
    public String getText(){
        return text;
    }
}    
```
I'm not going to write a **setter** because I don't want programmers
to be able to change the text of a room after it's been created. That
could lead to messy code. That means ```text``` is a "read-only" field:
once the room has been created, it can't change.

### Making the connections

Instead of connecting the rooms up directly by writing to the fields
from outside the class, as we have done before, we'll write a getter
and setter for each direction:

```java
    public void setNorth(Room r) {
        north = r;
    }

    public Room getNorth() {
        return north;
    }

    public void setSouth(Room r) {
        south = r;
    }

    public Room getSouth() {
        return south;
    }

    public void setEast(Room r) {
        east = r;
    }

    public Room getEast() {
        return east;
    }

    public void setWest(Room r) {
        west = r;
    }

    public Room getWest() {
        return west;
    }
```

#### Boilerplate
That was tedious! This is a thing you have to get used to in Java:
writing a lot of what's often called
["boilerplate" code](https://en.wikipedia.org/wiki/Boilerplate_code). 
These are bits of code which are very standardised, so that you might
think the computer could work out what they should be, but you have
to put them in anyway.

If you are using IntelliJ you will find it often suggests getters and setters
to add and can add them automatically. These will look a little different from
mine - for example, the setter IntelliJ suggests for ```west``` looks like
this:
```
    public void setWest(Room west) {
        this.west = west;
    }
```
Here, the parameter has the same name as the field. We have to tell Java
that we are assigning to the field by using the special ```this```
reference I mentioned earlier: "I want to write to the ```west``` field
in this object, and not the ```west``` local variable."


We now have getters and setters for the "doors" in our rooms,
but sometimes it might not be possible to go in a particular direction.
Our class will use null references for that case: a reference
which doesn't point to any object. This is the default for references -
if they aren't set to a value, they are null. I talk about null
references [here]({{<relref "../refs2/#nulls">}}). 

It would be good to check whether we can go in a particular direction or not.
We could so something like
```java
if(room.getWest()==null){
    // ... can't go that way
}
```
but that's revealing rather too much about how the connections between rooms work.
It's probably better to provide another method for each direction, to tell us whether that
connection is present:
```java
public boolean hasNorth(){
    // returns true if the "north" connection is not
    // a null reference
    return north!=null;
}
```
We can do this kind of comparison because a null reference is always equal to any other null reference.

{{<spoiler text="Click to show (or hide) what nulls really are">}}
Earlier, you will have seen that all references are just numbers - locations in memory where
data is stored. Null is just a special number which means "this doesn't point anywhere." Usually
it's zero, but not always (and you should never need to know!)
{{</spoiler>}}

We can do this for all the directions:

```java
public boolean hasSouth(){
    return south!=null;
}

public boolean hasWest(){
    return west!=null;
}

public boolean hasEast(){
    return east!=null;
}
```

Finally, we need to make the room references private, and set their initial values. Even though they are going to
be null anyway (an uninitialised reference is always null) it's a good idea to remind ourselves of that fact by
setting them to null by hand:
```java
    private Room north=null;
    private Room south=null;
    private Room east=null;
    private Room west=null;
```

We now have the complete class:
```java
class Room {
    private String text;

    private Room north=null;
    private Room south=null;
    private Room east=null;
    private Room west=null;

    public Room(String t){
        text = t;
    }

    public String getText(){
        return text;
    }

    public void setNorth(Room r) { north = r; }
    public Room getNorth() { return north;}
    public boolean hasNorth() { return north!=null; }

    public void setSouth(Room r) { south = r; }
    public Room getSouth() { return south; }
    public boolean hasSouth() { return south!=null; }

    public void setEast(Room r) { east = r; }
    public Room getEast() { return east; }
    public boolean hasEast() { return east!=null; }

    public void setWest(Room r) { west = r; }
    public Room getWest() { return west; }
    public boolean hasWest() { return west!=null; }
}
```
This is in a **very brief form** with **absolutely no comments at all!**
