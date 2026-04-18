// Output message to verify that the script has loaded successfully
console.log("Project initialized");

// Select necessary elements from the DOM
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");

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

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;

    // If the game is over or the cell is already filled, ignore the click
    if (!gameActive || clickedCell.innerText !== "") {
        return;
    }

    // Place the current player's symbol in the cell
    clickedCell.innerText = currentPlayer;

    // Provide visual feedback that the cell is taken
    clickedCell.style.cursor = "default";

    // Check if the current move won the game
    const gameWon = checkWinner();

    // If the game isn't won, toggle the player and continue
    if (!gameWon) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

// Attach click event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});
