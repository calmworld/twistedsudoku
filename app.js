//Capitalised variables signify global variables. lowercase variables signify local variables 

//How many times a number is used on the board
var Used = [-10,0,0,0,0,0,0,0,0,0];
//If Needed for doing the correct input depending on device
var Capture = "click";

//Grid generation
var NumberOrder, Symbols, Results;

//Grid drawing (0: number, 1: symbol, 2:blank space, 3:result)
const Pattern = [0,1,0,1,0,3,1,2,1,2,1,2,0,1,0,1,0,3,1,2,1,2,1,2,0,1,0,1,0,3,3,2,3,2,3,2]; 

//Grid Drawing
var Counter = [0,0,0];

//Store the board
var Board = [0,0,0,0,0,0,0,0,0];

//Checking 
const Checking = [[0,1,2,0,1],[3,4,5,5,6],[6,7,8,10,11],[0,3,6,2,7],[1,4,7,3,8],[2,5,8,4,9]]; 

//With a given cell number you are given the row and column
const CheckingPlan = [[0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5]]; 

//Tracks matched answers
var Matches = [false, false, false, false, false, false]; 

//Touchscreen
if(!!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator)) { 
    Capture = "touchend";
}
  