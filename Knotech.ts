let KInitialized = 0
let KLedState = 0;

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

enum KState {
    Aus = 0,
    An = 1
}


//% color="#ff0000" icon="\uf0a4"
namespace Knotech {

    // Eventhandler for serial data
    //serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
    //    let buffer = serial.readUntil(serial.delimiters(Delimiters.NewLine));
    //    let data = parseInt(buffer.substr(1));
    //    switch (buffer[0]) {
    //        case 'A':
    //            basic.showString("a");
    //            break;
    //        case 'B':
    //            basic.showString("b");
    //            break;
    //    }
    //})

    function KInit() {
        if (KInitialized != 1) {
            //serial.redirect(SerialPin.C16, SerialPin.C17, BaudRate.BaudRate56700);
            KInitialized = 1;
        }
    }
    //="Setze LED $led auf $state"
    //% block
    export function SetLed(led: KSensor, state: KState) {
        let buffer = pins.createBuffer(2);
        buffer[0] = 0;      // SubAddress of LEDs
        //buffer[1]  Bit 0/1 = state of LEDs
        switch (led) {
            case KSensor.Links:
                if (state == KState.An) {
                    KLedState |= 0x01;
                }
                else {
                    KLedState &= 0xFE;
                }
                break;
            case KSensor.Rechts:
                if (state == KState.An) {
                    KLedState |= 0x02;
                }
                else {
                    KLedState &= 0xFD;
                }

                break;
        }
        buffer[1] = KLedState;
        pins.i2cWriteBuffer(0x21, buffer);
    }

    //% block
    export function test(address: number): number {
        let buffer = pins.i2cReadBuffer(address, 1);
        return buffer[0];
    }
    //="Liniensensor $sensor"
    //% block
    export function readLineSensor(sensor: KSensor): boolean {
        let buffer = pins.i2cReadBuffer(0x21, 1);
        if (sensor == KSensor.Links) {
            buffer[0] &= 0x02;
        }
        if (sensor == KSensor.Rechts) {
            buffer[0] &= 0x01;
        }
        if (buffer[0] != 0) {
            return true;
        }
        else {
            return false;
        }
    }
    //="Lese Sensor Nr. %sensor"
    //% block
    export function readSensor(sensor: number): number {
        //let buffer = pins.createBuffer(5);

        let buffer = pins.i2cReadBuffer(0x21, 5);
        return buffer[sensor];
    }
    //="Stoppe Motor $nr"
    //% block
    export function motorStop(nr: KMotor) {
        motor(nr, 0, 0);
    }
    //="Motor $nr Richtung $direction Geschwindigkeit $speed"
    //% speed.min=0 speed.max=255
    //% block
    export function motor(nr: KMotor, direction: KDir, speed: number) {
        let buffer = pins.createBuffer(3);

        buffer[1] = direction;
        buffer[2] = speed;

        switch (nr) {
            case 1:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x20, buffer);
                break;
            case 3:
                buffer[0] = 0x00;
                pins.i2cWriteBuffer(0x20, buffer);
            case 2:
                buffer[0] = 0x02;
                pins.i2cWriteBuffer(0x20, buffer);
                break;
        }
    }
}
