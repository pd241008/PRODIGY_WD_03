let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

function handleClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        event.target.innerText = currentPlayer;
        checkWinner();
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            document.getElementById('message').innerText = '';
            displayWinner(`Player ${gameBoard[a]} wins!`);
            gameActive = false;
            highlightWinningCells(pattern);
            return;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        displayWinner('It\'s a draw!');
        gameActive = false;
    }
}

function displayWinner(message) {
    const winnerMessageElement = document.getElementById('winner-message');
    winnerMessageElement.innerText = message;
    winnerMessageElement.classList.add('winner-message');
}

function highlightWinningCells(pattern) {
    for (const index of pattern) {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.style.backgroundColor = '#6effa1'; // You can adjust the color as needed
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = Array(9).fill('');
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '';
    });

    document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
    document.getElementById('winner-message').innerText = '';
    document.getElementById('winner-message').classList.remove('winner-message');
}

// Initialize the game
resetGame();
