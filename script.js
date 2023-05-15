window.onload = () => openDialog("gameStartDialog");

const openDialog = id => $("#" + id).modal("show");
const closeDialog = id => $("#" + id).modal("hide");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let player1 = "Player 1";
let player2 = "Player 2";
let score = [0, 0];

const setPlayers = () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;
  document.getElementById("player1ScoreName").innerText = `${player1}:`;
  document.getElementById("player2ScoreName").innerText = `${player2}:`;
  statusDisplay.innerHTML = currentPlayerTurn();
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winningMessage = () => `${currentPlayer == "X" ? player1 : player2} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `${currentPlayer == "X" ? player1 : player2}'s turn`;

const statusDisplay = document.querySelector(".status");

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
};

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const [a, b, c] = winningConditions[i].map(index => gameState[index]);
    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    currentPlayer == "X" ? score[0] += 1 : score[1] += 1;
    document.getElementById("winnerMsg").innerText = `${currentPlayer == "X" ? player1 : player2} Won`;
    resetBoard();
    openDialog("gameOverDialog");
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    openDialog("gameDrawDialog");
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

const handleCellClick = clickedCellEvent => {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

const resetBoard = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach(cell => (cell.innerHTML = ""));
  document.getElementById("player1Score").innerHTML = score[0];
  document.getElementById("player2Score").innerHTML = score[1];
};
  
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
statusDisplay.innerHTML = currentPlayerTurn();
  