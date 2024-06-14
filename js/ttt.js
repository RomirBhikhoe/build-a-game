//Alles ophalen
const grid = document.querySelector(".ttt");
const popupWinX = document.getElementById("pop-up-x");
const popupWinO = document.getElementById("pop-up-o");
const popupTie = document.getElementById("tie");
const popupPointX = document.getElementById("point-for-x");
const popupPointO = document.getElementById("point-for-o");
const closeButtonX = document.getElementById("close-btn-x");
const closeButtonO = document.getElementById("close-btn-o");
const continueBtnX = document.getElementById("close-point-x");
const continueBtnO = document.getElementById("close-point-o");
const closeTie = document.getElementById("close-tie");
const scoreX = document.querySelector(".scoreX");
const scoreO = document.querySelector(".scoreO");
const xPoints = document.querySelector(".pointsX");
const oPoints = document.querySelector(".pointsO");
const reset = document.querySelector(".but");
const home = document.querySelector(".home");

//Elk apart vakje creëren
const tile1 = document.createElement("div");
const tile2 = document.createElement("div");
const tile3 = document.createElement("div");
const tile4 = document.createElement("div");
const tile5 = document.createElement("div");
const tile6 = document.createElement("div");
const tile7 = document.createElement("div");
const tile8 = document.createElement("div");
const tile9 = document.createElement("div");

//array van vakjes voor de loop om de vakjes later onklikbaar te maken
const tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];

//Elke class van elk vakje aanmaken
tile1.classList.add("tile");
tile2.classList.add("tile2");
tile3.classList.add("tile3");
tile4.classList.add("tile4");
tile5.classList.add("tile5");
tile6.classList.add("tile6");
tile7.classList.add("tile7");
tile8.classList.add("tile8");
tile9.classList.add("tile9");

//Elk vakje zichtbaar maken
grid.appendChild(tile1);
grid.appendChild(tile2);
grid.appendChild(tile3);
grid.appendChild(tile4);
grid.appendChild(tile5);
grid.appendChild(tile6);
grid.appendChild(tile7);
grid.appendChild(tile8);
grid.appendChild(tile9);

let flag = 1;
let pointsX = 0;
let pointsO = 0;

//prompt voor naam invoer 
let p1Name = prompt("Player X username:");
let p2Name = prompt("Player O username:");

scoreX.innerHTML = "<b>Score&nbsp;"+p1Name+"(x):</b>&nbsp;"
scoreO.innerHTML = "<b>Score&nbsp;"+p2Name+"(o):</b>&nbsp;"

//Maakt elk vakje weer klikbaar nadat een speler een punt krijgt
function addClickHandlers() {
    tiles.forEach(function(tile) {
        tile.addEventListener("click", clickHandler);
    });
}

//Reset elk vakje nadat je op "continue" klikt
function clearTiles() {
    tiles.forEach(function(tile) {
        tile.innerHTML = "";
    });
}

reset.addEventListener("click", function() {
    clearTiles()
    addClickHandlers()
});

home.addEventListener("click", function() {
    window.location.href = "mainscreen.html"
});

//Maakt elk vakje onklikbaar nadat je erop hebt geklikt
function clickHandler(event) {
    if (flag == 1) {
        event.target.innerHTML = "x";
        event.target.removeEventListener("click", clickHandler);
        flag = 0;
    } else {
        event.target.innerHTML = "O";
        event.target.removeEventListener("click", clickHandler);
        flag = 1;
    }

    //Kijkt of een speler wint na elke zet en zorgt ervoor dat de andere vakjes niet meer klikbaar worden als iemand een punt erbij krijgt
    if (checkForWinX()) {
        pointsX++;
        scoreX.innerHTML = "<b>Score&nbsp;"+p1Name+"(x):</b>&nbsp;"+pointsX;
        popupPointX.style.display = "block"; 
        xPoints.innerHTML = p1Name+"&nbsp; now has &nbsp;"+pointsX+"&nbsp;point(s)"
        tiles.forEach(function(tile) {
            tile.removeEventListener("click", clickHandler);
        });
        continueBtnX.addEventListener("click", function() {
            popupPointX.style.display = "none";
            clearTiles()
            addClickHandlers()
        });
    }

    if (pointsX == 5) {
        popupWinX.style.display = "block";
    }

    if (checkForWinO()) {
        pointsO++;
        scoreO.innerHTML = "<b>Score&nbsp;"+p2Name+"(o):</b>&nbsp;"+pointsO;
        popupPointO.style.display = "block"; 
        oPoints.innerHTML = p2Name+"&nbsp; now has &nbsp;"+pointsO+"&nbsp;point(s)"
        tiles.forEach(function(tile) {
            tile.removeEventListener("click", clickHandler);
        });
        continueBtnO.addEventListener("click", function() {
            popupPointO.style.display = "none";
            clearTiles()
            addClickHandlers()
        });
    }

    if (pointsO == 5) {
        popupWinO.style.display = "block"; 
    }

    if (checkForTie()) {
        popupTie.style.display = "block";
    }
}



