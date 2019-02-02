
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
    export function test(address: number): number {
        let buffer = pins.i2cReadBuffer(address, 1);
        return buffer[0];
    }

    //% block
    export function readLineSensor(sensor: KSensor): boolean {
        let buffer = pins.i2cReadBuffer(0x11, 1);
        if (sensor == 0) {
            buffer[0] &= 0x02;
        }
        if (sensor == 1) {
            buffer[0] &= 0x01;
        }
        if (buffer[0] != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
    })
    basic.forever(() => {
        basic.showString(serial.readLine())
        basic.showString(serial.readString())
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
    })

    serial.redirect(
        SerialPin.C16,
        SerialPin.C17,
        BaudRate.BaudRate56700
    )

    //% block
    export function readSensor(sensor: number): number {
        //let buffer = pins.createBuffer(5);

        let buffer = pins.i2cReadBuffer(0x11, 5);
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
