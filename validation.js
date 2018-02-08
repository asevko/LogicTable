let stringToCheck;

function parseFormula(){
    let simplifier = "A";
    if (stringToCheck === simplifier ||
        stringToCheck.replace(/[A-Z]/, simplifier).match(simplifier))
        return true;
    let binaryFormulaRegExp = /\(\D[→~&|]\D\)/g;
    let oldString = stringToCheck;
    while(true){
        stringToCheck = stringToCheck.replace(/\(!\D\)/g,simplifier);
        stringToCheck = stringToCheck.replace(binaryFormulaRegExp, simplifier);
        if(stringToCheck === simplifier)
            return true;
        if (oldString === stringToCheck) {
            return false
        }
        oldString = stringToCheck;
    }
}

function validateFormula(){
    stringToCheck = document.getElementById("formula").value.replace(/->/g,"→");
    if(checkBrackets())
        return parseFormula();
    return false;
}

function checkBrackets() {
    let opBr = 0;
    let clBr = 0;
    for (let i = 0 ; i < stringToCheck.length ; i++)
    {
        if(stringToCheck[i]==="(") opBr++;
        if(stringToCheck[i]===")") clBr++;
    }
    return opBr === clBr;
}