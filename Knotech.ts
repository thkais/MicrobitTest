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

enum KRgbLed {
    //% block="Links vorne"
    LV,
    //% block="Rechts vorne"
    RV,
    //% block="Links hinten"
    LH,
    //% block="Rechts hinten"
    RH,
    //% block = "Alle"
    All
}

enum KRgbColor {
    Rot,
    Grün,
    Blau,
    Gelb,
    Violett,
    Türkis,
    Weiß
}

enum KDir {
    Vorwärts = 0,
    Rückwärts = 1
}

enum KState {
    Aus = 0,
    An = 1
}


//% color="#ff0000" icon="\uf29b"
namespace Callibot {

    //% blockId=K_SetLed block="Schalte LED |%KSensor| |%KState"
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

    //% blockId=K_RGB_LED block="Schalte Beleuchtung |%KSensor| |%KState"
    export function setRgbLed(led: KRgbLed, color: KRgbColor, intensity: number)
    {

    }

    //="Liniensensor $sensor"
    //% blockId K_readLineSensor block="Liniensensor |%sensor"
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

    //% blockId=K_entfernung block="Entfernung (mm)" blockGap=8
    export function entfernung(): number {
        let buffer = pins.i2cReadBuffer(0x21, 3);
        return 256 * buffer[1] + buffer[2];
    }

    //="Stoppe Motor $nr"
    //% blockId=K_motorStop block="Stoppe Motor %nr"
    export function motorStop(nr: KMotor) {
        motor(nr, 0, 0);
    }
    //="Motor $nr Richtung $direction Geschwindigkeit $speed"
    // blockId=block_dual_motor block="motor %motor|at %percent"
    //% speed.min=0 speed.max=255
    //% blockId=K_motor block="Schalte Motor |%KMotor| |%KDir| mit |%number"
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
