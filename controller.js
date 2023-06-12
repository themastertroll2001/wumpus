// Función para terminar el juego
function endGame(message) {
  // Mostrar mensaje de fin de juego
  messageElement.textContent = message;

  // Deshabilitar la captura de eventos del teclado
  document.removeEventListener('keydown', handleKeyPress);
}

// Función para capturar eventos de teclado
function handleKeyPress(event) {
  // Obtener la tecla presionada
  const key = event.key.toLowerCase();

  // Mover al agente en la dirección correspondiente
  if (key === 'w') {
    moveAgent('norte');
  } else if (key === 'a') {
    moveAgent('oeste');
  } else if (key === 's') {
    moveAgent('sur');
  } else if (key === 'd') {
    moveAgent('este');
  }
}

// Función para mover al agente en una dirección dada
function moveAgent(direccion) {
  // Obtener la posición actual del agente
  let currentRow, currentCol;
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === 'A') {
        currentRow = row;
        currentCol = col;
        break;
      }
    }
  }

  // Calcular la nueva posición del agente según la dirección
  let newRow = currentRow;
  let newCol = currentCol;
  if (direccion === 'norte' && currentRow > 0) {
    newRow--;
  } else if (direccion === 'sur' && currentRow < boardSize - 1) {
    newRow++;
  } else if (direccion === 'oeste' && currentCol > 0) {
    newCol--;
  } else if (direccion === 'este' && currentCol < boardSize - 1) {
    newCol++;
  }

  // Verificar si la nueva posición es válida y actualizar el tablero
  if (newRow !== currentRow || newCol !== currentCol) {
    // Realizar el movimiento actualizando el tablero
    board[currentRow][currentCol] = '-';
    board[newRow][newCol] = 'A';
    updateBoard();

    // Verificar las percepciones en la nueva posición
    const perceptions = perceive(newRow, newCol);
    console.log(perceptions);

    // Verificar si el juego debe terminar
    if (perceptions.includes('El agente ha caído en un pozo.') || perceptions.includes('El agente ha encontrado al Wumpus.')) {
      endGame('¡Has perdido! El agente ha caído en un pozo o ha encontrado al Wumpus.');
    } else if (perceptions.includes('El agente ha encontrado el tesoro.')) {
      endGame('¡Has ganado! El agente ha encontrado el tesoro.');
    } else if (newRow === exitRow && newCol === exitCol) {
      endGame('¡Has ganado! El agente ha llegado a la salida.');
    }
  }
}

// Agregar el evento de escucha para los eventos de teclado
document.addEventListener('keydown', handleKeyPress);
