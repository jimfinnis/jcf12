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

{{<quiz test_quiz>}}


{{<choice "It is an object of class Person">}}
{{<choice "It is the Person class">}}
{{<choice "It holds the values of some local variables">}}
{{<question answers="1" hint="Look at the notes again - is this memory or a description of data in memory?">}}
What is the green box of memory locations 1-3, containing the values 5, 2, 5?
{{</question>}}

{{<choice "It is an object of class Person">}}
{{<choice "It shows the types of some local variables">}}
{{<choice "It is the structure of data in the Person class">}}
{{<question answers="3" hint="Is this actually data in memory? What is it describing?" >}}
What is the pink box on the right hand side?
{{</question>}}

{{<choice "It is a local integer variable">}}
{{<choice "It is an instance variable in a Person object">}}
{{<question answers="2" hint="What is this value inside?">}}
What is the value stored at location 1?
{{</question>}}


{{<choice "It is a local integer variable">}}
{{<choice "It is an integer instance variable in a Person object">}}
{{<choice "It is a reference to a Person object at location 5">}}
{{<choice "It is a reference to a String object at location 5">}}
{{<question answers="4" hint="Look at the type of this location, and think what that actually is.">}}
What is the meaning of the value 5 at address 3?
{{</question>}}



{{< /quiz >}}

Click on the `submit` button to see the result.

{{</spoiler>}}

