+++
title="Objects - the basics"
summary="What are objects? What problems do they solve? How are classes and objects related?"
date=2021-01-19
weight=-1
#hidden=true
+++

    
## What's the problem?
Before I get to objects and classes, I'm going to talk about data
structures - blocks of data in memory. The point of object oriented
code is to make it easier to organise your data (and the operations on
them, but I'll come to that later).

Imagine that you are writing a game[^1] - let's say it's a very
simple 2D game, with a player and some enemies. Each enemy has
a gun with some ammunition and some "hit points" defining how
much damage they can take before they die. So we might define
the following variables for each enemy:
* **int x** : an integer giving the X coordinate of the enemy's location in the world
(we assume it's some kind of grid),
* **int y** : an integer giving the Y coordinate of the enemy's location
(we assume it's some kind of grid),
* **float hp** : how many hit points the enemy has remaining (I'm just
making it a floating point value to demonstrate that they don't all
have to be the same type!)
* **int ammo** : how much ammunition the enemy has.

We can set this up fairly easy in Java:
```java
int x,y;
float hp;
int ammo;
```
but this only works for one enemy. How could we set it up for (say)
16 enemies? We could create 16 sets of these variables:
```java
int x1,y1;
float hp1;
int ammo1;

int x2,y2;
float hp2;
int ammo2;

int x3,y3;
float hp3;
int ammo3;
```
and so on, but that would be very difficult to work with! And what if
there are hundreds of enemies?

We could try to solve it using **arrays** (at least, this is how
we would do it in C - Java arrays are a bit different):
```
int x[16],y[16];
float hp[16];
int ammo[16];
```
Instead of each variable storing a single value, it now stores one value for
each enemy. Remember how arrays work: ```hp``` is now a block of 16 integers
and we can (for example) get Enemy Zero's hit points with ```hp[0]```. This is
workable, but still horrible - we have to make sure all the array sizes are
the same, and it's difficult to manage data which is spread across lots of
variables. We might want to call a function and pass all the enemy data
as an argument, and that would be very difficult here.

### The solution in C (from CS12020)
I'm going to talk about how we might deal with this in C before I
look at Java, partly because Java is descended from C.

It would be good if we could bundle together all the variables that
describe an enemy so that we could pass them in a single block.
You may have already learned that C provides a way of doing this:
the **struct**. Here's what our Enemy would look like:
```c
struct Enemy {
    int x,y;
    float hp;
    int ammo;
};
```
We can then define an array of enemies:
```c
struct Enemy enemies[16];
```
We can then refer to all the variables for Enemy Zero again as 
```enemies[0]```. For example, the hit points for this enemy will be
```enemies[0].hp```. More importantly, we can use **pointers** to pass
an entire block of data about an enemy into a function.

### References and pointers
Java has a rule about variables: any variable can only occupy one memory location.
Our "data structure" takes up four. A picture of the computer's memory
might look like this, with the memory address on the left, and the contents of that
address on the right:

{{< svg src="struct1.svg" title="Data structure for an Enemy" >}}

Of course, a real computer has a lot more than 11 memory locations!

We want to put our data structures into variables, so we can pass them
into functions more conveniently, but we can't do that because the
structures are too big. 

Instead, we can store the location of our data structure in memory:





We'll now return to Java. C has pointers, Java has references, but essentially
they are the same thing: the location of some data in memory. 


[^1]: Most of my examples are from games. There are two reasons
for this. Firstly, it's easy to think about things in games
because they are often virtual versions of real objects: people,
weapons, buildings and so on. Secondly, I spent 25 years in the 
games industry, so it's natural this is where my examples would
come from!
