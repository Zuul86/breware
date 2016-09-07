const piGpio = require('pi-gpio')

let gpioInitialized = false;

if(!gpioInitialized){
    piGpio.open(18, "output", (err) => {
        if(err){
            console.log(`Error ${err}`);
        } else {
            gpioInitialized = true;
        }
        
    });
}