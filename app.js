/*
PIG GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- The player looses his current score when one of the dices is 1. After that, it's the next player's turn
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- In the input field players can change the winning score. The first player to reach the specified winning score or 100 points (if the default winning score was not changed) on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dices, previousRoll, winningScore;     //declare all global scope variables

init();
function init(){
    gamePlaying = true;
    scores = [0,0];
    dices = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = [0,0];
    document.getElementById("winning-score").value = 100;
    //Set all elements to 0 value
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    //Hide dices and notifications
    hideDices();
    document.querySelectorAll('.rolled-one-0, .rolled-one-1, .rolled-two-six-0, .rolled-two-six-1').forEach(function(e) {e.style.visibility = 'hidden'}); 

    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2'; 
    document.getElementById('name-0').classList.remove('winner'); 
    document.getElementById('name-1').classList.remove('winner'); 
    document.querySelector('.player-0-panel').classList.remove('active'); 
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.add('active'); 
};

//The Roll Button Settings
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
    //1. Random dice numner
    dices[0] = Math.floor(Math.random() * 6) + 1;  
    dices[1] = Math.floor(Math.random() * 6) + 1; 
    //2. Display the result
    var diceDOM = [document.querySelector('.dice-0'), document.querySelector('.dice-1')]; // save 'dices' value in DOM and for the 'diceDOM' variable
    document.querySelector('.dice-0').style.display = 'block'; // hide dice on the game first load
    document.querySelector('.dice-1').style.display = 'block'; 
    diceDOM[0].src = 'dice-' + dices[0] + '.png';
    diceDOM[1].src = 'dice-' + dices[1] + '.png';
    
    // A player looses his ENTIRE score when rolls two 6 in a row. After that, it's the next player's turn. 
    if (((dices[0] === 6) || (dices[1] === 6)) && ((previousRoll[0] === 6) || (previousRoll[1] === 6))) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('.rolled-two-six-' + activePlayer).style.visibility = 'visible';
        nextPlayer();
    } else if ((dices[0] !== 1) && (dices[1] !== 1)) {
    //3. Update the roundScore IF the rolled number was NOT a 1
        //Add score
        roundScore += dices[0] + dices[1];
        //Display the random number for the active player current score
        document.querySelector('#current-' + activePlayer).textContent = roundScore;  
    } else {
        document.querySelector('.rolled-one-' + activePlayer).style.visibility = 'visible';
        nextPlayer();
    }
    previousRoll = [dices[0], dices[1]];
  }
});

//The Hold Button Settings
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        document.querySelector('.rolled-one-' + activePlayer).style.visibility = 'hidden';
        document.querySelector('.rolled-two-six-' + activePlayer).style.visibility = 'hidden';
        //Add current score to the global score
        scores[activePlayer] += roundScore; 
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Input field for the winning score
    var input = document.getElementById("winning-score").value; 
    // Undefined, 0, null or "" are COERCED to false
    // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
    //If the player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'winner!'; 
        document.querySelector('#name-' + activePlayer).classList.add('winner'); 
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');  
        hideDices();
        gamePlaying = false;
    } else {
        nextPlayer();
    }
    } 
});

//The New Button Settings
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    //Next player
    //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  //ternary condition; below the same function in a different format
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //Switch the 'active' class between players
    document.querySelector('.player-0-panel').classList.toggle('active');  
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hide dice when players switch
    //hideDices(); 
    document.querySelector('.rolled-one-' + activePlayer).style.visibility = 'hidden';
    document.querySelector('.rolled-two-six-' + activePlayer).style.visibility = 'hidden';
};

function hideDices() {
    document.querySelector('.dice-0').style.display = 'none'; 
    document.querySelector('.dice-1').style.display = 'none';
};