//Zorgt ervoor dat de win popup weg gaat nadat je op "close" klikt
closeButtonX.addEventListener("click", function() {
    popupWinX.style.display = "none";
    window.location.reload();
})

closeButtonO.addEventListener("click", function() {
    popupWinO.style.display = "none";
    window.location.reload();
})



function checkForWinX() {
    //Kijken of horizontaal heeft gewonnen
    if (
        (tile1.innerHTML === "x" && tile2.innerHTML === "x" && tile3.innerHTML === "x") ||
        (tile4.innerHTML === "x" && tile5.innerHTML === "x" && tile6.innerHTML === "x") ||
        (tile7.innerHTML === "x" && tile8.innerHTML === "x" && tile9.innerHTML === "x")
    ) {
        return true;
    }

    //Kijken of verticaal heeft gewonnen
    if (
        (tile1.innerHTML === "x" && tile4.innerHTML === "x" && tile7.innerHTML === "x") ||
        (tile2.innerHTML === "x" && tile5.innerHTML === "x" && tile8.innerHTML === "x") ||
        (tile3.innerHTML === "x" && tile6.innerHTML === "x" && tile9.innerHTML === "x")
    ) {
        return true;
    }

    //Kijken of diagonaal heeft gewonnen
    if (
        (tile1.innerHTML === "x" && tile5.innerHTML === "x" && tile9.innerHTML === "x") ||
        (tile3.innerHTML === "x" && tile5.innerHTML === "x" && tile7.innerHTML === "x")
    ) {
        return true;
    }

    return false;
}

function checkForWinO() {
    //Kijken of horizontaal heeft gewonnen
    if (
        (tile1.innerHTML === "O" && tile2.innerHTML === "O" && tile3.innerHTML === "O") ||
        (tile4.innerHTML === "O" && tile5.innerHTML === "O" && tile6.innerHTML === "O") ||
        (tile7.innerHTML === "O" && tile8.innerHTML === "O" && tile9.innerHTML === "O")
    ) {
        return true;
    }

    //Kijken of verticaal heeft gewonnen
    if (
        (tile1.innerHTML === "O" && tile4.innerHTML === "O" && tile7.innerHTML === "O") ||
        (tile2.innerHTML === "O" && tile5.innerHTML === "O" && tile8.innerHTML === "O") ||
        (tile3.innerHTML === "O" && tile6.innerHTML === "O" && tile9.innerHTML === "O")
    ) {
        return true;
    }

    //Kijken of diagonaal heeft gewonnen
    if (
        (tile1.innerHTML === "O" && tile5.innerHTML === "O" && tile9.innerHTML === "O") ||
        (tile3.innerHTML === "O" && tile5.innerHTML === "O" && tile7.innerHTML === "O")
    ) {
        return true;
    }

    return false;
}

function checkForTie() {
    if (
        (tile1.innerHTML !== "" && tile2.innerHTML !== "" && tile3.innerHTML !== "") &&
        (tile4.innerHTML !== "" && tile5.innerHTML !== "" && tile6.innerHTML !== "") &&
        (tile7.innerHTML !== "" && tile8.innerHTML !== "" && tile9.innerHTML !== "") 
    ) {
        return true;
    }

    return false;
}

closeTie.addEventListener("click", function() {
    popupTie.style.display = "none";
})

tile1.addEventListener("click", clickHandler);
tile2.addEventListener("click", clickHandler);
tile3.addEventListener("click", clickHandler);
tile4.addEventListener("click", clickHandler);
tile5.addEventListener("click", clickHandler);
tile6.addEventListener("click", clickHandler);
tile7.addEventListener("click", clickHandler);
tile8.addEventListener("click", clickHandler);
tile9.addEventListener("click", clickHandler);







