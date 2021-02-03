+++
title="Quiz test"
date=2021-01-19
weight=1
hidden=true
type="example"
topscripts=["js/quiz.js"]
+++

# Hugo Quiz

Here is a simple example of a quiz, written in markdown using hugo shortcodes

## Quiz header

{{< quiz test_quiz >}}

{{< qitem 
    answers="2" 
    choices="tim,tom,carl"
    hint="Tom's name is tom..."
>}}
What is Tom's name?
{{< svg src="struct1.svg" title="an Enemy object in memory" >}}

{{</qitem>}}


{{< qitem 
    answers="2" 
    choices="Cologne,Berlin,Hamburg"
    hint="The capital is Berlin"
>}}
Capital of Germany?
{{</qitem>}}

{{< qitem 
    answers="2,3" 
    choices="5,13,183,1"
    hint="Two numbers are larger!"
>}}
Bigger numbers?
{{</qitem>}}

{{< /quiz >}}

Click on the `submit` button to see the result.

