// Output message to verify that the script has loaded successfully
console.log("Project initialized");

// Select necessary elements from the DOM
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");

// Track the current player ("X" starts the game)
let currentPlayer = "X";

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;

    // Check if the cell is already filled. If it has text, ignore the click.
    if (clickedCell.innerText !== "") {
        return;
    }

    // Place the current player's symbol in the cell
    clickedCell.innerText = currentPlayer;

    // Provide visual feedback that the cell is taken
    clickedCell.style.cursor = "default"; // or "not-allowed"

    // Toggle the current player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Update the status text to show whose turn it is
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

// Attach click event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});
