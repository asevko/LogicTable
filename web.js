function generateSignSettersFor(uniqueItems){
    let tableSignBody = document.getElementById('tableSignBody');
    for (let signId = 0; signId < uniqueItems.length; signId++) {
        let row = document.createElement('tr');
        let sign = document.createElement('td');
        let innerText = document.createTextNode(uniqueItems[signId]);
        sign.appendChild(innerText);
        row.appendChild(sign);

        let input = document.createElement('input');
        input.type = "text";
        input.id = "signValueInput";
        input.id = signId.toString();
        row.appendChild(input);

        tableSignBody.appendChild(row)
    }

}

function generateTruthTable(setOfValues, solves, uniqueItems) {
    let truthTableHeader = document.getElementById("truthTableHeader");
    let header = document.createElement('tr');
    for (let i = 0; i < uniqueItems.length; i++) {
        let sign = document.createElement('th');
        let innerText = document.createTextNode(uniqueItems[i]);
        sign.appendChild(innerText);
        header.appendChild(sign);
    }
    let formulaHeader = document.createElement('th');
    let innerText = document.createTextNode("Result");
    formulaHeader.appendChild(innerText);
    header.appendChild(formulaHeader);
    truthTableHeader.appendChild(header);


    let truthTableBody = document.getElementById('truthTableBody');
    for (let row = 0; row < solves.length; row++) {
        let tableRow = document.createElement('tr');
        for(let signValue = 0; signValue < setOfValues[row].length; signValue++) {
            let value = document.createElement('td');
            let innerText = document.createTextNode(setOfValues[row][signValue]);
            value.appendChild(innerText);
            tableRow.appendChild(value);
        }
        let answer = document.createElement('td');
        let innerText = document.createTextNode(solves[row]);
        answer.appendChild(innerText);
        tableRow.appendChild(answer);

        truthTableBody.appendChild(tableRow);
    }

    let ps = document.getElementById("info");
    let formula = document.getElementById("formula").value;
    ps.innerText = "\< Result \> :== " + formula;
}