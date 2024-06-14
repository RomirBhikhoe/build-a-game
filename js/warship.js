const playerGrid = document.querySelector(".player-warships");
const enemyGrid = document.querySelector(".enemy-warships");
const winner = document.querySelector(".winner");
const display = document.querySelector(".player-points");
const displayTwo = document.querySelector(".enemy-points");
const fireMode = document.querySelector(".fire-mode-btn");
const hideShips = document.querySelector(".hide-ships");
const userOne = document.querySelector(".player-one-username");
const userTwo = document.querySelector(".player-two-username");
const enemyShipPositions = [];
const playerShipPositions = [];
const sunkPlayerShips = [];
const sunkEnemyShips = [];
let plrPoints = 0;
let enemyPoints = 0;
let turn = "Player";
let gameMode = "ship-placement";

// Player 1 username
let plrOneName = prompt("Speler 1, typ een naam.");
display.innerHTML = `${plrOneName} punten:`

// Player 2 username
let plrTwoName = prompt("Speler 2, typ een naam.");
displayTwo.innerHTML = `${plrTwoName} punten:`

// Adding player grid
for (let i = 0; i < 100; i++) {
    const tile = document.createElement("div");
    tile.addEventListener("click", function () {
        console.log(turn);
        console.log(gameMode);

        if (turn === "Player") {
            if (gameMode === "ship-placement") {
                if (!playerShipPositions.includes(i)) {
                    tile.classList.add("ship");
                    playerShipPositions.push(i);
                    console.log(playerShipPositions);
                    if (playerShipPositions.length === 5) {
                        turn = "Enemy";
                    }
                }
            }
        }

        if (turn === "Enemy") {
            if (gameMode === "fire-mode") {
                if (playerShipPositions.includes(i)) {
                    tile.classList.add("hit");
                    tile.classList.remove("ship");
                    sunkPlayerShips.push(i);
                    console.log(i);
                    enemyPoints++;
                    addEnemyPoints();
                    if (sunkPlayerShips.length === 5) {
                        winner.innerHTML = `${plrOneName} heeft de spel verloren!`;
                        setTimeout(function(){
                            location.reload();
                        }, 5000);
                    }
                } else {
                    tile.classList.add("miss");
                    turn = "Player";
                }
            }
        }
    });
   tile.classList.add("player-grid");
   playerGrid.appendChild(tile);

   hideShips.addEventListener("click", function() {
    if (playerShipPositions.includes(i)) {
        tile.classList.toggle("ship");
    }
});
}

// Adding enemy grid
for (let i = 0; i < 100; i++) {
    const tile = document.createElement("div");
    tile.addEventListener("click", function () {
        console.log(turn);
        console.log(gameMode);

        if (turn === "Enemy") {
            if (gameMode === "ship-placement") {
                if (!enemyShipPositions.includes(i)) {
                    tile.classList.add("ship");
                    enemyShipPositions.push(i);
                    console.log(enemyShipPositions);
                    if (enemyShipPositions.length === 5) {
                        turn = "Player";
                    }
                }
            }
        }

        if (turn === "Player") {
            if (gameMode === "fire-mode") {
                if (enemyShipPositions.includes(i)) {
                    tile.classList.add("hit");
                    tile.classList.remove("ship");
                    sunkEnemyShips.push(i);
                    plrPoints++;
                    addPlayerPoints();
                    if (sunkEnemyShips.length === 5) {
                        winner.innerHTML = `${plrTwoName} heeft de spel verloren!`;
                        setTimeout(function(){
                            location.reload();
                        }, 5000);
                    }
                } else {
                    tile.classList.add("miss");
                    turn = "Enemy";
                }
            }
        }
    });
    tile.classList.add("enemy-grid");
    enemyGrid.appendChild(tile);

    hideShips.addEventListener("click", function() {
        if (enemyShipPositions.includes(i)) {
            tile.classList.toggle("ship");
        }
    });
}



// Gamemode
fireMode.addEventListener("click", function(){
    gameMode = "fire-mode";
    console.log(gameMode);
});

// Player points
function addPlayerPoints() {
    display.innerHTML = `${plrOneName} punten: ${plrPoints}`;
}

// Enemy points
function addEnemyPoints() {
    displayTwo.innerHTML = `${plrTwoName} punten: ${enemyPoints}`;
}