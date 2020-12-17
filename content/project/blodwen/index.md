---
date: 2020-03-17
title: Blodwen
summary: "A tiny Mars rover."
tags: ["robot"]
---

Blodwen was built during my industrial year. It's a
small Mars rover, with a wheel model similar to that which is
being used in the ExoMars rover.

I used Blodwen in my final year project into "walking" as a possible
locomotion method. Here's a video of it in action on our Mars terrain:

{{< youtube 7vspI6JLdMA >}}



## Hardware
The chassis and motors came pre-built from a Russian company, but
were controlled via a box of switches on the end of a tether. My
work involved designing a proper control system. There are six wheels,
each with three motors:

* a drive motor to turn the wheel;
* a steer motor to rotate the wheel around its vertical axis;
* a lift motor to rotate the wheel's "leg." Normally this is only
used in stowing and deploying the rover, but my final year project
investigated whether this was useful in locomotion.

We therefore need to control 18 motors, which is difficult. I eventually
decided to use off-the-shelf motor controller components connected
by an I2C bus. The design chosen consists of:

* An onboard PC connected via USB serial to...
* an Arduino Uno inside the chassis acting as an I2C master
connected to...
* three daughterboards, each holding...
* three ATMega328-based motor controllers, each of which drives...
* two motors (and optionally reads a chassis pose potentiometer).

Here's what the control system looked like:
{{< figure src="blodctrl.jpg" title="Blodwen control system">}}
The pieces of stripboard over the red motor controller modules hold
temperature sensors. Note also the pieces of coloured insulation
threaded onto the very thin (and uncoloured) motor control and sensor lines:
these helped me keep track of which wire went where.


## Software
Blodwen is controlled via a C++ library on the on-board PC, which communicates
with the Arduino. It's fairly straightforward:

```cpp
int main(int argc,char *argv[]){
    Rover r;
    
    try {
        // set up the rover given the comms port and the
        // baud rate.
        r.init("/dev/ttyACM0",115200);
        
        // send default calibration
        r.calibrate();
        
        // some parameter data we're going to change;
        // you probably won't do this - it's just an illustration.

        MotorParams params = {
            0.004,0,0,   //Proportional, Integral, Differential gains
            0,0,         //integral cap and decay
            300,         //overcurrent threshold
        };
        
        // change parameters on the drive motors
        // and set a speed for them
        
        for(int i=1;i<=6;i++) { // motors are 1 to 6 as in the documentation
            Motor *m = r.getDrive(i); // get each drive motor

            // get a pointer to its parameters
            MotorParams *p = m->getParams();

            // copy some other data into them
            *p = params;

            // and send the changes
            m->sendParams();

            // and set a speed
            m->setRequired(1000);
        }
        
        for(;;){
            usleep(10000); // wait 1/100 s
            r.update(); // update the rover

            // get drive motor 1 data
            DriveMotorData *d = r.getDriveData(1);
            printf("%f\n",d->actual); // print actual speed
        }   
        
    } catch(SlaveException e) {

        // slave exceptions are thrown by protocol and comms errors
        printf("Error in rover communication: %s\n",e.msg);
        return 0;
    }
}        
```
