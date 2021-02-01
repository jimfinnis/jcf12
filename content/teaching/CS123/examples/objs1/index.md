+++
title="Objects and methods"
summary="How are classes different from structs?"
date=2021-01-19
weight=1
hidden=true
type="example"
+++

[Last time]({{< relref "../objs/" >}}) we looked at **objects**, which are
blocks of data in memory, and **classes**, which describe how those blocks
are made up.

This description applies to C's structs too, but classes and objects have some
extra features. The most important is that **classes can contain code that
does stuff**.

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
    
    public void moveBy(int dx,int dy){
        x = x+dx;
        y = y+dy;
    }
}
```
The first thing to realise is that while methods look a lot like
functions, they can't be used the same way.
Instead, you must
call a method on a particular object. This is what that might look like:
```java
Enemy e = new Enemy();
e.moveBy(0,1);
```
Here, we are creating an Enemy and storing a reference to it in ```e```.
We then call the method ```moveBy``` on the object referred to by
that reference. We know that method exists, because it's defined in
the Enemy class and ```e``` is a member of that class.

We can't use a method like a function because methods get access to all the
instance variables of the object on which they were called just as if they
were local variables. Look again at the example above, in the body
of the method:
```java
x = x+dx;
y = y+dy;
```
The method accesses the instance variables ```x``` and ```y``` 
belonging to the instance on which ```moveBy``` was called.


### How does method calling work?
To understand this,  

TODO
