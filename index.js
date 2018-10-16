/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let xCount = 0;
let oCount = 0;
let xArray = [];
let oArray = [];

function initializeGrid() {
    grid = [];
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
            xCount++;
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
            oCount++;
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    if(xCount >=3 || oCount >=3)
        checkWinner(turn === "X" ? 2 : 1);
}

function checkWinner(turnValue) {
    let xFlag  = false;
    let oFlag  = false;
    if(turnValue === 1) {
        xFlag = checkLogics(xArray);
    } else {
        oFlag = checkLogics(oArray);
    }

    if(xFlag === false && oFlag === false && xArray.length+oArray.length === GRID_LENGTH) {
        reRenderAfterWinnerDeclaration("It is a draw");
        
    }
    if(xFlag) {
        reRenderAfterWinnerDeclaration("X is the winner");
    }

    if(oFlag) {
        reRenderAfterWinnerDeclaration("O is the winner");
    }
}

function reRenderAfterWinnerDeclaration(title) {
    document.getElementById("winner").innerHTML = "<h1>"+title+"</h1>";
    xCount = 0;
    oCount = 0;
    xArray = [];
    oArray = [];
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}
function checkLogics(array) {
    let correctIndices = [
        ["00","01","02"],
        ["00","11","22"],
        ["00","10","20"],
        ["01","11","21"],
        ["02","12","22"],
        ["10","11","12"],
        ["20","21","22"],
        ["20","11","02"],
    ]
    let count = 0;
    let flag = false;
    for(let arrayIndex=0;arrayIndex<correctIndices.length;arrayIndex++){
        for(let index=0;index<3;index++){
            if(array.includes(correctIndices[0][index])){
                count++;
            }    
        }
        if(count === 3) {
            flag = true;
            break;
        }
        count = 0;
    }
    return flag;
}

function onBoxClick() {
    document.getElementById("winner").innerHTML = "";
    xCount = 0;
    oCount = 0;
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    if(grid[colIdx][rowIdx] !== 1 && grid[colIdx][rowIdx] !== 2) {
        if(turn === "X") {
            newValue = 1;
            turn = "O";
            xArray.push(colIdx+rowIdx);
        } else {
            newValue = 2;
            turn = "X";
            oArray.push(colIdx+rowIdx);
        }
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
