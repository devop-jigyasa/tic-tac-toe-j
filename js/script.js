// Select necessary elements from the DOM
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset-btn");

// Game State Variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Array of all possible winning combinations (indexes of the 3x3 grid)
const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal 1
    [2, 4, 6]  // diagonal 2
];

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    // We retrieve the cell's index from its data-index attribute
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // If the game is over or the cell is already filled, ignore the click
    if (!gameActive || board[cellIndex] !== "") {
        return;
    }

    // Update the game state array
    board[cellIndex] = currentPlayer;

    // Update the UI
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add("taken");
    
    if (currentPlayer === "X") {
        clickedCell.classList.add("x-symbol");
    } else {
        clickedCell.classList.add("o-symbol");
    }

    // Check if the current move won the game or resulted in a draw
    checkWinner();
}

// Function to check if there is a winner or draw
function checkWinner() {
    let roundWon = false;

    // Loop through all winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        
        // Get the values from our board array
        const cellA = board[winCondition[0]];
        const cellB = board[winCondition[1]];
        const cellC = board[winCondition[2]];

        // If any cell in the combination is empty, skip to next combination
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // If all three match, a player has won
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    // Handle Win
    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check for a Draw if no one won
    checkDraw();
}

// Function to check if the game ended in a draw
function checkDraw() {
    // Check if there are no empty strings left in our board array
    const isDraw = !board.includes("");

    if (isDraw && gameActive) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    // If game is not won or drawn, it's the next player's turn
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

// Function to restart the game and reset all states
function resetGame() {
    // Reset state variables
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    
    // Reset status text
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
    
    // Clear all cells on the board UI and remove classes
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("taken", "x-symbol", "o-symbol");
    });
}

// Attach click event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

// Attach click event listener to the reset button
resetButton.addEventListener("click", resetGame);
