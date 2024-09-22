let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let backBtn = document.getElementById('backBtn') // Back button
let boxes = Array.from(document.getElementsByClassName('box'))
let modeSelection = document.getElementById('modeSelection')
let gameboard = document.getElementById('gameboard')

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let isComputerMode = false

document.getElementById('multiplayerBtn').addEventListener('click', () => {
    isComputerMode = false;
    startGame();
});

document.getElementById('computerBtn').addEventListener('click', () => {
    isComputerMode = true;
    startGame();
});

// Start game and show gameboard
const startGame = () => {
    modeSelection.style.display = 'none';
    gameboard.style.display = 'grid'; // Change to grid to show the boxes
    restartBtn.style.display = 'block';
    backBtn.style.display = 'block'; // Show back button
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.addEventListener('click', boxClicked);
    });
    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
}

// Back button functionality
backBtn.addEventListener('click', () => {
    modeSelection.style.display = 'block'; // Show mode selection
    gameboard.style.display = 'none'; // Hide gameboard
    restartBtn.style.display = 'none'; // Hide restart button
    backBtn.style.display = 'none'; // Hide back button
    spaces.fill(null); // Reset spaces
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    playerText.innerHTML = 'Tic Tac Toe'; // Reset player text
});

function boxClicked(e) {
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        if (checkDraw()) {
            playerText.innerHTML = "It's a draw!"
            return
        }

        currentPlayer = isComputerMode ? O_TEXT : (currentPlayer === X_TEXT ? O_TEXT : X_TEXT); // Switch player or to AI
        if (isComputerMode && currentPlayer === O_TEXT) {
            setTimeout(aiMove, 800); // Delay AI move by 0.8 seconds
        }
    }
}

function aiMove() {
    const availableSpaces = spaces.map((space, index) => space === null ? index : null).filter(index => index !== null)

    if (availableSpaces.length > 0) {
        const aiChoice = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        spaces[aiChoice] = currentPlayer
        boxes[aiChoice].innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        if (checkDraw()) {
            playerText.innerHTML = "It's a draw!"
            return
        }

        currentPlayer = X_TEXT // Switch back to player
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

function checkDraw() {
    return spaces.every(space => space !== null) && playerHasWon() === false;
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    playerText.innerHTML = 'Tic Tac Toe'
    currentPlayer = X_TEXT
}

