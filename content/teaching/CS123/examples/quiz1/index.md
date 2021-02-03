+++
title="Quiz test"
date=2021-01-19
weight=1
hidden=true
type="example"
topscripts=["js/quiz.js"]
+++

{{<spoiler text="Click to open quiz">}}

The image below shows some data in memory. Don't worry if you don't quite
understand all of it, although you might want to think about what it could mean.
{{< svg src="quiz1.svg" title="a Person object in memory" >}}

{{< quiz test_quiz >}}

{{< qitem 
    answers="1" 
    choices="It is a local integer variable,It is an instance variable of a Person"
    hint=""
>}}
What is the value "5" stored at location 1?
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

{{</spoiler>}}
