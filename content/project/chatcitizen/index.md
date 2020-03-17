---
date: 2020-03-17
title: ChatCitizen
summary: "Making friends in Minecraft"
tags: ["minecraft"]
---

This is a chatbot system designed to work under the 
[Citizens2](https://wiki.citizensnpcs.co/Citizens_Wiki)
plugin for Minecraft Spigot servers. It lets you create NPCs
you can have conversations with.

The original version of ChatCitizen used AIML, a well-known
Java chatbot library, but I decided to write my own system more
aligned with the Chatscript C++ library (but in Java). It works
fairly well, but like all chatbots it needs a huge amount of data.
This is ongoing work.

The code is made up of two parts:

* [SimpleChat](https://github.com/jimfinnis/SimpleChat/) is the
underlying Java library,
* [ChatCitizen2](https://github.com/jimfinnis/ChatCitizen2) is
the Minecraft plugin.

Chatbots primarily consist of patterns and responses. For example:

{{< highlight  "linenos=table" "style=bw">}}
+(.* $c=~drink .*)
    isdrunk if
        ^refusedrink.
    else
        "One ${$c} coming right up.". addDrink
        {
            +&thanks ^yourewelcome;
        } next
    then;
{{< / highlight >}}
This pattern responds to anything of the "drink" category being
mentioned in the sentence, and assumes you want that drink. There's
another pattern with higher priority that deals with the word "not" 
preceding the drink, and yet another system for expanding contractions
like "don't", so you can say "I don't want a whisky."

The bit after the first line is code that happens in response to a
pattern[^1].
Here, if you've had too much (we keep a count) you get refused. Otherwise
you get your drink, and any "thanks" offered will give a "you're welcome"
response. Of these tiny pieces are chatbots made.

Currently, I've got a set of shops which use iron ingots or emeralds
as a medium of exchange, a poet who talks gibberish, soldiers who
can guard you if you ask them, and the publican described above.

Making friends is fun.

[^1]: The observant among you may notice a resemblance of the "action
syntax" here to my [Angort](/project/Angort) language. What can I say -
stack languages are really easy to write.
