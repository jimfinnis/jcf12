+++
title="References 2"
summary="References inside objects"
date=2021-02-01
weight=3
hidden=true
type="example"
topscripts=["js/quiz.js","js/slides.js"]
+++


## Objects can contain references
[Last time]({{< relref "../refs/" >}}) we looked at **references**, which are
how we can store "pointers" to objects in variables. We can also
put these references inside objects. Look at this class definition:
```java
class Room {
    public String text;
    
    public Room north;
    public Room south;
    public Room east;
    public Room west;
}    
```
Note that for now, I have declared all the instance variables as
public: every single class in your program (and other people's libraries)
can access the data inside Room objects directly. This is, in general,
not a good idea. I'm doing it here to simplify the code.

This class describes
objects which can each link to four other objects of the same class.
It could be part of a text adventure game - imagine
a maze of rooms, each of which connects to four others:

{{< svg src="rooms.svg" title="Part of a maze of rooms linked together" >}}


But when we initially create a Room what do those references hold?

### Null references
When we write our class declaration we can choose to give 
our instance variables initial values, and when we create an object
it will get those values. Alternatively we can just leave them with default values.
For example:
```java
class Enemy {
    public int x;           // new objects will have default value 0
    public int y;           // again, default value 0
    public float hp=100.0   // objects will start with hp=100.0
    public int ammo=50;     // and 50 ammunition
}
```

**It's a good idea to set an initial value when you can.** But this doesn't make
sense for objects some of the time - we might not have an object to refer to
yet! This is certainly true in our Room class when we create the first
Room in the maze.

{{<important>}}
All references are initialised to a special value called **null**.
This means that the reference doesn't point anywhere at all. Any
attempt to "dereference" it - to follow the reference and access the
object it points to - will cause a Java exception. This is the
dreaded **NullPointerException**, and is a common effect of bugs.
{{</important>}}

Sometimes a null reference is an OK thing; in our class it might
simply mean "you can't go in this direction." Luckily we can test
for it:
```java
if (myReference == null) {
    // the reference is null, do something
} else {
    // the reference isn't null, do something else
}
```
