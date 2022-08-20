let Gameboard = (() => {

    let playerFactory = (name, mark) => {
        return {name, mark};
    }
    
    const player1 = playerFactory("Player1", 'X');
    const player2 = playerFactory("Player2", 'O');
        

    let _gameboard = [ null, null, null, null, null, null, null, null, null] ;
    let _nextSign = 'X';
    // let flowControlObject;
    let playSquares = document.querySelectorAll(".playSquare");

    function toggleNextSign(){        
        _nextSign === 'X' ? _nextSign = 'O' : _nextSign = 'X';        
    }

    function renderGameboard() {
        for(let i=1; i<=9; i++) {
            document.getElementById(i).innerHTML = _gameboard[i-1];
        }        
    }   

    function checkWinCondition () {
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

    function checkForTie() {
        for(let i=0; i<_gameboard.length; i++) {
            if(_gameboard[i] === null){
                return false;
            }
        }
        return true;
    }

    function handleUserTurn (){        
        playSquares.forEach(function (playSqr){            
            playSqr.addEventListener('click', function(){
                if(_gameboard[playSqr.id-1] === null){
                    updateGameBoard(playSqr.id-1);
                    // _gameboard[playSqr.id-1] = _nextSign;                    
                    renderGameboard();
                }
            })
        });
    }
    
    function updateGameBoard(_playerSquare) {
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

    function resetGame(){
        _gameboard = [ null, null, null, null, null, null, null, null, null] ;
        _nextSign = 'X';
    }

    return {
        renderGameboard,
        handleUserTurn
    }

})();

Gameboard.renderGameboard();
Gameboard.handleUserTurn();