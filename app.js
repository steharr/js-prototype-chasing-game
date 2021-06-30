var grid = document.getElementById('game-box');
var gridHeight = 20;
var gridWidth = 10;
var moves = 0;

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
                cell.dataset.x = j;
                cell.dataset.y = i;
                row.appendChild(cell);
            }
            // add row to game-box
            grid.appendChild(row);
        }
    }
    createGameGrid();
    drawBlockGoodie();
    drawBlockBaddie();
});

// controls for moving goodie
document.addEventListener('keydown', (event) => {
    var xcoord;
    var ycoord;
    var coords = [];
    var button = event.key;
    // get the coordinates of the block
    let gameState = getGameState();
    for (let i = 0; i < gameState.length; i++) {
        xcoord = gameState[i].indexOf(1);
        if (xcoord != -1) {
            ycoord = i;
            break;
        }
    }
    // move them down
    coords = [xcoord, ycoord];
    if (button === "ArrowDown") {
        move(coords, "down", "goodie");
    } else if (button === "ArrowUp") {
        move(coords, "up", "goodie");
    } else if (button === "ArrowLeft") {
        move(coords, "left", "goodie");
    } else if (button === "ArrowRight") {
        move(coords, "right", "goodie");
    }
    moves++;
    var xcoordBad;
    var ycoordBad;
    var coordsBad = [];

    if (moves % 2 == 0) {    // get the coordinates of the Baddie
        for (let i = 0; i <= gameState.length; i++) {
            xcoordBad = gameState[i].indexOf(2);
            if (xcoordBad != -1) {
                ycoordBad = i;
                break;
            }
        }
        coordsBad = [xcoordBad, ycoordBad];
        var direction = calcNextBaddieMove(coords, coordsBad);
        move(coordsBad, direction, "baddie");
    }
}, false);

// calculate distance from goodie
function calcNextBaddieMove(coordsGood, coordsBad) {
    var xDist;
    var yDist;
    xDist = coordsGood[0] - coordsBad[0];
    yDist = coordsGood[1] - coordsBad[1];

    console.log(Math.abs(xDist));
    console.log(Math.abs(yDist));

    if (Math.abs(xDist) > Math.abs(yDist)) {
        if (xDist > 0) {
            return "right";
        } else if (xDist < 0) {
            return "left";
        }
    } else if (Math.abs(xDist) < Math.abs(yDist)) {
        if (yDist > 0) {
            return "down";
        } else if (yDist < 0) {
            return "up";
        }
    }
}

function drawBlockGoodie() {
    //draws a basic block at the starter square
    var position = [gridWidth / 2, 0];
    fillCell(position[0], position[1], "goodie");
}
function drawBlockBaddie() {
    //draws a basic block at the starter square
    var position = [gridWidth / 2, gridHeight - 1];
    fillCell(position[0], position[1], "baddie");
}

function move(coord, direction, characterType) {
    // to move, empty the cell at coordinates
    emptyCell(coord[0], coord[1], characterType);
    switch (direction) {
        case "up":
            // decrement the row value
            coord[1]--;
            break;
        case "down":
            // increment the row value
            coord[1]++;
            break;
        case "left":
            // increment the column value
            coord[0]--;
            break;
        case "right":
            // increment the column value
            coord[0]++;
            break;
    }
    // fill cell at incremented value
    fillCell(coord[0], coord[1], characterType);
}

function emptyCell(cellXCoord, cellYCoord, characterType = "none") {
    let targetCell = document.querySelector(`[data-x='${cellXCoord}'][data-y='${cellYCoord}']`)

    if (characterType !== "none") {
        targetCell.classList.remove(characterType);
    } else {
        targetCell.classList.remove("filled");
    }

    targetCell.classList.add("empty");
}

function fillCell(cellXCoord, cellYCoord, characterType = "none") {
    let targetCell = document.querySelector(`[data-x='${cellXCoord}'][data-y='${cellYCoord}']`)
    targetCell.classList.remove("empty");

    if (characterType !== "none") {
        targetCell.classList.add(characterType);
    } else {
        targetCell.classList.add("filled");
    }
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
            } else if (cell.className.includes('goodie')) {
                gameRow.push(1);
            } else if (cell.className.includes('baddie')) {
                gameRow.push(2);
            }
        });
        gameState.push(gameRow);
    }
    return gameState;
}