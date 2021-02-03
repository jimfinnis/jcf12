+++
title="References"
summary="What are references?"
date=2021-02-01
weight=2
hidden=true
type="example"
+++

{{< todo >}}
Quizzes / try-yourself counter examples
{{< /todo >}}


## References are pointers
[Last time]({{< relref "../whatAreObjects/" >}}) we looked at **objects**, which are
blocks of data in memory, and **classes**, which describe the structure
of those blocks.

Look at this example, in which our object occupies four memory locations
starting at address 3:

{{< svg src="struct1.svg" title="an Enemy object in memory" >}}

Variables are really just named memory locations - and Java has a rule about them:
a variable can only be one memory location in length. **So how can we store an object
in a variable?**

We want to put our data structures into single variables so we can manipulate them
conveniently - for example passing them into and out of functions -
but we can't do that because the
structures are too big. 
Instead, we can store the **location** of our data structure in a variable.
Let's create a variable ```myEnemy``` to hold this location:

{{< svg src="struct2.svg" title="Object in memory referenced by a variable" >}}

The ```myEnemy``` variable is really just a number, but that number is 
a memory location that holds our Enemy data. Here, ```myEnemy``` is a
**reference**. You may remember this from CS12020 with Andy Starr that
a similar concept in C is called a "pointer."

{{< todo >}}
Check over the basic information below.
{{< /todo >}}

What is the name of the type of a reference? We need to know this to declare
a reference. It's just the name of the class. So if we do
```java
Enemy e;
```
we are declaring ```e``` to be a variable which can hold a reference
to an Enemy object, just like if we do
```
int x;
```
we are declaring ```x``` to be a variable which can hold an integer.

{{< important >}}
Remember, **we are not saying that ```e``` is an Enemy, we are saying
that ```e``` is a reference to an enemy**. This is a really important
point.
{{< /important >}}

Quite often in programming
experienced programmers look at code like
```Enemy e;```
and say "this means ```e``` is an Enemy," but that's because it takes
too long to say "this means ```e``` is a reference to an object of
class Enemy." We're lazy like that.



## Back to Java: instantiation

Here's how you would create an Enemy:
```
Enemy myEnemy = new Enemy();
```
This line of code will:
* allocate a block of memory big enough to hold the Enemy data, as specified
in the class definition;
* fill in default values for all the fields (instance variables) in that
block;
* return the memory address of the data - this is our **reference**;
* store the reference in the ```myEnemy``` variable.

### Objects, instances and instantiation
When we use the "new" keyword like this we make a new **object** which
belongs to the class, using the class as a kind of template. This object
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
while the variable "myEnemy" holds a reference to an object of class "Enemy."

* An object of a class is sometimes called an **instance** of that class.
* Using the "new" keyword **instantiates** a new object of a class.
* Objects are referred to by **references**: values
holding the location of an object in memory.
