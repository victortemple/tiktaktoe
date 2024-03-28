const cells = document.querySelectorAll(".cell");
const statusTxt = document.querySelector("#statTxt");
const restartBtn = document.querySelector("#restartBtn");

const windConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""];
let curentPlayer = "X";
let running = false;

innitailizeGame();

function innitailizeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusTxt.textContent = `${curentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
    // changePlayer();
}

function updateCell(cell, index) {
    options[index] = curentPlayer;
    cell.textContent = curentPlayer;
}

function changePlayer() {
    curentPlayer = (curentPlayer == "X") ? "O" : "X";
    statusTxt.textContent = `${curentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < windConditions.length; i++) {
        const condition = windConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];


    if(cellA == "" || cellB == "" || cellC == ""){
        continue;
    }

    if(cellA == cellB && cellB == cellC){
        roundWon = true;
        break;
    }
}

    if(roundWon){
        statusTxt.textContent = `${curentPlayer} wins`;
        running = false;
    }
    else if(!options.includes("")){
        statusTxt.textContent = "It's a Draw!..";
        running = false;
    }
    else{
        changePlayer();
    }

}


function restartGame() {
    curentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusTxt.textContent = "---";
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
