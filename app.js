var grid = document.getElementById('game-box');
var gridHeight = 20;
var gridWidth = 10;

document.addEventListener('DOMContentLoaded', function () {
    // creates the game grid once the page has been loaded
    function createGameGrid() {
        // create 20 rows
        for (let i = 0; i < gridHeight; i++) {
            // create row
            var row = document.createElement('div');
            row.setAttribute('class', 'game-box-row');
            // // create row cells
            for (let j = 0; j < gridWidth; j++) {
                //create box elemnt
                var cell = document.createElement('div');
                cell.setAttribute('class', 'game-box-cell black-outline empty');
                // add some coordinates for movement later
                cell.dataset.x = i;
                cell.dataset.y = j;
                row.appendChild(cell);
            }
            // add row to game-box
            grid.appendChild(row);
        }
    }
    createGameGrid();
    drawBlock();
});


// controls for moving blocks
document.addEventListener('keydown', (event) => {
    var xcoord;
    var ycoord;
    var coords = [];
    var button = event.key;
    // get the coordinates of the block
    let gameState = getGameState();
    for (let i = 0; i < gameState.length; i++) {
        ycoord = gameState[i].indexOf(1);
        if (ycoord != -1) {
            xcoord = i;
            break;
        }
    }
    // move them down
    coords = [xcoord, ycoord];
    if (button === "ArrowDown") {
        move(coords, "down");
    } else if (button === "ArrowUp") {
        move(coords, "up");
    } else if (button === "ArrowLeft") {
        move(coords, "left");
    } else if (button === "ArrowRight") {
        move(coords, "right");
    }
}, false);

function drawBlock() {
    //draws a basic block at the starter square
    var position = [0, gridWidth / 2];
    fillCell(position[0], position[1]);
}

function moveDown(coord) {
    // to move down, empty the cell at coordinates
    // let oldCell = document.querySelector(`[data-x=${coord[0]}] [data-y=${coord[1]}]`);
    emptyCell(coord[0], coord[1]);
    // increment the row value
    coord[0]++;
    // fill cell at incremented value
    fillCell(coord[0], coord[1]);
}
function move(coord, direction) {
    // to move, empty the cell at coordinates
    // let oldCell = document.querySelector(`[data-x=${coord[0]}] [data-y=${coord[1]}]`);
    emptyCell(coord[0], coord[1]);
    let newX;
    let newY;
    switch (direction) {
        case "up":
            // decrement the row value
            coord[0]--;
            break;
        case "down":
            // increment the row value
            coord[0]++;
            break;
        case "left":
            // increment the column value
            coord[1]--;
            break;
        case "right":
            // increment the column value
            coord[1]++;
            break;
    }
    // fill cell at incremented value
    fillCell(coord[0], coord[1]);
}

function emptyCell(cellRowIndex, cellNumberIndex) {
    let targetCell = document.querySelector(`[data-x='${cellRowIndex}'][data-y='${cellNumberIndex}']`)
    targetCell.classList.remove("filled");
    targetCell.classList.add("empty");
}

function fillCell(cellRowIndex, cellNumberIndex) {
    let targetCell = document.querySelector(`[data-x='${cellRowIndex}'][data-y='${cellNumberIndex}']`)
    targetCell.classList.add("empty");
    targetCell.classList.remove("filled");
}

function getGameState() {
    // retruns an array of rows with infomation on where blocks are
    var gameState = [];
    var rows = document.getElementsByClassName('game-box-row');
    for (row of rows) {
        var gameRow = [];
        // // convert to an array using Array.from()
        Array.from(row.children).forEach(function (cell) {
            if (cell.className.includes('empty')) {
                gameRow.push(0);
            } else {
                gameRow.push(1);
            }
        });
        gameState.push(gameRow);
    }
    return gameState;
}