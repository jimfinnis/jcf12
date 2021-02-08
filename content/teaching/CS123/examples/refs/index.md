+++
title="References"
summary="What are references?"
date=2021-02-01
weight=2
hidden=false
type="example"
topscripts=["js/quiz.js","js/slides.js"]
+++

## References to objects
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

### The type of a reference  
What is the name of the type of a reference? We need to know this to declare
a reference as a variable, either as a local variable or a field
inside a class. 

The answer is easy: the type is just the name of the class. So if we do
```java
Enemy e;
```
we are declaring ```e``` to be a variable which can hold a reference
to an Enemy object, just like if we do
```java
int x;
```
we are declaring ```x``` to be a variable which can hold an integer.

{{< important >}}
Remember, **we are not saying that ```e``` is an Enemy, we are saying
that ```e``` is a reference to an Enemy**. This is a really important
point.
{{< /important >}}

Quite often experienced programmers look at code like
```Enemy e;```
and say "this means ```e``` is an Enemy," but that's because it takes
too long to say "this means ```e``` is a reference to an object of
class Enemy." We're lazy like that.



## Instantiation

Now that we know how to declare a variable with a reference type,
here's how you would create an Enemy object and store it in such a variable:
```java
Enemy myEnemy = new Enemy();
```
This line of code declares a variable ```myEnemy``` of type ```Enemy```, which
is a reference to an Enemy object. When the line runs, 
``new Enemy()`` does all the following:
* allocates a block of memory big enough to hold the Enemy data as specified
in the class definition;
* fills in default values for all the fields in that
block (unlike local variables, fields don't have to be given values
to before they are used, although you really should);
* runs the *constructor* of the Enemy class on the new object (this is some code
we can write to do additional setup on new objects);
* returns the memory address of the data - this is our **reference**.

The following set of images shows the entire sequence - click to see each one,
and read the caption underneath to see what's changed:
{{<slides "s0">}}
inst1.svg$We have our local variable ```myEnemy```, but it contains nothing yet. 
inst2.svg$```new Enemy()``` has allocated a block of memory large enough to hold our Enemy object, but it contains nothing.
inst3.svg$```new Enemy()``` has initialised the fields to their default values.
inst4.svg$```new Enemy()``` has run the constructor for ```Enemy```, which has done some extra stuff (we'll come to constructors later)
inst5.svg$```new Enemy()``` has returned a reference to the newly created object (3). It has been stored in ```myEnemy```.
{{</slides>}}

### Objects, instances and instantiation
When we use the "new" keyword like this we make a new **object** which
belongs to the class, using the class as a kind of template. This object
is sometimes called an [instance](https://www.thefreedictionary.com/instance)
of that class.

This process is called **instantiation** ("making an instance"),
and what you get back
from "new" is a **reference to an new object of that class**. In
other words, a pointer to a bit of memory containing that object's data.

* A **class** is a blueprint or template for creating objects.
* An **object** is an actual data structure in memory.
* An **instance** of a class is any object which belongs to that class.
* A **field** or **instance variable** is a piece of data which exists inside a particular instance of a class (later on you'll learn about *class variables*, which
belong to the entire class and not any particular object).

All objects "belong" to the class which created them, so "Enemy" is the class,
while the variable "myEnemy" holds a reference to an object of class "Enemy."

{{<spoiler text="Click to show (or hide) another quick quiz">}}
{{<quiz quiz1>}}
{{<postmsggood>}}
Well done!
{{</postmsggood>}}

{{<choice "Enemy">}}
{{<choice "myEnemy">}}
{{<choice "3">}}
{{<choice "8">}}
{{<question answers="1" hint="Remember, the class is the kind of object we are making.">}}
In the code below, what is the name of the class?
```java
Enemy myEnemy = new Enemy();
```
{{</question>}}

{{<choice "myEnemy">}}
{{<choice "int">}}
{{<choice "reference to an Enemy">}}
{{<choice "reference to a String">}}
{{<question answers="3" hint="It is a reference, but it is written as just Enemy">}}
In the code below, what is the type of the variable ```myEnemy```?
```java
Enemy myEnemy = new Enemy();
```
{{</question>}}

{{</quiz>}}
{{</spoiler>}}

## Summing up
* An object of a class is sometimes called an **instance** of that class.
* Using the "new" keyword **instantiates** a new object of a class.
* Objects are referred to by **references**: values
holding the location of an object in memory.

[Next time]({{< relref "../refs2/" >}}) we'll look at how objects
can hold references to other objects - and how we can complex
structures using this idea.
