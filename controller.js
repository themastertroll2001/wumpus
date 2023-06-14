// Función para mostrar un mensaje en la interfaz
function showMessage(message) {

  alert(message);
}
// Función para reiniciar el juego
function resetGame() {
  // Reiniciar la página
  window.location.reload();
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
    if (newRow === pitRow && newCol === pitCol) {
      
      const pitImg = document.createElement('img');
      pitImg.src = 'imagen/pozo.jpg'; //  ruta de la imagen del pozo
      pitImg.classList.add('pit');
      const cellElement = document.getElementById(`cell-${newRow}-${newCol}`);
      cellElement.appendChild(pitImg);
      setTimeout(function() {
        showMessage('¡Has perdido! El agente ha caído en un pozo.');
        resetGame();
      }, 0);
    } else if (newRow === wumpusRow && newCol === wumpusCol) {
      const wumpusImg = document.createElement('img');
      wumpusImg.src = 'imagen/wumpus.png'; //  ruta de la imagen del pozo
      wumpusImg.classList.add('wumpus');
      const cellElement = document.getElementById(`cell-${newRow}-${newCol}`);
      cellElement.appendChild(wumpusImg);
      setTimeout(function() {
      showMessage('¡Has perdido! El agente ha encontrado al Wumpus.');
      resetGame();
    }, 0);
    } else if (newRow === treasureRow && newCol === treasureCol) {
      const treasureImg = document.createElement('img');
      treasureImg.src = 'imagen/tesoro.png'; //  ruta de la imagen del pozo
      treasureImg.classList.add('treasure');
      const cellElement = document.getElementById(`cell-${newRow}-${newCol}`);
      cellElement.appendChild(treasureImg);
      setTimeout(function() {
      showMessage('¡Has ganado! El agente ha encontrado el tesoro.');
      resetGame();
    }, 0);
    } else if (newRow === exitRow && newCol === exitCol) {
      const exitImg = document.createElement('img');
      exitImg.src = 'imagen/salida.png'; //  ruta de la imagen del pozo
      exitImg.classList.add('exit');
      const cellElement = document.getElementById(`cell-${newRow}-${newCol}`);
      cellElement.appendChild(exitImg);
      setTimeout(function() {
      showMessage('¡Has ganado! El agente ha llegado a la salida.');
      resetGame();
    }, 0);
    }
  }
}
// Agregar el evento de escucha para los eventos de teclado
document.addEventListener('keydown', handleKeyPress);