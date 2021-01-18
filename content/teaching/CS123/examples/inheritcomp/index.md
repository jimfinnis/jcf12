+++
title = "Favour composition over inheritance"
summary = "Use 'has a' instead of 'is a' relationships"
date=2020-12-14  # Add today's date.
weight = 80
categories = ["example123"]
type = "example"
+++

## Introduction

**"Favouring composition over inheritance"** is something you may have heard
about or seen on the web as a principle for object-oriented programming,
but what does it mean?

There are two basic relationships two classes can have.
In **inheritance**, one class is a subclass of another. This is often
described as an **is-a** relationship, where one thing is a particular
kind of other thing:
* a Dog is a Mammal
* a Manager is an Employee
* a PushButton (in a user interface) is a Widget
* a List is a Collection

The other relationship is **composition**, where objects of one class 
contain objects of another class. This is often called a **has-a** relationship:
* a Dog has a Head and four Legs
* a Manager has a PayrollID
* a Window (in a user interface) has a collection of Widgets
* a List has Elements

In general, we should use the second kind of relationship in our programs,
even when it might feel more natural to use inheritance. Some programming
languages (like Go) don't allow inheritance at all.

## Why is it a good idea?
Firstly, it can be easier once you get used to it, particularly
for larger projects. Building a "family
tree" of classes with inheritance involves finding common properties and
behaviours they all have, and this can be difficult. It can be tempting
to try to put things into the tree which don't really belong there,
and you can find yourself with a mess.

Secondly, you get more flexible code which is easier to reuse because the
links between objects are much "looser."  An important rule in
software engineering is **loose coupling and tight cohesion**: each 
part of the code should have as few connections to other part as possible,
and each part should do easily defined task.
You often find the systems you
build this way are more powerful and easier to work with. We'll
see an example of this later on.

## But how does polymorphism work?
Remember that **polymorphism** is the idea that one class (say Collection)
can represent all its subclasses (Set, Queue, List, ArrayList, PriorityQueue and so on).
Code which uses a Collection can use any of those subclasses instead.

How can this work if we don't use inheritance? 

The answer is that while we avoid inheritance of classes, we can still
use **interfaces**. Writing an interface is a lot like creating
a class, except that the methods we write don't have 
any actual "body code" (code which does stuff) in the interface definition.
Instead of writing a subclass, we **implement** the interface: we write
a class which has all the methods described in the interface.

## An example

### With inheritance

Let's try a simple example. Imagine we are writing a game which has a player
and some monsters. The monsters behave in different ways, but have some things
in common with the player. One particular kind of monster is a "guard." We might write something
like this using inheritance:

{{< figure src="umlgameinher.png" title="Game design with inheritance" >}}

At the root of this tree we have the Entity class, which is anything 
in the game which can move around.  This class has three methods which the
subclasses can override to change the behaviour:
* **move** to move the object,
* **makeNoise** to make some kind of random noise at intervals,
* **render** to draw it.

Entity will have some kind of default behaviour
for each method - for example, *makeNoise* might not do anything. In this
case, Player doesn't override it, so the Player doesn't make any noise.

There are probably going to be lots of other methods (and instance variables too), but this is just
an outline.


Each subclass changes the behaviour in different ways. For example, *move* will be very different for Player than for Monster:
the Player code will read the input and move the object, while the Monster
code might automatically move the object towards the Player.

Let's imagine that *move* for GuardFast
has special code allowing that monster to move very quickly. Let's also
imagine that *makeNoise* and *render* for GuardStealth make that monster
hard to see and hear.

#### A problem
Let's also imagine that we've designed this system and got it all working,
when our manager asks us to make a new kind of monster: a fast,
silent guard. It's going to be very difficult, because we need a class which
is a subclass of Guard, but has the *move* of GuardFast and the *makeNoise*
and *render* of GuardSilent. We're going to have to do some ugly things
to get this to work.

Let's try rewriting the entire system, this time using composition and
no inheritance.

### With composition

With composition our Entity contains different objects, each
of which controls a different aspect of its behaviour. We'll combine
sound and visuals into a single concept for convenience, so Entity needs:
* A **Mover** to move the object around and give it a location in the world,
* an **Appearance** to draw the object and make sounds.

We'll design these as **interfaces**, and then create classes which implement
the Mover and Appearance interfaces in different ways. The Mover interface
will specify that there must be a *move* method to move an entity,
and Appearance will specify  *render* and *makeNoise* methods.

Now we can think about the classes which will implement the Mover and
Appearance interfaces. Movers first:
* **PlayerMover** will make any entity it is attached to move like a player -
that is, it will be controlled by the mouse and keyboard;
* **GuardMover** will make the entity behave like guard monster - it will
move using AI to hunt the player (you'll learn how to write this sort of 
pathfinding and obstacle avoidance AI in later modules!);
* **GuardFastMover** will behave similarly, but faster.

