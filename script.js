const Gameboard = (function() {
    const gameboard = [];   
    for (i = 1; i <=9; i++) {
        gameboard.push("-");
    }
    //for console testing
    function showGameboard() {
        console.log("========");
        console.log(Gameboard.gameboard[0], Gameboard.gameboard[1], Gameboard.gameboard[2]);
        console.log(Gameboard.gameboard[3], Gameboard.gameboard[4], Gameboard.gameboard[5]);
        console.log(Gameboard.gameboard[6], Gameboard.gameboard[7], Gameboard.gameboard[8]);
    }
    return {gameboard, showGameboard};
})();

const gameFlow = (function() {
    let turnCounter = 0;
    let winner;


    function playerTurn(player, pos) {
        if  (winner === undefined && 
            Gameboard.gameboard[pos] === "-" && 
            (player === "X" || player === "O") &&
            (pos >= 0 && pos <= 8)) {
                Gameboard.gameboard[pos] = player;
                Gameboard.showGameboard();
                winner = getWinner();
            }

        turnCounter++;
        if (turnCounter === 9 && winner === undefined) {
            console.log("TIE");
        }
    }
        
    function getWinner() {
        let winner;
        // if (checkTie()) {winner = "tie"}
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
        }


        return winner;
    }

    // function checkTie() {
    //     Gameboard.gameboard.forEach((pos) => {
    //         if (pos === "-") {
    //             break;
    //             return true;
    //         }
    //     });
    // }

    
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

    return {playerTurn, getMatch3Winner, turnCounter};
})();




//testing
Gameboard.showGameboard();
gameFlow.playerTurn("X", 0);
gameFlow.playerTurn("O", 1);
gameFlow.playerTurn("X", 2);
gameFlow.playerTurn("O", 3);
gameFlow.playerTurn("X", 4);
gameFlow.playerTurn("O", 5);
gameFlow.playerTurn("X", 6);
gameFlow.playerTurn("O", 7);
gameFlow.playerTurn("X", 8);

console.log("winPos: " + gameFlow.getMatch3Winner());


