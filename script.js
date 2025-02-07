const choices = document.querySelectorAll('.choice');
const resultText = document.querySelector('.result p');
const exampleText = document.querySelector('.example-text');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');

let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', function() {
        const playerChoice = this.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        updateScores(winner);
        displayResult(playerChoice, computerChoice, winner);
        displayExample(playerChoice, computerChoice);
        // Check if any player has reached a score of 5
        if (playerScore === 5 || computerScore === 5) {
            endGame();
        } 
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) return 'draw';
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'player';
    } else {
        return 'computer';
    }
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
}

function displayResult(player, computer, winner) {
    const resultMap = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };

    const playerEmoji = resultMap[player];
    const computerEmoji = resultMap[computer];

    if (winner === 'draw') {
        resultText.innerHTML = `It's a draw!<br>${playerEmoji} vs ${computerEmoji}`;
    } else if (winner === 'player') {
        resultText.innerHTML = `You win!<br>${playerEmoji} vs ${computerEmoji}`;
    } else {
        resultText.innerHTML = `You lose!<br>${playerEmoji} vs ${computerEmoji}`;
    }
}


function displayExample(player, computer) {
    const rules = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (player === computer) {
        exampleText.textContent = '';
    } else if (rules[player] === computer) {
        exampleText.textContent = ` ${player} beats ${computer}.`;
    } else {
        exampleText.textContent = ` ${computer} beats ${player}.`;
    }
}

function endGame() {
    let winnerMessage;
    if (playerScore === 5) {
        winnerMessage = "Congratulations! You won the game! 🎉";
    } else {
        winnerMessage = "Computer won the game. Better luck next time! 😢";
    }

    // Show alert box with the winner message
    alert(winnerMessage);

    // Reset the game
    resetGame();
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
    resultText.innerHTML = "Choose an option to start the game!";
    exampleText.textContent = "";
}