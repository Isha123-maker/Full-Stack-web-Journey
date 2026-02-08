const game = document.getElementById("game");
const statusText = document.getElementById("status");

const grid = [
  [1, 1, 1, 1, 1],
  [1, 'P', 0, 'T', 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 'E', 1],
  [1, 1, 1, 1, 1]
];

let playerPos = { row: 1, col: 1 };

function renderGrid() {
  game.innerHTML = "";

  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const div = document.createElement("div");
      div.classList.add("cell");

      if (cell === 1) div.classList.add("wall");
      else if (cell === 0) div.classList.add("empty");
      else if (cell === 'P') div.classList.add("player");
      else if (cell === 'E') div.classList.add("exit");
      else if (cell === 'T') div.classList.add("trap");

      game.appendChild(div);
    });
  });
}

function movePlayer(dr, dc) {
  const newRow = playerPos.row + dr;
  const newCol = playerPos.col + dc;
  const target = grid[newRow][newCol];

  if (target === 1) return; // wall

  if (target === 'T') {
    statusText.textContent = "💥 You hit a trap! Game Over.";
    document.removeEventListener("keydown", handleKey);
    return;
  }

  if (target === 'E') {
    statusText.textContent = "🎉 You escaped! You win!";
    document.removeEventListener("keydown", handleKey);
    return;
  }

  grid[playerPos.row][playerPos.col] = 0;
  grid[newRow][newCol] = 'P';
  playerPos = { row: newRow, col: newCol };

  renderGrid();
}

function handleKey(e) {
  if (e.key === "ArrowUp") movePlayer(-1, 0);
  if (e.key === "ArrowDown") movePlayer(1, 0);
  if (e.key === "ArrowLeft") movePlayer(0, -1);
  if (e.key === "ArrowRight") movePlayer(0, 1);
}

document.addEventListener("keydown", handleKey);
renderGrid();
