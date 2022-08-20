let Gameboard = (() => {

    let playerFactory = (name, mark) => {
        return {name, mark};
    }
    
    let player1;
    let player2;

    let _gameboard = [ null, null, null, null, null, null, null, null, null] ;
    let _nextSign = 'X';    
    
    const divGameboard = document.getElementById('container-gameboard');
    const playSquares = document.querySelectorAll(".playSquare");
    const startButton = document.getElementById('button-start-game');
    const resetButton = document.getElementById('button-reset-game');
    const labelPlayerFirst = document.getElementById('label-player1-name');
    const labelPlayerSecond = document.getElementById('label-player2-name');
    const headerGameStatus = document.getElementById('h3-game-status');
    
    // Start Button
    startButton.addEventListener('click', function () {
        setPlayerNames();
        enableGameBoard();
        resetGame();
        renderGameboard();
        
    });  

    // Reset Button
    resetButton.addEventListener('click', function () {
        resetGame();
        renderGameboard();
    });

    const setPlayerNames = () => {
        let inputFirstPlayerName = (document.getElementById('player1-name').value == "" || document.getElementById('player1-name').value == null) ? "Player-1" : document.getElementById('player1-name').value;
        let inputSecondPlayerName = (document.getElementById('player2-name').value == "" || document.getElementById('player2-name').value == null) ? "Player-2" : document.getElementById('player2-name').value;        
        player1 = playerFactory(inputFirstPlayerName, 'X');
        player2 = playerFactory(inputSecondPlayerName, 'O');   
        labelPlayerFirst.innerText = player1.name;
        labelPlayerSecond.innerText = player2.name;
    }

    const enableGameBoard = () => {
        divGameboard.classList.remove('container-gameboard-disabled');
    }

    const updateGameStatus = () => {        
        headerGameStatus.innerHTML = (_nextSign === 'X' ? player1.name : player2.name) + " Goes Next!";        
    }

    const toggleNextSign = () => {
        _nextSign === 'X' ? _nextSign = 'O' : _nextSign = 'X';        
    }

    const renderGameboard = () => {
        for(let i=1; i<=9; i++) {
            document.getElementById(i).innerHTML = _gameboard[i-1];
        }        
    }   

    const checkWinCondition = () => {
        if(
            _gameboard[0] === _gameboard[1] && _gameboard[1] === _gameboard[2] && _gameboard[0] !== null && _gameboard[1] !== null && _gameboard[2] !== null ||
            _gameboard[3] === _gameboard[4] && _gameboard[4] === _gameboard[5] && _gameboard[3] !== null && _gameboard[4] !== null && _gameboard[5] !== null ||
            _gameboard[6] === _gameboard[7] && _gameboard[7] === _gameboard[8] && _gameboard[6] !== null && _gameboard[7] !== null && _gameboard[8] !== null ||
            _gameboard[0] === _gameboard[3] && _gameboard[3] === _gameboard[6] && _gameboard[0] !== null && _gameboard[3] !== null && _gameboard[6] !== null ||
            _gameboard[1] === _gameboard[4] && _gameboard[4] === _gameboard[7] && _gameboard[1] !== null && _gameboard[4] !== null && _gameboard[7] !== null ||
            _gameboard[2] === _gameboard[5] && _gameboard[5] === _gameboard[8] && _gameboard[2] !== null && _gameboard[5] !== null && _gameboard[8] !== null ||
            _gameboard[0] === _gameboard[4] && _gameboard[4] === _gameboard[8] && _gameboard[0] !== null && _gameboard[4] !== null && _gameboard[8] !== null ||
            _gameboard[2] === _gameboard[4] && _gameboard[4] === _gameboard[6] && _gameboard[2] !== null && _gameboard[4] !== null && _gameboard[6] !== null
            
        ){            
            return true;
        } else{
            return(checkForTie() ? "tie" : false)
        }
        
    }

    const checkForTie = () => {
        for(let i=0; i<_gameboard.length; i++) {
            if(_gameboard[i] === null){
                return false;
            }
        }
        return true;
    }

    const handleUserTurn = () => {         
        playSquares.forEach(function (playSqr){            
            playSqr.addEventListener('click', function(){
                if(_gameboard[playSqr.id-1] === null){
                    updateGameBoard(playSqr.id-1);                                   
                    renderGameboard();
                    updateGameStatus();
                }
            })
        });
    }
    
    const updateGameBoard = (_playerSquare) => {
        _gameboard[_playerSquare] = _nextSign;   
        let _result = checkWinCondition(); 
        if(_result === true){
            let winner = (player1.mark === _nextSign ? player1.name : player2.name);            
            alert("We have a winner! " + winner);           
            resetGame();
        } else if(_result === "tie") {
            alert("We have a tie! ");
            resetGame();
        }
        else{
            toggleNextSign();
        }        
    }

    const resetGame = () => {             
        _gameboard = [ null, null, null, null, null, null, null, null, null] ;
        _nextSign = 'X'; 
        updateGameStatus();        
    }  

    const playGame = () => {
        renderGameboard();
        handleUserTurn();        
    }

    return {
        playGame
    }

})();

Gameboard.playGame();