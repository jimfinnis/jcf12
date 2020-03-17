---
date: 2020-03-16
title: UESMANN
summary: "UESMANN is the subject of my recently completed PhD, and is a rather
odd kind of artificial neural network which can modulate between multiple
behaviours. It is inspired by how neuromodulators change the behaviour
of neurons in biology."


---

UESMANN is the subject of my recently completed PhD, and is a rather
odd kind of artificial neural network.

Artificial neural networks are simple systems made out of many interconnected
"neurons", modelled crudely on the cells of the animal nervous system. A
network of such neurons can (for example) learn how to make a robot recognise
situations and respond accordingly.

A system like this acts purely "in the moment". In an animal, however, the
neurons may be acted on by hormones, whose concentrations vary over time. This
might allow a robot which has just been in a stressful situation to behave
differently for a short while afterwards, until the hormone concentration
drops. Artificial neuroendocrine systems (AESs) add neurons which can release
hormones (via a "gland") which then affect other neurons throughout the
system.

Such a system should be able to maintain certain important variables in a
homeostatic manner - rather like a thermostat, they should react when the
variables are going out of a "safe" range, to move them back in. The
biological endocrine system contains many important homeostatic mechanisms,
such as the insulin/glucagon system which maintains blood sugar levels. Even
adrenaline can be seen as a homeostatic hormone: the actions it causes an
animal to take are designed to keep it operating safely, by getting out of (or
eliminating) danger.

Currently, AES networks are designed in an ad-hoc manner, and only systems of
a few neurons and hormones have been explored. Originally, I intended to use a
genetic algorithm to "breed" such systems, such that "good" systems are kept
and allowed to breed again, resulting in an improved population. Eventually,
good solutions to test problems would emerge. However, my research took a
"left turn" in the second year, when I stumbled upon the idea of the "simplest
possible" (possibly) neuromodulatory system: UESMANN.

In UESMANN, the standard feed-forward neural network is modified, so that
every connection into every neuron is modified by a global parameter, h. If
h=0, the network behaves as it normally would, and if h=1 all the connections
are twice as strong. It turns out to be possible to train networks like this
using a slight modification to the standard technique of "backpropagation of
errors" to perform two entirely different functions at each level of h.

Since then, my research has been looking at what UESMANN can do in terms of

* pairs of boolean functions: UESMANN can smoothly transition
between any two boolean functions in a network with two hidden neurons, the minimum required to learn any single function in a normal network (which is quite astonishing);
* classification problems: UESMANN networks can learn to switch
between detecting vertical to detecting horizontal lines as h changes, and can also learn to label handwritten digits in two different ways;
* robot control: in experiments on both in simulation and on a real
robot, UESMANN can shift between exploration of a space to heading towards a power source as h changes, which (when h is linked to battery charge) achieves homeostasis.

I have also been looking at how UESMANN does what it does, by examining
exactly what happens when the modulation is applied in the context of boolean
function pairs.
