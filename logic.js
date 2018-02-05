let uniqueItems;
let solves = [];
let viewIsPresentedOnScreen = false;

function beginProcessing() {
    let isFormula = validateFormula();
    let formula = document.getElementById("formula").value;
    if (isFormula) {
        if (viewIsPresentedOnScreen) {
            removeTables();
            viewIsPresentedOnScreen = false;
        }
        showSignSettersAndButton();
        uniqueItems = Array.from(new Set(formula.match(/[A-Z]/g)));
        generateSignSettersFor(uniqueItems);
        //calculateFormula(formula, uniqueItems)
    }
}

function processTruthTable() {
    let formula = document.getElementById("formula").value;
    removeTruthTable();
    userChoice = [];
    solves = [];
    fillUserChoice();
    calculateFormula(formula, uniqueItems);
    showTruthTable();
}

function calculateFormula(formula, uniqueItems) {
    let setOfValues = generateSetsOfValues(uniqueItems);
    for(let i = 0;i < setOfValues.length;i++){
        let formulaWithValues = formula;
        for(let j = 0;j < uniqueItems.length ;j++){
            formulaWithValues = replaceVarWithValue(formulaWithValues,uniqueItems[j],setOfValues[i][j]);
        }
        solves.push(calculateResult(formulaWithValues));
    }
    setOfValues = getUserChoice(setOfValues);
    generateTruthTable(setOfValues, solves, uniqueItems);
    viewIsPresentedOnScreen = true;
}

function generateSetsOfValues(unique) {
    let setOfValues = new Array(unique.length);
    for (let i = 0; i < Math.pow(2,unique.length);i++){
        setOfValues[i] = i.toString(2);
        let stringZeros = "0";
        stringZeros =stringZeros.repeat(unique.length - setOfValues[i].length);
        setOfValues[i] = stringZeros + setOfValues[i];
        setOfValues[i] = setOfValues[i].split("");

    }
    //toLog(setOfValues,setOfValues.length,setOfValues[0].length);
    return setOfValues;
}
function toLog(array,x,y) {
    for (let i = 0; i < x; i++) {
        let string ="";
        for (let j = 0; j < y; j++) {
            string = string + array[i][j];
        }
        console.log(string);
    }
}
function calculateResult(formula) {
    let matchCases = ["!1","!0",
        "0→0","0→1","1→0","1→1",
        "0~0","0~1","1~0","1~1",
        "0&0","0&1","1&0","1&1",
        "0|0","0|1","1|0","1|1"];
    let solvesForMatchCases = ["0","1",
        "1","1","0","1",
        "1","0","0","1",
        "0","0","0","1",
        "0","1","1","1"];
    let oldstring;
    do{
        oldstring = formula;
        for(let i = 0;i < matchCases.length;i++){
            formula = formula.replace("("+matchCases[i]+")",solvesForMatchCases[i]);
        }

    }while(oldstring!==formula);
    return formula;
}

function replaceVarWithValue(string,variable,value) {
    return string.replace(variable,value);
}

let userChoice = [];
const defaultValue = "-1";

function fillUserChoice() {
    for (let sign = 0; sign < uniqueItems.length; sign++) {
        let value = document.getElementById(sign.toString()).value;
        value = value.replace(/\s+/g, '');
        if (value !== "0" && value !== "1") {
            userChoice.push(defaultValue);
        } else {
            userChoice.push(value)
        }
    }
}

function getUserChoice(setOfValues) {
    let resultChoice = [];
    let resultSolves = [];
    for (let row = 0; row < setOfValues.length; row ++) {
        if (match(setOfValues[row], userChoice)) {
            resultChoice.push(setOfValues[row]);
            resultSolves.push(solves[row]);
        }
    }
    solves = resultSolves;
    return resultChoice;
}


function match(array, template){
    for(let i = 0; i < array.length; i++) {
        if (array[i] !== template[i] && template[i] !== defaultValue) {
            return false;
        }
    }
    return true;
}

