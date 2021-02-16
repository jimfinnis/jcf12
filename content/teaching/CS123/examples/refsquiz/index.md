+++
title="References quiz"
summary="Some questions on references"
date=2021-02-01
weight=4
hidden=false
type="example"
topscripts=["js/quiz.js","js/slides.js"]
+++

{{<important>}}
{{< embed "assets/toptext.md" >}}
{{</important>}}

## Question 1
Imagine we have the Room class from the [previous page]({{< relref "../refs2/" >}}):

```java
public class Room {
    public String text;
    
    public Room north;
    public Room south;
    public Room east;
    public Room west;
}    
```

Now we run the following Main class:
```java
public class Main {
    public static void main(String[] args){

        Room a = new Room();
        a.text = "Fish room";

        Room b = a;

        b.text = "Telescope room";
        
        System.out.println(a.text+"/"+b.text);
    }
}
```

{{<quiz quiz2>}}
{{<postmsggood>}}
Well done! There is only one object in this code, and after ```Room b = a```,
two references ```a``` and ```b``` both point to it.
{{</postmsggood>}}

{{<choice "It crashes">}}
{{<choice "Fish room/(null)">}}
{{<choice "It doesn't compile">}}
{{<choice "Telescope room/Telescope room">}}
{{<choice "Fish room/Telescope room">}}

{{<question answers="4" hint="Trace through the code carefully - and remember that Room variables are references to objects, not objects.">}}
What does this code print to the console?
{{</question>}}
{{</quiz>}}


## Question 2
With the same code, we now run the following Main class:
```java
public class Main {
    public static void main(String[] args){

        Room a = new Room();
        a.text = "Fish room";
        Room b = new Room();
        b.text = "Telescope room";

        Room c = a;
        a = b;
        b = c;

        System.out.println(a.text+"/"+b.text);
    }
}
```

{{<quiz quiz3>}}
{{<postmsggood>}}
Well done! The ```c=a; a=b; b=c;``` code swaps the two references ```a``` and ```b```.
{{</postmsggood>}}

{{<choice "It crashes">}}
{{<choice "It doesn't compile">}}
{{<choice "Fish room/Telescope room">}}
{{<choice "Telescope room/Telescope room">}}
{{<choice "Telescope room/Fish room">}}
{{<choice "Fish room/Fish room">}}

{{<question answers="5" hint="Again, trace through the code carefully, keeping track of which reference points where">}}
What does this code print to the console?
{{</question>}}

{{<choice "Fish room">}}
{{<choice "Telescope room">}}
{{<choice "(null)">}}
{{<question answers="1" hint="This should be easy after the last question.">}}
What is the string at ```c.text``` when this program is on the ```println``` line?
{{</quiz>}}
