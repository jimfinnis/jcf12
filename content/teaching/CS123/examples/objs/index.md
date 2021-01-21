+++
title="Objects - the basics"
summary="What are objects? What problems do they solve? How are classes and objects related?"
date=2021-01-19
weight=-1
#hidden=true
type="example"
+++

    
## What's the problem?
The point of object oriented
code is to make it easier to organise your data (and the operations on
them, but I'll come to that later).
Before I get to objects and classes, I'm going to talk about data
structures - blocks of data in memory. 

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
and so on, but that would be very difficult to work with. And what 
happens if
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
variables. 

More importantly, we might want to call a function and pass all the enemy data
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
```enemies[0].hp```.

Even better, we can use **pointers** to pass
an entire block of data about an enemy into a function.

### References and pointers
Java has a rule about variables: any variable can only occupy one memory location.
Our "data structure" takes up four. A picture of the computer's memory
might look like this, with the memory address on the left, and the contents of that
address on the right:

{{< svg src="struct1.svg" title="Data structure for an Enemy" >}}

Here, the Enemy structure starts at the memory location 3. 
Of course, a real computer has a lot more than 11 memory locations!

We want to put our data structures into variables, so we can pass them
into functions more conveniently, but we can't do that because the
structures are too big. 
Instead, we can **store the location of our data structure in memory**.
Let's create a variable ```enemy``` to hold this address:

{{< svg src="struct2.svg" title="Data structure for an Enemy" >}}

The ```enemy``` variable is really just a number, but that number is 
a memory location that holds our Enemy data. Here, Enemy is a
**pointer** (you may remember this from CS12020 with Andy Starr).
In the Java world we call this a **reference**.

## Back to Java: instantiation
Here is how we would define our data structure in Java:
```java
class Enemy {
    public int x,y;
    public float hp;
    public int ammo;
}
```
It's nearly the same: here it's called a **class** and there are
"public" keywords before each field. These simply tell the compiler
that the fields (we call often them *instance variables* in classes)
can be seen by code outside the class itself. We'll see why that's
necessary later on.

But apart from those differences, this is exactly the same as a C struct.
Here's how you would create an Enemy:
```
Enemy enemy = new Enemy();
```
This will:
* allocate a block of memory big enough to hold the Enemy data, as specified
in the class definition;
* fill in default values for all the fields (instance variables) in that
block;
* return the memory address of the data - this is our **reference**;
* store the reference in the "enemy" variable.

### Objects, instances and instantiation
When we use the "new" keyword like this we make a new **object** of
the class, using the class as a kind of template. This object
is sometimes called an **instance** of that class.

This process is called **instantiation** ("making an instance"),
and what you get back
from "new" is a **reference to an new object of that class**. In
other words, a pointer to a bit of memory containing that object's data.

When we use the name of the class ("Enemy") as the type of a variable,
it means the variable is a reference to memory laid out according to
that class definition.

* A **class** is a blueprint or template for creating objects.
* An **object** is an actual data structure in memory.
* An **instance** of a class is any object which belongs to that class.

All objects "belong" to the class which created them, so "Enemy" is the class,
while the variable "enemy" holds a reference to an object of class "Enemy."

## Summing up
That's a lot of information, so let's sum up:
* A **class** is a description of some data in memory (there's a bit more, but we'll come to that).
You define a class in Java with the "class" keyword.
* An **object** is the actual data in memory - an object is a member of
a particular class.
* An object of a class is sometimes called an **instance** of that class.
* Using the "new" keyword **instantiates** a new object of a class.
* Objects are referred to by **references**: values
holding the location of an object in memory.


[^1]: Most of my examples are from games. There are two reasons
for this. Firstly, it's easy to think about things in games
because they are often virtual versions of real objects: people,
weapons, buildings and so on. Secondly, I spent 25 years in the 
games industry, so it's natural this is where my examples would
come from!
