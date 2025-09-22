// This file contains intentional ESLint violations to demonstrate validation

var oldStyleVar = "I should use const or let";  // Should use const/let

unusedVariable = "This will trigger unused-var warning";  // Unused variable

function poorlyWrittenFunction() {
    console.log("Using console.log which should be a warning");

    var x = 10;  // Should use const
    x = 20;      // But x is reassigned, so should use let

    if (x > 5) {
        var y = "declared with var in block scope";  // Should use let/const
    }

    console.log(y);  // This will work due to var hoisting, but poor practice

    return "Function with multiple ESLint issues";
}

// Test with various issues
const testArray = [1, 2, 3];
for (var i = 0; i < testArray.length; i++) {  // Should use let
    console.log(testArray[i]);
}

// Mixed quote styles and other issues
let mixedQuotes = 'single quotes';
let anotherVar = "double quotes";

console.log("ESLint validation test file created");