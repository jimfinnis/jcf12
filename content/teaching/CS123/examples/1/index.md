+++
title = "The Puzzle and the Solver"  # Add a page title.
summary = "An example from an old assignment"  # Add a page description.
date=2020-12-14  # Add today's date.
categories = ["example123"]
type = "example"
+++

## Introduction
I've taken this example from an old assignment for CS21120, where
students were asked to write a class to solve a puzzle by writing two
classes:
* **Puzzle** is the puzzle itself - the students were given an interface
called *IPuzzle*
and *Puzzle* had to implement that interface, which described some methods
for changing the puzzle data and making sure it was valid. 
* **Solver** is the part of the program that solves the puzzle. Again,
students had to make sure this implemented an interface: *ISolver*. This
was designed in a slightly odd way. Students were asked to write two
methods:
    * **public void solve()** solves whatever puzzle the Solver has been
    created with,
    * **public Solver(IPuzzle p)** is the constructor.

Put simply,
* the program will create a puzzle
* the program will then create a solver, telling it which puzzle to solve.
* the program will tell the solver to solve its puzzle.
    
This is a slightly odd arrangement, but there were good reasons for doing
it like this: firstly, I wanted the puzzle code and the solver code to
be separate tasks. The way the solver works shouldn't depend on details of
how the puzzle works. Everything the solver does with the puzzle it must
do through the *IPuzzle* interface. Secondly, *solve()* is a recursive
method - it calls itself - and can do so quite deeply. I don't want
to pass arguments I don't need to.

