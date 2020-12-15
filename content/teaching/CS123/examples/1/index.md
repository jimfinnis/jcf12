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
writing two classes: **Grid** and **Solver**. 
Their main program
* must create a grid
* must then create a solver, telling it which grid to solve.
* must tell the solver to solve its grid.

The important features of the Solver class are:
* The solver class constructor takes a Grid, telling it which grid to
solve: `Solver(Grid g){...}`.
* To actually solve the grid it's been given in the constructor, you
call the **solve()** method which takes no arguments. 

Here's what a Main class using these classes might look like:

{{< highlight java >}}
class Main {
    public static void main(String args[]){
        // create a grid
        Grid grid = new Grid(); 

        // add commands to set up the grid here

        // create a solver, tell it which grid to solve
        Solver solver = new Solver(grid);
        
        // and solve the grid!
        solver.solve();
    }
}
{{< / highlight >}}

Quite a few people had trouble writing these classes because of how
they manipulate objects. 
        
