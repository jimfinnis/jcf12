---
date: 2020-07-08
title: Monte Carlo simulation example
subtitle: A demo of a Monte Carlo method for calculating $\pi$.
summary: A demo of a Monte Carlo method for calculating $\pi$.
image:
  preview_only: true
localscripts:
    - js/montepi.js
---
This page shows a Monte Carlo simulation which calculates $\pi$.
The longer you leave it, the more accurate it will get. It's just 
calculating how many points are inside the circle ($C$) compared
with how many points are only in the square ($S$). For reasons I'll
go into below, as we generate more and more points $C/S$ will get
closer and closer to $\pi/4$.

{{< canvas id="piCanvas" w="800" h="830" >}}

Here's how it works. We have a circle inside a square, like the figure
below. The square is centred on the origin,
each side being $2r$ in length. Our circle is also centered
on the origin, with radius $r$. 

{{< figure src="circle.png" title="Our circle inside a square" >}}

If you remember
your basic geometry, you'll know that a circle of radius $r$ has an area
of $\pi r^2$. Our square is $2r$ on each side, so it must have a radius
of $4r^2$. So 
\begin{align}
\frac{area\\_of\\_circle}{area\\_of\\_square}
&= \frac{\pi r^2}{4 r^2} \\\\
&= \frac{\pi}{4}
\end{align}
So the area of the circle is $\pi/4$ that of the square.

That means if we just randomly generate points inside the square, there is 
a $\pi/4$ chance that each point will also be inside the circle. All we need
to do is generate hundreds of thousands of points inside a square,
and calculate how many of those points are also in the circle.
That's easy, we can just use Pythagoras' Theorem: for each
point generated, it is inside the circle if
$$
\sqrt{x^2+y^2}<r
$$

So our algorithm is:
 * initialise two variables to zero:
    * $S$ is the total number of points in square 
    * $C$ is the number of points which are also in the circle
 * repeat at least hundreds of thousands of times:
    * generate a random point $(x,y)$ in the square, where $x$
      and $y$ are random numbers between $-r$ and $r$
    * increment $S$ (number of points in the square)
    * if $\sqrt{x^2+y^2}<r$, also increment $C$ (number of points in the circle)
    * calculate $t=C/S$ (the ratio of in-circle to not-in-circle). 
      This should gradually approach $\pi/4$ as we add more points
    * Show $4t$, which should get closer and closer to $\pi$.

