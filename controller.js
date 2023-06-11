// Capturar eventos del teclado
document.addEventListener('keydown', function(event) {
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
  });
  
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
    if (isValidMove(newRow, newCol)) {
      // Realizar el movimiento actualizando el tablero
      board[currentRow][currentCol] = '-';
      board[newRow][newCol] = 'A';
      updateBoard();
  
      // Verificar las percepciones en la nueva posición
      const perceptions = perceive(newRow, newCol);
      console.log(perceptions);
    }
  }
  
  // Función para verificar si un movimiento es válido
  function isValidMove(row, col) {
    const cell = board[row][col];
    return cell !== 'W' && cell !== 'P'; // No se puede mover a una casilla con Wumpus (W) o pozo (P)
  }
  