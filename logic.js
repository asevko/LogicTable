
function calculateFormula(formula) {

    let matchCases = ["!1","!0","0→0","0→1","1→0","1→1","0~0","0~1","1~0","1~1","0&0","0&1","1&0","1&1","0|0","0|1","1|0","1|1"];
    let solvesForMatchCases = ["0","1","1","1","0","1","1","0","0","1","0","1","1","1","0","0","0","1"];
    let uniqueItems = Array.from(new Set(formula.match(/[A-Z]/g)));
    let setOfSolves = generateSetsOfSolves(uniqueItems);

}
function generateSetsOfSolves(unique) {
    let setOfSolves = new Array(unique.length);
    for (let i = 0; i < Math.pow(2,unique.length);i++){
        setOfSolves[i] = i.toString(2);
        let stringZeros = "0";
        stringZeros =stringZeros.repeat(unique.length - setOfSolves[i].length);
        setOfSolves[i] = stringZeros + setOfSolves[i];
        setOfSolves[i] = setOfSolves[i].split("");

    }
    toLog(setOfSolves,setOfSolves.length,setOfSolves[0].length);
    return setOfSolves;
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
