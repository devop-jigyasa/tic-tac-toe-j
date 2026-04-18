// Output message to verify that the script has loaded successfully
console.log("Project initialized");

// Select necessary elements from the DOM
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset-btn");

// Track the current player ("X" starts the game)
let currentPlayer = "X";

// Track if the game is currently active
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

// Function to check if there is a winner
function checkWinner() {
    let roundWon = false;

    // Loop through all winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        
        // Get the text inside the cells for the current combination
        const cellA = cells[winCondition[0]].innerText;
        const cellB = cells[winCondition[1]].innerText;
        const cellC = cells[winCondition[2]].innerText;

        // If any of the cells are empty, we cannot have a winner for this combination
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // If all three cells match, we have a winner
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    // If a winner was found, update the game state and UI
    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return true; // Return true to indicate the game is over
    }
    
    return false; // Return false indicating no winner yet
}

// Function to check if the game ended in a draw
function checkDraw() {
    // Check if every cell has text in it (no empty cells left)
    const isDraw = Array.from(cells).every(cell => cell.innerText !== "");

    // If it is a draw and the game is still active
    if (isDraw && gameActive) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;

    // If the game is over or the cell is already filled, ignore the click
    // Also check for 'taken' class
    if (!gameActive || clickedCell.classList.contains("taken")) {
        return;
    }

    // Place the current player's symbol in the cell
    clickedCell.innerText = currentPlayer;

    // Provide visual feedback and color that the cell is taken
    clickedCell.classList.add("taken");
    if (currentPlayer === "X") {
        clickedCell.classList.add("x-symbol");
    } else {
        clickedCell.classList.add("o-symbol");
    }

    // Check if the current move won the game
    const gameWon = checkWinner();

    // If the game isn't won, check for a draw or toggle player
    if (!gameWon) {
        const gameDraw = checkDraw();
        
        // If it's not a draw, toggle the player and continue
        if (!gameDraw) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerText = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to restart the game
function resetGame() {
    // Reset state variables
    currentPlayer = "X";
    gameActive = true;
    
    // Reset status text
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
    
    // Clear all cells on the board and remove visual classes
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