Now Appearances:
* **PlayerAppearance** will make it look and sound like a player,
* **GuardAppearance** will make it look at sound like a guard,
* **GuardStealthAppearance** will be similar, but much harder to see and hear.

For convenience, we're going to create a two-way link:
* Each Mover and Appearance will store the entity
it works with. To do this, we will pass the Entity into the Mover and
Appearance constructors. This means that Movers and Appearances can contain
unique data about the Entity they are attached to, which can be every useful.
* Each Entity will store the Mover and Appearance it is using. We will
do this using setter methods.

This leads us to something like this:

{{< figure src="umlgamecomp.png" title="Game design with composition (click to zoom)" >}}

Also note that there should also be relationships going from each behaviour class
to Entity, since they each keep a reference to the Entity they control,
but that makes the UML very messy!

{{< figure src="umlgamecomp2.png" title="Above with ALL relationships" >}}

### Code for composition example

Let's write the two interfaces - they're very simple:

```java
public interface Appearance {
    public void render();
    public void makeNoise();
}
```

```java
public interface Mover {
    public void move();
}
```

The method declarations don't have
any actual "bodies" (code in curly brackets that does things), because
(as with all interfaces) they just say which methods should be contained
in any class which implements them. 

Now we can write the Entity class:

```java
public class Entity {
    private Mover mover;
    private Appearance appearance;

    // constructor which initialises the entity's mover and appearance to null.
    // By default, entities do not move, they are invisible,
    // and make no noise.
    
    public Entity(){
        mover = null;
        appearance = null;
    }

    // set the Mover of an entity. Returns the entity itself for 
    // "fluent" programming.
    public Entity setMover(Mover m){
        mover = m;
        return this;
    }

    // set the Appearance of an entity. Returns the entity itself
    // for "fluent" programming.
    public Entity setAppearance(Appearance a){
        appearance = a;
        return this;
    }

    // move the entity by calling its Mover (if it has one!)
    public void move(){
        if(mover != null) {
            mover.move();
        }
    }

    // draw the entity by calling its Appearance's render (if it has one!)
    public void render(){
        if(appearance != null) {
            appearance.render();
        }
    }

    // make sound by calling the entity's Appearance's makeNoise
    public void makeNoise(){
        if(appearance!=null) {
            appearance.makeNoise();
        }
    }
}
```
In this class, there are two private instance variables - the Mover and Appearance
used by each entity. There's a constructor which sets up those two
variables, and then the actual methods for moving, drawing and
making noises.

All these methods do is **forward** the
operation to the Mover or Appearance: for example *move* just tells the
connected Mover to do its *move*.

You may have noticed that *setMover* and *setAppearance* both return
the entity itself ("return this"). That may seem a little strange,
but it allows a useful trick I'll explain later.

Here is an example Mover - in this case it's the PlayerMover:
```java
public class PlayerMover implements Mover {
    // the entity to which mover should move
    private Entity entity;

    // set up the mover, taking the entity we should
    // be moving
    public PlayerMover(Entity e){
        entity = e;
    }

    // this is the implementation of Mover.move(), which
    // moves the entity
    @Override
    public void move() {
        // ... code that moves the entity based on mouse
        // and keyboard, because this is a PlayerMover
    }
}
```

And here is the PlayerAppearance. In both cases I've left the methods
empty - the actual code would probably be quite complicated and depend
on the graphics engine we were using:

```java
public class PlayerAppearance implements Appearance {
    // the entity for which this class controls the appearance
    // and sound, making it look/sound like a player.
    private Entity entity;

    // set up the appearance, taking the entity whose appearance
    // this class should control
    public PlayerAppearance(Entity e){
        entity = e;
    }

    @Override
    public void render() {
        // code that draws the entity as a player
    }

    @Override
    public void makeNoise() {
        // this will probably stay empty unless you
        // want the player to make a noise
    }
}
```

#### Making some entities

Now we can start to create some entities which behave the same
as the classes we had in the inheritance-based system. Here, for
example, is how we would create an Entity which behaves like a Player:
```java
        // create an entity. After this, it's invisible,
        // inaudible and has no location!
        Entity player = new Entity();

        // make the entity move like a player by creating
        // a PlayerMover and setting it into the entity.
        Mover m = new PlayerMover(player);
        player.setMover(m);

        // make it look and sound like a player in a similar
        // way
        Appearance a = new PlayerAppearance(player);
        player.setAppearance(a);
```
Note how the two-way link between the player and its "behaviour objects"
is set up:
* we create the Mover and the Appearance, passing 
a reference to the player entity into their constructors.
* The Mover and Appearance each store that
reference in a private instance variable.
* Once created, references to
the Mover and Appearance are set inside the player entity.

