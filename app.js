//Capitalised variables signify global variables. lowercase variables signify local variables 

//How many times a number is used on the board
var Used = [-10, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//If Needed for doing the correct input depending on device
var Capture = "click";

//Grid generation
var NumberOrder, Symbols, Results;

//Grid Pattern drawing (0: number, 1: symbol, 2:blank space, 3:result)
const Pattern = [0, 1, 0, 1, 0, 3, 1, 2, 1, 2, 1, 2, 0, 1, 0, 1, 0, 3, 1, 2, 1, 2, 1, 2, 0, 1, 0, 1, 0, 3, 3, 2, 3, 2, 3, 2];

//Grid Drawing
var Counter = [0, 0, 0];

//Store the board
var Board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//Checking 
const Checking = [
    [0, 1, 2, 0, 1],
    [3, 4, 5, 5, 6],
    [6, 7, 8, 10, 11],
    [0, 3, 6, 2, 7],
    [1, 4, 7, 3, 8],
    [2, 5, 8, 4, 9]
];

//cell number row and column
const CheckingPlan = [
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 3],
    [2, 4],
    [2, 5]
];

//Tracks matched answers
var Matches = [false, false, false, false, false, false];

//Touchscreen
if (!!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator)) {
    Capture = "touchend";
}

function Generate() {
    NumberOrder = ArrayShuffle(Array.apply(null, {
        length: 10
    }).map(Number.call, Number).slice(1));
    //0:+, 1:-, 2:×
    Symbols = Array.apply(null, {
        length: 12
    }).map(Function.call, Math.random).map(function (x) {
        return Math.floor(x * 3)
    });
    Results = [];
    for (var i = 0; i < 3; i++) {
        Results.push(Action(Action(NumberOrder[0 + i * 3], NumberOrder[1 + i * 3], Symbols[0 + i * 5]), NumberOrder[2 + i * 3], Symbols[1 + i * 5]));
    }
    for (var i = 0; i < 3; i++) {
        Results.push(Action(Action(NumberOrder[0 + i], NumberOrder[3 + i], Symbols[2 + i]), NumberOrder[6 + i], Symbols[7 + i]));
    }

    //final solution in the console
    for (var j = 0; j < 7; j++) {
        var l = "";
        for (var i = 0; i < 7; i++) {
            if (j % 2 == 0 && j < 5) {
                switch (i) {
                    case 0:
                        l += NumberOrder[0 + (j / 2) * 3];
                        break;
                    case 1:
                        l += SymbolToChar(Symbols[0 + (j / 2) * 5]);
                        break;
                    case 2:
                        l += NumberOrder[1 + (j / 2) * 3];
                        break;
                    case 3:
                        l += SymbolToChar(Symbols[1 + (j / 2) * 5]);
                        break;
                    case 4:
                        l += NumberOrder[2 + (j / 2) * 3];
                        break;
                    case 5:
                        l += "=";
                        break;
                    case 6:
                        l += Results[0 + (j / 2)];
                        break;
                }
            } else if (j < 5) {
                switch (i) {
                    case 0:
                        l += SymbolToChar(Symbols[2 + ((j - 1) / 2) * 5]);
                        break;
                    case 1:
                        l += " ";
                        break;
                    case 2:
                        l += SymbolToChar(Symbols[3 + ((j - 1) / 2) * 5]);
                        break;
                    case 3:
                        l += " ";
                        break;
                    case 4:
                        l += SymbolToChar(Symbols[4 + ((j - 1) / 2) * 5]);
                        break;
                    case 5:
                        l += " ";
                        break;
                    case 6:
                        l += " ";
                        break;
                }
            } else if (j == 5) {
                l = "=     =     =";
                break;
            } else if (j == 6) {
                l += Results[3];
                l += Array(7 - (Results[3] + "").length).join(" ");
                l += Results[4];
                l += Array(7 - (Results[4] + "").length).join(" ");
                l += Results[5];
                break;
            }
            l += "  ";
        }
        console.log(l);
    }

    if (
        Math.min.apply(Math, Results) < 0 ||
        Math.max.apply(Math, Results) > 50 ||
        Symbols.filter(function (x) {
            return x == 0
        }).length < 2 ||
        Symbols.filter(function (x) {
            return x == 1
        }).length < 2 ||
        Symbols.filter(function (x) {
            return x == 2
        }).length < 2) {

        console.clear();
        Generate();
    } else {
        DrawGrid();
    }
}