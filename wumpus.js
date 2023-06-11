const boardSize = 8;
const board = [];

// Inicializar el tablero con casillas vacías
for (let row = 0; row < boardSize; row++) {
  board[row] = [];
  for (let col = 0; col < boardSize; col++) {
    board[row][col] = '-';
  }
}
// Crear el personaje (agente) con imagen
const agent = document.createElement('img');
agent.src = 'imagen/agent.png'; // Ruta de la imagen del agente
agent.classList.add('agent');

// Colocar elementos en posiciones específicas
const agentRow = 0;
const agentCol = 1;
board[agentRow][agentCol] = 'A'; // Agente

const wumpusRow = 4;
const wumpusCol = 5;
board[wumpusRow][wumpusCol] = 'W'; // Wumpus

const treasureRow = 1;
const treasureCol = 6;
board[treasureRow][treasureCol] = 'T'; // Tesoro

const pitRow = 3;
const pitCol = 1;
board[pitRow][pitCol] = 'P'; // Pozo

const entryRow = 0;
const entryCol = 0;
board[entryRow][entryCol] = 'E'; // Entrada

const exitRow = 7;
const exitCol = 7;
board[exitRow][exitCol] = 'S'; // Salida

// Mostrar el tablero inicial
updateBoard();

// Posicionar el agente en el tablero
const agentCell = document.getElementById(`cell-${agentRow}-${agentCol}`);
agentCell.appendChild(agent);

// Función para actualizar el tablero en el DOM
function updateBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let row = 0; row < boardSize; row++) {
    let rowElement = document.createElement('tr');

    for (let col = 0; col < boardSize; col++) {
      let cellElement = document.createElement('td');
      cellElement.id = `cell-${row}-${col}`;

      // Agregar clases CSS según el contenido de la celda
      if (board[row][col] === 'A') {
        cellElement.classList.add('agent');
        cellElement.appendChild(agent); // Colocar la imagen del agente en la celda
      } else if (board[row][col] === 'W') {
        cellElement.classList.add('wumpus');
      } else if (board[row][col] === 'T') {
        cellElement.classList.add('treasure');
      } else if (board[row][col] === 'P') {
        cellElement.classList.add('pit');
      } else if (board[row][col] === 'E') {
        cellElement.classList.add('entry');
      } else if (board[row][col] === 'S') {
        cellElement.classList.add('exit');
      }

      rowElement.appendChild(cellElement);
    }

    boardElement.appendChild(rowElement);
  }
}

// Obtener las casillas adyacentes a una posición dada
function getAdjacentCells(row, col) {
  const adjacentCells = [];

  // Izquierda
  if (col > 0) {
    adjacentCells.push({ row: row, col: col - 1 });
  }
  // Derecha
  if (col < boardSize - 1) {
    adjacentCells.push({ row: row, col: col + 1 });
  }
  // Arriba
  if (row > 0) {
    adjacentCells.push({ row: row - 1, col: col });
  }
  // Abajo
  if (row < boardSize - 1) {
    adjacentCells.push({ row: row + 1, col: col });
  }

  return adjacentCells;
}

// Función para que el agente perciba el entorno
function perceive(row, col) {
  const perceptions = [];

  // El agente percibe si en su casilla se encuentra el Wumpus (monstruo)
  if (board[row][col] === 'W') {
    perceptions.push('El agente ha encontrado al Wumpus.');
  }

  // El agente percibe en su casilla Hedor, por tanto hay un Wumpus en las casillas adyacentes
  const adjacentCells = getAdjacentCells(row, col);
  for (let cell of adjacentCells) {
    if (board[cell.row][cell.col] === 'W') {
      perceptions.push('El agente percibe hedor.');
      break;
    }
  }

  // El agente percibe en su casilla Viento, por tanto hay un Pozo en las casillas adyacentes
  for (let cell of adjacentCells) {
    if (board[cell.row][cell.col] === 'P') {
      perceptions.push('El agente percibe viento.');
      break;
    }
  }

  // El agente percibe si en su casilla se encuentra el tesoro
  if (board[row][col] === 'T') {
    perceptions.push('El agente ha encontrado el tesoro.');
  }

  // El agente percibe si en su casilla hay un pozo o agujero
  if (board[row][col] === 'P') {
    perceptions.push('El agente ha caído en un pozo.');
  }

  // El agente puede percibir un grito desde su casilla
  if (board[row][col] === 'W' && (row !== 4 || col !== 5)) {
    perceptions.push('El agente escucha un grito.');
  }

  return perceptions;
}

// Ejemplo de percepción del agente en la casilla de inicio
const initialPerceptions = perceive(entryRow, entryCol);
console.log(initialPerceptions);
