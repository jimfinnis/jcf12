+++
title="What are objects and classes?"
summary="What are objects? What problems do they solve? How are classes and objects related?"
date=2021-01-19
weight=1
hidden=true
type="example"
+++

{{< todo >}}
Quizzes / try-yourself counter examples
{{< /todo >}}
    
## What's the problem?
Remember that all computer programs are **descriptions of data** and
**operations on data**.
The main aim of object oriented
code is to make it easier to organise your data and operations.
In fact, the first part of OO is recognising that descriptions of data
and the code to work on that data generally belong together.

In this page I'm going to talk about what objects and classes really are, but
before I get to that, I'm going to talk about data structures - blocks of data
in memory. 

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
and so on, but that would be very difficult to work with. What happens if
the number of enemies changes? What happens if
there are hundreds of enemies? 

Also, it would be very useful for organising our code if we could
call a function and pass all the enemy data
as single argument, like this:
```java
updateEnemy(anEnemy);
```
and that would be very difficult here. We might be able to do something using separate arrays for
each variable (x,y and so on) but that gets messy too.

### The solution in C (from CS12020)
I'm going to talk about how we might deal with this in C before I
look at Java, partly because Java is descended from C.

It would be good if we could **bundle together all the variables that
describe an enemy**.
You may have already learned that C provides a way of doing this:
the **struct**. Here's what our Enemy would look like:
```c
struct Enemy {
    int x,y;
    float hp;
    int ammo;
};
```
This code describes what the data for an enemy should look like, how it should
be structured. That's why we call it a "data structure."
We can then define an array of enemies:
```c
struct Enemy enemies[16];
```
We can then refer to all the data for Enemy Zero as 
```enemies[0]```, and we can look at individual *fields* (data elements) inside that
enemy: for example, the hit points for this enemy will be
```enemies[0].hp```.

### Objects and classes
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
that the fields
can be seen by code outside the class itself. We'll see why that's
necessary later on.

We often call the fields *instance variables* in classes, and we'll
see why later.

A **class** is a description of a data structure and operations on it (the things
it can do). We'll talk about the operations later. An **object** is some data
made from that description. 

It can be helpful to think about what is actually going on inside the
computer, so here's an example of what this might look like inside the
computer's memory while the program is running. On the left we have the memory
locations, each of which has a number: its "address." 

Each memory location contains
a value - most of these we don't care about, so they are not shown. Four of
them - starting at location 3 - are reserved for our object, and describe an
Enemy at location x=0, y=0 with 0.5 hit points and 15 ammo. These are just
numbers in memory, but the class definition in our program gives each
location a meaning.


{{< svg src="struct1.svg" title="an Enemy object in memory" >}}

Of course, a real computer has a lot more than 11 memory locations!

## Summing up
* A **class** is a description of the structure of a block of data in memory
(there's a bit more, but we'll come to that). Think of a class as a sort of template
for data, but no actual data: it describes what data will be in the
objects and what type each data element (instance variable) has.
You define a class in Java with the "class" keyword.
* An **object** is the actual data in memory. Each object belongs to
a particular class, and the class describes what the raw
data in the object's memory "means."
* Each class can have many objects, but each object belongs to only
one class.

[Next]({{< relref "../refs/" >}}) we'll look at **references**,
which are how objects can link to and even "contain" other objects.


[^1]: Most of my examples are from games. There are two reasons
for this. Firstly, it's easy to think about things in games
because they are often virtual versions of real objects: people,
weapons, buildings and so on. Secondly, I spent 25 years in the 
games industry, so it's natural this is where my examples would
come from!