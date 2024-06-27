//edit DOM================================
const displayController = (function() {
    //DOM cache
    const allSquares = document.querySelectorAll(".game-square");
    const currentTurn = document.querySelector("#current-turn");
    const resetBtn = document.querySelector("#reset-btn");
    const allContent =document.querySelector(".content"); 

    //event listeners
    //run turn on square click
    allSquares.forEach((square) => {
        square.addEventListener("click", function() {
            const posID = square.getAttribute("id");
            gameFlow.playerTurn(posID);
        });
    });

    resetBtn.addEventListener("click", function() {
        resetGame();
    });

    //functions
    function updateSquare(pos, player) {
        document.getElementById(pos).textContent = player;
    }

    function updateBackground(player) {
        if (player === "X") {
            allContent.classList.remove("o-background");
            allContent.classList.add("x-background");
        } else {
            allContent.classList.remove("x-background");
            allContent.classList.add("o-background");
        }
    }

    function resetGame() {
        Gameboard.gameboard.forEach((square, index, array) => {
            array[index] = "-";
        });
        allSquares.forEach((square) => {
            square.textContent = "";
        });
        gameFlow.resetGame();
    }

    return {updateSquare, resetGame, updateBackground};
})();

//store gameboard and updates in array================================
const Gameboard = (function() {
    const gameboard = [];   
    
    //initialize gameboard
    const makeGameboard = (function() {
        for (i = 1; i <=9; i++) {
            gameboard.push("-");
        }
    })();

    //for console testing
    function showGameboard() {
        console.log("========");
        console.log(Gameboard.gameboard[0], Gameboard.gameboard[1], Gameboard.gameboard[2]);
        console.log(Gameboard.gameboard[3], Gameboard.gameboard[4], Gameboard.gameboard[5]);
        console.log(Gameboard.gameboard[6], Gameboard.gameboard[7], Gameboard.gameboard[8]);
    }

    return {gameboard, showGameboard, makeGameboard};
})();

//game controls and trackers================================
const gameFlow = (function() {
    let turnCounter = 0;
    let winner;
    let whosTurn = "X";

    function playerTurn(pos) {
        let player = whosTurn;
        if  (winner === undefined && Gameboard.gameboard[pos] === "-") {
                Gameboard.gameboard[pos] = player;
                // Gameboard.showGameboard();
                winner = getWinner();
                displayController.updateSquare(pos, player);
                
                turnCounter++;
                
                if (turnCounter === 9 && winner === undefined) {
                    console.log("TIE");
                }
                if (whosTurn === "X") {whosTurn = "O";} 
                else {whosTurn = "X"}
                displayController.updateBackground(whosTurn);
            }
    }
        
    function getWinner() {
        let winner;
        if (getMatch3Winner() === "leftVert" ||
            getMatch3Winner() === "topHorz") {
            winner = Gameboard.gameboard[0];
        } 
        if (getMatch3Winner() === "cenVert" ||
            getMatch3Winner() === "cenHorz" ||
            getMatch3Winner() === "backDiag"||
            getMatch3Winner() === "forDiag") {
                winner = Gameboard.gameboard[4];
            }
        if (getMatch3Winner() === "rightVert" ||
            getMatch3Winner() === "botHorz") {
                winner = Gameboard.gameboard[8];
        }
        if (winner !== undefined) {
            console.log(winner + " is the winner!");
            console.log("winPos: " + gameFlow.getMatch3Winner()); //maybe for css
        }
        return winner;
    }
    
    function getMatch3Winner() {
        let checkMatchObj = {
            leftVert    : checkMatch3(0, 3, 6),
            cenVert     : checkMatch3(1, 4, 7),
            rightVert   : checkMatch3(2, 5, 8),
            topHorz     : checkMatch3(0, 1, 2),
            cenHorz     : checkMatch3(3, 4, 5),
            botHorz     : checkMatch3(6, 7, 8),
            backDiag    : checkMatch3(0, 4, 8),
            forDiag     : checkMatch3(6, 4, 2),
        }
        
        let winPos;
        for (let possWin in checkMatchObj) {
            if (checkMatchObj[possWin]) {
                winPos = possWin;
            }
        }
        return winPos;
    }
    
    function checkMatch3(pos1, pos2, pos3) {
        let p1 = Gameboard.gameboard[pos1];
        let p2 = Gameboard.gameboard[pos2];
        let p3 = Gameboard.gameboard[pos3];
        if (p1 !== "-" && p2 !== "-" && p3 !== "-") {
            return (p1 === p2 && p2 === p3);
        }
    }

    function resetGame() {
        turnCounter = 0;
        whosTurn = "X";
        winner = undefined;
        displayController.updateBackground(whosTurn);
    }

    return {playerTurn, getMatch3Winner, resetGame};
})();

//testing
// Gameboard.showGameboard();
// console.log("winPos: " + gameFlow.getMatch3Winner());

