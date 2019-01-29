
enum Motor {
    Links = 1,
    Rechts = 2,
    Beide = 3
}
enum Dir {
    Vor = 0,
    Zurück = 1
}


//% color="#ff0000" icon="\uf0a4"
namespace Knotech {

    //% block
    export function foo() {

    }

    //% block
    export function foo1() {

    }

    //% block
    export function foo2() {

    }

    //% block 
    //% speed.min=0 speed.max=255
    export function motor(nr: Motor, direction: Dir, speed: number) {
        let buffer = pins.createBuffer(3);

        buffer[1] = direction;
        buffer[2] = speed;

        switch (nr) {
            case 1:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x10, buffer);
                break;
            case 3:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x10, buffer);
            case 2:
                buffer[0] = 0x02;
                pins.i2cWriteBuffer(0x10, buffer);
                break;
        }
    }
}
