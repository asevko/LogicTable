function start() {
    let custom = "(R|(L~C))";
    calculateFormula(custom);
}
function calculateFormula(formula) {

    let uniqueItems = Array.from(new Set(formula.match(/[A-Z]/g)));
    let setOfValues = generateSetsOfValues(uniqueItems);
    let solves = [];
    for(let i = 0;i < setOfValues.length;i++){
        let formulaWithValues = formula;
        for(let j = 0;j < uniqueItems.length ;j++){
            formulaWithValues = replaceVarWithValue(formulaWithValues,uniqueItems[j],setOfValues[i][j]);
        }
        solves.push(calculateResult(formulaWithValues));
    }

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
    toLog(setOfValues,setOfValues.length,setOfValues[0].length);
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