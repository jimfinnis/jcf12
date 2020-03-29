---
date: 2020-03-16
title: Angort
summary: "A concatenative language with first-class function and full lexical closure."
tags: ["angort"]
image:
    preview_only: true

---

Angort[^1] is a stack-based concatenative programming language, based on the
venerable Forth, with some
extra features. These include:

*  variables and function parameters;
*  higher order functions with (nearly) full lexical closure;
*  lists and hashes (dictionaries) with garbage collection;
*  native C++ plugin architecture.

It's available at [Github](https://github.com/jimfinnis/angort).

## Why?

Angort was initially written out of curiosity, driven by
my need to understand how high-level constructions 
such as garbage-collected values and closures worked down at the 
machine code level. As a veteran assembler and C/C++ programmer,
I found languages like Python and even Java difficult to "trust", in
a sense, without this understanding.

My first attempt was a language typical of the Algol lineage, Lana.
While successful, Lana wasn't particularly interesting and so I abandoned
it. Later, I found I needed a control language for a robotics project:
the ExoMars rover locomotion prototype, Blodwen. The Blodwen control
system used a fairly complex C++ API, which was appropriate for 
many tasks but not for ad-hoc control or experiment scripting.
My initial instinct was (as always)
to quickly write an interpreter for a Forth-like language.

As the project progressed, I found the language an interesting platform
for investigating the high-level features mentioned above. Notably, my final year
project required a subsumption system *a la* Brooks, and I found
this much easier to write in the new language than in C++. Prompted by
this discovery I continued to work with and add features to the language
over the next year, and was surprised by how powerful a stack-based
language with anonymous functions and collections could be.
As I started my Ph.D. I found working with Angort
a natural way to script experiments, particularly once I found
a good set of paradigms for interfacing with C++ code,
and so continued working with it.

Angort combines the power and ease of a modern dynamic language with
the convenience of a Forth-like language, and has been used
in various applications including:

*  building command/control/monitoring environments for robotic
systems;
*  scripting experiment runs for neural networks;
*  writing fairly complex data analysis tools;
*  generating visualisations of neural networks and other data;
*  algorithmically generated music;
*  simple 2D games.

## Brief examples

First, the familiar recursive quicksort algorithm:
{{< highlight  "linenos=table" "style=bw">}}
# Colon at the start of a line introduces a named function definition.
# This function has one parameter "lst" and one local variable "piv".
:qs |lst:piv| 
    # if length of list is <=1...
    ?lst len 1 <= if
        # return the list itself
        ?lst 
    else 
        # otherwise remove the first item as the pivot
        ?lst pop !piv
        # quicksort the list of items less than the pivot
        ?lst (?piv <) filter qs 
        # add the pivot to that list
        [?piv] + 
        # quicksort the list of items greater than the pivot
        # and add it.
        ?lst (?piv >=) filter qs + 
        # resulting list is left on the stack, and so returned.
    then;
{{< / highlight >}}
Angort doesn't (yet) have tail-call optimisation so actually doing it
like this is probably a bad idea.


Next, a program to read a CSV file and print the sums of all
the columns:

{{< highlight  "linenos=table" "style=bw">}}
# load the CSV plugin but do not import the symbols into the
# default namespace, so we have to access them with csv$...
`csv library drop

# load the CSV file using the "quick read" method and store it
# in the "CSV" global. This will be a list of dictionaries, each
# of which is keyed by a symbol.

"magic.log" csv$qread !CSV

# make a list of keys from the first item in CSV.
[] ?CSV fst each {i,} !Keys

# create a "slug" (an anonymous function which runs immediately,
# to provide local variables and multiline flow control)
# with a local variable i.

(|:i|
    # for each key, store the iterator value in "i" so it's
    # accessible within a closure
    ?Keys each { i!i
        # create a pair consisting of the iterator (i.e. key name)
        [i, 
         # and the sum of the key's values, done by using map/reduce:
         # the map extracts the key's values, the reduce performs the sum.
         0 ?CSV (?i swap get) map (+) reduce
         ]
        # print the pair
        "," intercalate.
    }
)@ quit # run the slug and quit
{{< / highlight >}}



[^1]: The name is an entirely random pair of syllables,
it has no significance.


