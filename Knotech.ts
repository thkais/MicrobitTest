
enum KMotor {
    Links = 1,
    Rechts = 2,
    Beide = 3
}

enum KSensor {
    Links = 0,
    Rechts = 1
}

enum KDir {
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
        export function readSensor(sensor: number): number {
        let buffer = pins.createBuffer(5);

        pins.i2cReadBuffer(0x11, 5);
        return buffer[sensor];
    }

    //% block
    export function motorStop(nr: KMotor) {
        motor(nr, 0, 0);
    }

    //% speed.min=0 speed.max=255
    //% block
    export function motor(nr: KMotor, direction: KDir, speed: number) {
        let buffer = pins.createBuffer(3);

        buffer[1] = direction;
        buffer[2] = speed;

        switch (nr) {
            case 1:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x11, buffer);
                break;
            case 3:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x11, buffer);
            case 2:
                buffer[0] = 0x02;
                pins.i2cWriteBuffer(0x11, buffer);
                break;
        }
    }
}
