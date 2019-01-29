
//% color="#AA278D"
//% groups="['Knotech']"
//% weight=100
namespace Knotech {
    //% block
    //% group="Knotech"
    export function Motor() {

    }
}


basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `);

basic.forever(function () {
    Knotech.Motor();
})