Now for that trick I mentioned earlier. Because *setMover* and
*setAppearance* return *this*, I can do this:
```java
        Entity player = new Entity();
        Mover m = new PlayerMover(player);
        Appearance a = new PlayerAppearance(player);
        
        // "fluent" trick: because setMover returns this,
        // I can "chain" a method call to setAppearance:
        
        player.setMover(m).setAppearance(a);
```
That's quite nice, and easy to read. This is sometimes called
[**fluent** programming](https://en.wikipedia.org/wiki/Fluent_interface),
and you may find examples of it in your own reading.

Now we've created a player, we can create a guard in a similar way:

```java
        Entity m = new Entity();
        m.setAppearance(new GuardAppearance(m))
            .setMover(new GuardMover(m)); 
```
This code is a lot shorter than the previous code because I'm not
bothering to assign the Appearance and Model to variables before passing
them into the *set* methods. It's exactly the same idea, though.

You can see how we can combine Appearance and Model methods to build
all the different behaviours the interitance example had - but now we can
also easily make a "fast, stealthy guard":

```java
        Entity m = new Entity();
        m.setAppearance(new GuardStealthAppearance(m))
            .setMover(new GuardFastMover(m)); 
```
We can even create a fast guard that looks like the player:
```java
        Entity m = new Entity();
        m.setAppearance(new PlayerAppearance(m))
            .setMover(new GuardFastMover(m)); 
```
In fact, we can combine any Mover with any Appearance to make many
more combinations without having to create a new subclass for each
one - everything is just an Entity, but the objects linked to it
control how it behaves.

There's another advantage: we can **change an Entity's behaviour
while the program is running**. If we want a guard to suddenly turn
stealthy, we just need to replace its Appearance with a
GuardStealthAppearance. We can't do this this in the inheritance
solution.

#### Possible refactoring?
When we create an Entity we have to do several things in the right
order:
* Create the Entity itself
* Create its Mover and Appearance, remembering to pass the Entity
into the constructors (so they are able to link back to their Entity)
* Link the Entity to its Mover and Appearance

That's a lot to remember, and it's possible to forget to do some of it.
How can we limit the "cognitive load?"
* We have to create the entity, we can't avoid that
* We have to create the Mover and Appearance

But it might be possible to let the Mover and Appearance link the 
Entity in their constructors. Look at this alternative version of
PlayerMover:
```java
public class PlayerMover implements Mover {
    // the entity to which mover should move
    private Entity entity;

    // set up the mover, taking the entity we should
    // be moving
    public PlayerMover(Entity e){
        entity = e;
        // link the entity to me
        e.setMover(this);
    }

    // this is the implementation of Mover.move(), which
    // moves the entity
    @Override
    public void move() {
        // ... code that moves the entity based on mouse
        // and keyboard, because this is a PlayerMover
    }
}
```
This calls *setMover* inside the constructor, linking the Entity
to the Mover itself. If we did a similar thing inside PlayerAppearance
we could create a Player with:
```java
Entity player = new Entity();
// create the mover to make it move like a player;
// will automatically create the required links between
// objects
new PlayerMover(player);
// similarly create the player appearance
new PlayerAppearance(player);
```
This is good, there's less to remember.

But I'm **not going to do it**. Why?

**Because it looks really strange.** You have two "bare constructors" that
are just creating objects with no indication of how they are used. The
objects they make aren't even assigned to variables. Instead, code inside
the constructors is assigning them to instance variables inside the Entity.
When a new user comes to read the above code they might
be very confused.

Also, because we might use *setMover* or *setAppearance* to change the behaviour
while the program is running, it seems natural to me that we should
use the same kind of code - with obvious calls to those methods - 
when we create the entity.

However, I'm not going to say that it's the wrong thing to do. A lot of
software engineering is about finding a balance: here, a balance between
how "obvious" the code is about what it is doing, and how brief the code is.

## Conclusion

I hope you can see that favouring composition over inheritance is
a powerful way to get a lot of flexibility into your code, although
it does need you to think about your design in a very different way!
For example, in the system I've described above
it doesn't seem as natural to think about
"behaviours" (our Mover and Appearance interfaces) as "things", which
is how we usually think about objects and classes.

Remember, always try to think in terms of **things having things**
rather than **things being kinds of things**, even if it means some
of the "things" have to be rather abstract.

Also, sometimes it's still better to use inheritance: there are some
disadvantages of using composition. The code is often more complex
and there are a large number of *forwarding methods* - methods whose
only job is to call a method inside another object (look at the code
for Entity, for example).

Finally, this is exactly how the Unity and Unreal game
engines work. Actually, Unity takes it quite a lot further.

