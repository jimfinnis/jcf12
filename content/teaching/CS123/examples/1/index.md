+++
title = "The Puzzle and the Solver"  # Add a page title.
summary = "An example from an old assignment"  # Add a page description.
date=2020-12-14  # Add today's date.
categories = ["example123"]
type = "example"
+++

## Introduction
I've taken this example from an old assignment for CS21120, where
students were asked to to solve a number grid puzzle by
writing two classes: **Grid** and **Solver**. I gave them two interfaces,
**IGrid** and **ISolver**, which they must make these classes implement.
Their main program
* must create a grid
* must then create a solver, telling it which grid to solve.
* must tell the solver to solve its grid.

The important features of the Solver class are:
* The solver class constructor takes a Grid, telling it which grid to
solve: `Solver(IGrid g){...}`. Note that it takes IGrid, not Grid.
That's important because I might want to solve different implementations
of IGrid in the same test program (different grids which conform to the
same interface).
* To actually solve the grid it's been given in the constructor, you
call the **solve()** method which takes no arguments. 

Here's what a Main class using these classes might look like:

{{< highlight java >}}
class Main {
    public static void main(String args[]){
        // create a grid
        IGrid grid = new Grid(); 

        // add commands to set up the grid here

        // create a solver, tell it which grid to solve
        Solver solver = new Solver(grid);
        
        // and solve the grid!
        solver.solve();
    }
}
{{< / highlight >}}

This is a slightly odd arrangement, but there were good reasons for doing it
like this: firstly, I wanted the grid code and the solver code to be separate
tasks. The way the solver works shouldn't depend on details of how the puzzle
works. Everything the solver does with the puzzle it must do through the
IGrid interface. This means that I can easily test their Grid code without
the Solver, and the Solver code without the Grid (by using my own Solver).

Secondly, I didn't want *solve()* to have any arguments. It's a recursive
method - it calls itself - and can do so quite deeply. I don't want
to pass arguments I don't need to, they slow the code down and use up
memory.

Quite a few people had trouble writing these classes because of how
they manipulate objects. 
        
