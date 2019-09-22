/*
// 0,1,2,3,4,5,6,7,8,9 => 48...57
// numpad 0,1,2,3,4,5,6,7,8,9 => 96...105
// . => 110
// *,+,-,/ => 106,107,109,111
// =,<enter> => 61,13
// <backspace> => 8
// <delete> => 46
let codes = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,106,107,109,111,61,13,8,46]
*/

$(document).ready(function() {
    let calculator = new Object();
    let operators = ["+","-","*","/"];
    let digitLimitErrorMsg = "Digit Limit Met";
    
    let validate = () => {
    	if (calculator.entry.length > 8 || calculator.history.length > 22 || calculator.entry == "Infinity") {
    		resetCalcEntry();
            calculator.history = digitLimitErrorMsg;
    	}
    };
    
    let resetCalc = () => {
        calculator.entry = "0";
        calculator.history = "";
        calculator.replaceEntry = true;
    };
    
    let resetCalcEntry = () => {
        calculator.entry = "0";
        calculator.replaceEntry = true;
    };
    
    let calculate = () => {
        calculator.entry = (eval(calculator.history)).toString();
        calculator.history = "";
        calculator.replaceEntry = true;
    };
    
    let displayCalc = () => {
        document.getElementById("history").innerHTML = calculator.history;
        document.getElementById("entry").innerHTML = calculator.entry;
    };
    
    let logInfo = () => {
        console.log("entry: " + calculator.entry);
        console.log("history: " + calculator.history);
        console.log("replaceEntry: " + calculator.replaceEntry);
    };
    
    let pressButton = (val) => {
        console.log(val);
        switch(val) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                // if history==error => do nothing
                if (calculator.history == digitLimitErrorMsg) {}
                // if replaceEntry==true, replace entry with val & replaceEntry=false
                else if (calculator.replaceEntry == true) {
                    calculator.entry = val;
                    calculator.replaceEntry = false;
                }
                // else, add to entry & replaceEntry=false & validate
                else {
                    calculator.entry += val;
                    replaceEntry = false;
                    validate();
                }
                break;
            case "0":
                // if history==error => do nothing
                if (calculator.history == digitLimitErrorMsg) {}
                // if entry==0 => do nothing
                else if (calculator.entry == "0") {}
                // if replaceEntry==true, replace entry with val & replaceEntry=false
                else if (calculator.replaceEntry == true) {
                    calculator.entry = val;
                    calculator.replaceEntry = false;
                }
                // else, add to entry & replaceEntry = false & validate
                else {
                    calculator.entry += val;
                    replaceEntry = false;
                    validate();
                }
            
                break;
            case ".":
                // if history==error => do nothing
                if (calculator.history == digitLimitErrorMsg) {}
                // if replaceEntry==true => replace entry with "0." & replaceEntry=false
                else if (calculator.replaceEntry == true) {
                    calculator.entry = "0.";
                    calculator.replaceEntry = false;
                }
                // if entry already has . => do nothing
                else if (calculator.entry.indexOf(".") != -1) {}
            	// else => add to entry & replaceEntry = false & validate
                else {
                    calculator.entry += val;
                    calculator.replaceEntry = false;
                    validate();
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                logInfo();
                // if history == error => do nothing
                if (calculator.history == digitLimitErrorMsg) {}
                // if entry ends with . => remove . in entry & add (add + val) to history & replaceEntry=true
                else if (calculator.entry.slice(-1) == ".") {
                	calculator.entry = calculator.entry.substr(0,calculator.entry.length-1);
                	calculator.history += calculator.entry + val;
                    calculator.replaceEntry = true;
                }
                // if history ends with +,-,*,/ => replace last history's character by val & replaceEntry=true
                else if (calculator.replaceEntry == true && operators.indexOf(calculator.history.slice(-1)) != -1) {
                    calculator.history = calculator.history.substr(0,calculator.history.length-1) + val;
                    //calculator.history[calculator.history.length-1] = val;
                    calculator.replaceEntry = true;
                }
                // else => add (entry + val) to history & replaceEntry = true & validate
                else {
                	calculator.history += calculator.entry + val;
                	calculator.replaceEntry = true;
                	validate();
                }
                break;
            case "=":
            case "Enter":
                // if history == error => do nothing
                if (calculator.history == digitLimitErrorMsg) {}
                // else, add entry to history & calculate history & validate
                else {
                    calculator.history += calculator.entry;
                    calculate();
                    validate();
                }
                break;
            case "CE":
            case "Delete":
                resetCalcEntry();
                break;
            case "C":
                resetCalc();
                break;
            case "Backspace":
                // if history == error => do nothing
                if (calculator.history == digitLimitErrorMsg) {}
                // if replaceEntry == true => do nothing
                else if (calculator.replaceEntry == true) {}
                // if replaceEntry == false:
                else if (calculator.replaceEntry == false) {
                    // if entry.length = 1 => replace entry with 0 & replaceEntry=true
                    if (calculator.entry.length == 1) {
                    	calculator.entry = "0";
                    	calculator.replaceEntry = true;
                    }
                    // else remove last entry's character & replaceEntry=false
                    else {
                        calculator.entry = calculator.entry.substr(0,calculator.entry.length-1);
                        calculator.replaceEntry = false;
                    }
                }
                break;
            default:
                break;
        }
        displayCalc();
    }
    
    $("button").bind("click", function(event) {
        let val = event.currentTarget.value;
        pressButton(val);
    });
    document.addEventListener("keydown", function(event) {
        var key = event.key;
        pressButton(key);
    }, false);
    resetCalc();
    displayCalc();
});