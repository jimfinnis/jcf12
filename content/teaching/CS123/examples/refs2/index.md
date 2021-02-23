+++
title="References 2"
summary="References inside objects"
date=2021-02-01
weight=3
hidden=false
type="example"
topscripts=["js/quiz.js","js/slides.js"]
+++

{{<important>}}
{{< embed "assets/toptext.md" >}}
{{</important>}}

## Objects can contain references
[Last time]({{< relref "../refs/" >}}) we looked at **references**, which are
variables containing "pointers" to objects. We can also
put these references inside objects. Look at this class definition:
```java
public class Room {
    public String text;
    
    public Room north;
    public Room south;
    public Room east;
    public Room west;
}    
```
{{<important>}}
Note that for now, I have declared all the fields as
public: every single class in your program (and other people's libraries)
can access the data inside Room objects directly. This is usually
**a terrible idea**. I'm doing it here to simplify the code in this example so you
can see exactly what's going on.
{{</important>}}

This class describes
objects which can each link to four other objects of the same class.
It could be part of a text adventure game - imagine
a maze of rooms, each of which connects to four others:

{{< svg src="rooms.svg" title="Part of a maze of rooms linked together" >}}

For example, there will be a Room whose ```text``` is "The Tower", and
whose ```west``` field contains a reference to another Room whose 
```text``` is "The Hall."

What else can we say about the maze?

{{<spoiler text="Click to show (or hide) another quick quiz">}}
{{<quiz quiz1>}}
{{<postmsggood>}}
Well done!
{{</postmsggood>}}

{{<choice "It is undefined" >}}
{{<choice "It is \"The Tower\"" >}}
{{<choice "It is an object whose text is \"The Tower\"" >}}
{{<choice "It is a reference to an object whose text is \"The Tower\"" >}}
{{<choice "The object does not have an \"east\" reference" >}}
{{<question answers="4" hint="Look at the diagram - the text in the boxes is the contents of the the \"text\" field, the arrows show the references">}}
What is the value of the ```east``` reference in the top-left object?
{{</question>}}

{{</quiz>}}
{{</spoiler>}}

### Null references
What is the value of the ```east``` reference in the room whose text is "The Tower"?
What do any of the references hold just after we have created a Room but haven't created any links yet?

When we write our class declaration we can choose to give 
our fields initial values, and when we create an object
it will get those values. Alternatively we can just leave them with default values.
For example:
```java
public class Enemy {
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
Because of this, all references are initialised to a special value called **null**.
This means that the reference doesn't point anywhere at all. Any
attempt to "dereference" it - to follow the reference and access the
object it points to - will cause a Java exception. This is the
dreaded **NullPointerException**, and is a common effect of bugs.
{{</important>}}

Sometimes a null reference is an OK thing; in our class it might
simply mean "you can't go in this direction." But often having a null
reference indicates something has gone wrong, usually that an
object hasn't been created when it should have been.

Luckily we can test for it easily:

```java
if (myReference == null) {
    // the reference is null, do something
} else {
    // the reference isn't null, do something else
}
```

{{<spoiler text="A historical note (click to show/hide)">}}
The inventor of the null reference (or "null pointer" in its original form) is
famous computer scientist [Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare). He now wishes he had never done it:

> I call it my billion-dollar mistake. It was the invention of the null
reference in 1965 [...] I couldn't resist the temptation
to put in a null reference, simply because it was so easy to implement. This
has led to innumerable errors, vulnerabilities, and system crashes, which have
probably caused a billion dollars of pain and damage in the last forty years. {{<cite>}}
Hoare, Tony (2009). "Null References: The Billion Dollar Mistake" (Presentation abstract). QCon London.
{{</cite>}}

In some modern languages (such as Kotlin), null references are not allowed unless
you explicitly say they are. This can make code rather more complex, but avoids bugs in
large projects.
{{</spoiler>}}

## Creating a maze

Let's create a few rooms in a maze. 
The structure I want to create is the one shown below, with just two rooms connected to each
other:

{{< svg src="rooms1.svg" title="Two rooms linked together" >}}

This diagram shows null references as black dots: only these two rooms exist. 
For example, it is not possible to go east from "The Tower," because the ```east``` reference
is null in that Room. 

Let's create that structure - this time I'll write a complete Main class with a 
**main** method - don't worry if you can't quite see how this fits into the idea
of objects and classes ("static" methods are a little bit of a cheat to help us write 
actual code that does things without an needing an object).

Normally I would use a *constructor* to set up the room
name and *setter methods* to manage the connections, but here I'm going to do it by hand so
you can see what's going on - again, this is generally a terrible idea:

```java
public class Main {
    public static void main(String[] args){
        // instantiate two rooms, and assign them to two local
        // variables
        Room hall = new Room();
        Room tower = new Room();

        // Create room links - all other links are null by default
        hall.east = tower;
        tower.west = hall;

        // set up room texts
        hall.text  = "The Hall";
        tower.text = "The Tower";
    }

}
```
What does this look like in a memory diagram? It could get quite complicated, so the little slideshow below will
show how the memory changes after each line of code.
I've changed the diagram notation a little too: 
* Data in memory which is part of an object is green (as before);
* Locations in memory which are local variables have a pink comment (as before);
* Locations in memory which are fields inside an object have a purple background
and white text, and I've also put a "." in front of the name (to make it clear it is a field).

As before, clicking on the image will move onto the next slide. Read the caption below the slide to see what's changed.

{{<slides "s0">}}
inst1.svg$Start of ```main```: local variables ```hall``` and ```tower``` exist but have not been given values.
inst2.svg$```hall = new Room()``` has run - a new Room has been created at location 2, given default field values, and the reference stored in ```hall```.
inst3.svg$```tower = new Room()``` has run - a new Room has been created at location 7, given default field values, and the reference stored in ```tower```.
inst4.svg$```hall.east = tower``` makes the ```east``` reference in ```hall``` refer to the same object as ```tower```
inst5.svg$```tower.west = hall``` makes the ```west``` reference in ```tower``` refer to the same object as ```hall```
{{</slides>}}

Pay careful attention to steps 4 and 5. Let's look at step 4 in more detail - the line of code is 
```java
hall.east = tower;
```
* Remember that the ```tower``` variable is just a number - a location in memory. In our diagram, it has the value 7.
* ```hall.east``` says "the variable you want is the ```east``` field
inside the object pointed to by the ```hall``` reference."
Here, the dot "." **dereferences** the
reference, so we can see the fields inside the object it points to.
* We copy the value of ```tower``` into this variable - the ```east``` variable of the object indicated by ```hall```.
* Now both ```tower``` and ```hall.east``` have the same value, so if you go east from "The Hall", the room you arrive in is the one indicated by ```tower```.


The diagram is now very, very messy, so I'm going to change it step-by-step into something simpler.
Here it is again:
{{< svg src="diag1.svg" title="Memory diagram for two rooms linked together" >}}



First, we don't need to show all the memory in a single column - we can split
that column up into sections for the local variables and the two objects. We
won't changed anything in the computer or in the program, we'll just move
things around in the diagram:

{{< svg src="diag2.svg" title="Memory diagram split into sections" >}}

When Java allocates memory, creates an object and returns a reference, we
don't need to know the numerical value of the reference. The actual location
in memory is just a number, but we don't need to see it printed out or ever
treat it as a number. That means we can remove the address numbers from the
diagram:

{{< svg src="diag3.svg" title="Address numbers removed" >}}

Note that the references are now shown as the starting points of arrows,
pointing at the block of memory (the object) they refer to. We can swap over
the "variable name" section and the contents section, to make it easier to
read:

{{< svg src="diag4.svg" title="Variable name and contexts section swapped over" >}}

One last small change: we might have objects of classes other than Room, so we'll add the class name to each object:

{{< svg src="diag5.svg" title="Class name added" >}}

Here is the same thing as an object diagram, of the kind you have seen before:

{{< figure src="obj.png" title="Object diagram" >}}

## Strings
What about the ```text``` strings? I haven't dealt with those in the diagram above, leaving null references to them.
This is because String
objects are "black boxes" - we don't know their internal structure, so I don't know how big they are. This makes them quite
difficult to draw in a memory diagram
which shows the addresses (such as in the first set of diagrams <a href="#s0">above</a>). Now we aren't showing the memory
addresses, we can draw them:

{{< svg src="diag6.svg" title="Strings shown as objects" >}}

Because I don't know their internal structure I can't draw any fields. All I know is that there is some memory which contains
a representation of some text - so that's what I'm drawing.

Some people might go further, drawing this:

{{< svg src="diag7.svg" title="Strings shown as field data" >}}

This is because although Strings are just objects, and the ```String``` type
is a reference to a String object, our diagrams would become really messy if
we drew them as objects with all the time.




## An end note
You will have noticed that for most of this page I have been very careful about how I refer to objects. I have mostly
called my rooms "the room in the top-right corner of the diagram" or "the room whose text is 'The Tower'" instead of 
referring to the room as "The Tower." 

This is deliberate. The only thing about that particular object that makes it "The Tower" is its text. It's very
easy to get confused between a thing and the name of a thing - or between a thing and a reference to it. In a lot of
ways, the purpose this entire series of pages is to avoid this confusion. **An object is not the same as a reference to an object**,
although experienced coders sometimes talk as if it were.

I will leave the final word to Lewis Carroll:

<blockquote>
  <p>
      &lsquo;You are sad,&rsquo; the Knight said in an anxious tone: &lsquo;let me sing you a song
      to comfort you.&rsquo;
    </p>
    <p>
      &lsquo;Is it very long?&rsquo; Alice asked, for she had heard a good deal of poetry
      that day.
    </p>
    <p>
      &lsquo;It&rsquo;s long,&rsquo; said the Knight, &lsquo;but very, <i>very</i> beautiful. Everybody that
      hears me sing it&mdash;either it brings the <i>tears</i> into their eyes, or else&mdash;&rsquo;
    </p>
    <p>
      &lsquo;Or else what?&rsquo; said Alice, for the Knight had made a sudden pause.
    </p>
    <p>
      &lsquo;Or else it doesn&rsquo;t, you know. The name of the song is called &ldquo;<i>Haddocks&rsquo;
      Eyes</i>.&rdquo;&rsquo;
    </p>
    <p>
      &lsquo;Oh, that&rsquo;s the name of the song, is it?&rsquo; Alice said, trying to feel
      interested.
    </p>
    <p>
      &lsquo;No, you don&rsquo;t understand,&rsquo; the Knight said, looking a little vexed.
      &lsquo;That&rsquo;s what the name is <i>called</i>. The name really <i>is</i> &ldquo;<i>The Aged Aged Man</i>.&rdquo;&rsquo;
    </p>
    <p>
      &lsquo;Then I ought to have said &ldquo;That&rsquo;s what the <i>song</i> is called&rdquo;?&rsquo; Alice
      corrected herself.
    </p>
    <p>
      &lsquo;No, you oughtn&rsquo;t: that&rsquo;s quite another thing! The <i>song</i> is called &ldquo;<i>Ways
      and Means</i>&rdquo;: but that&rsquo;s only what it&rsquo;s <i>called</i>, you know!&rsquo;
    </p>
    <p>
      &lsquo;Well, what <i>is</i> the song, then?&rsquo; said Alice, who was by this time
      completely bewildered.
    </p>
    <p>
      &lsquo;I was coming to that,&rsquo; the Knight said. &lsquo;The song really <i>is</i> &ldquo;<i>A-sitting On
      A Gate</i>&rdquo;: and the tune&rsquo;s my own invention.&rsquo;
    </p>
</blockquote>

{{<spoiler text="Click to show (or hide) another quick quiz, just for fun">}}
{{<quiz quiz2>}}
{{<postmsggood>}}
Well done!
{{</postmsggood>}}

{{<choice "Haddock's Eyes" >}}
{{<choice "The Aged Aged Man" >}}
{{<choice "Ways and Means" >}}
{{<choice "A-sitting on a Gate" >}}
{{<question answers="1" hint="Read carefully!">}}
What is the name of the song called?
{{</question>}}

{{<choice "Haddock's Eyes" >}}
{{<choice "A-sitting on a Gate" >}}
{{<choice "Ways and Means" >}}
{{<choice "The Aged Aged Man" >}}
{{<question answers="4" hint="Read carefully!">}}
What is the name of the song?
{{</question>}}

{{<choice "A-sitting on a Gate" >}}
{{<choice "Haddock's Eyes" >}}
{{<choice "Ways and Means" >}}
{{<choice "The Aged Aged Man" >}}
{{<question answers="3" hint="Read carefully!">}}
What is the song called?
{{</question>}}

{{<choice "Haddock's Eyes" >}}
{{<choice "A-sitting on a Gate" >}}
{{<choice "Ways and Means" >}}
{{<choice "The Aged Aged Man" >}}
{{<question answers="2" hint="Read carefully!">}}
What is the song?
{{</question>}}

{{</quiz>}}
{{</spoiler>}}

We spend a lot of time in computer science thinking about things, and things which refer to them, and this
piece from *Through the Looking-glass* neatly illustrates the kind of mess you can find yourself in.


The [next page]({{< relref "../refsquiz/" >}}) has a handy quiz that will help you see understand some of the common
mistakes that references can lead to.
