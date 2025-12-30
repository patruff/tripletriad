// Triple Triad Game Logic

export const PLAYER = {
  BLUE: 'blue',
  RED: 'red',
};

// Create initial game state
export const createInitialState = (playerDeck, opponentDeck) => {
  return {
    board: Array(9).fill(null), // 3x3 grid, null = empty
    playerHand: [...playerDeck],
    opponentHand: [...opponentDeck],
    currentPlayer: PLAYER.BLUE,
    gameOver: false,
    winner: null,
  };
};

// Check if a position is valid (0-8)
export const isValidPosition = (position) => {
  return position >= 0 && position <= 8;
};

// Get neighboring positions for a board position
export const getNeighbors = (position) => {
  const row = Math.floor(position / 3);
  const col = position % 3;

  return {
    top: row > 0 ? position - 3 : null,
    right: col < 2 ? position + 1 : null,
    bottom: row < 2 ? position + 3 : null,
    left: col > 0 ? position - 1 : null,
  };
};

// Compare cards and flip if necessary
// Returns array of positions that were flipped
export const compareAndFlip = (board, position, card, owner) => {
  const neighbors = getNeighbors(position);
  const flippedPositions = [];

  const directions = {
    top: { cardStat: 0, opponentStat: 2 },    // card's top vs opponent's bottom
    right: { cardStat: 1, opponentStat: 3 },  // card's right vs opponent's left
    bottom: { cardStat: 2, opponentStat: 0 }, // card's bottom vs opponent's top
    left: { cardStat: 3, opponentStat: 1 },   // card's left vs opponent's right
  };

  Object.keys(neighbors).forEach(direction => {
    const neighborPos = neighbors[direction];

    if (neighborPos !== null && board[neighborPos] !== null) {
      const neighborCard = board[neighborPos];

      // Only battle with opponent's cards
      if (neighborCard.owner !== owner) {
        const { cardStat, opponentStat } = directions[direction];
        const cardValue = card.stats[cardStat];
        const opponentValue = neighborCard.card.stats[opponentStat];

        // If our card's stat is higher, flip the opponent's card
        if (cardValue > opponentValue) {
          flippedPositions.push(neighborPos);
        }
      }
    }
  });

  return flippedPositions;
};

// Place a card on the board
export const placeCard = (state, position, cardIndex) => {
  const { board, currentPlayer, playerHand, opponentHand } = state;

  // Validate move
  if (!isValidPosition(position) || board[position] !== null) {
    return null;
  }

  // Get the card from current player's hand
  const hand = currentPlayer === PLAYER.BLUE ? playerHand : opponentHand;
  if (cardIndex < 0 || cardIndex >= hand.length) {
    return null;
  }

  const card = hand[cardIndex];
  const newBoard = [...board];

  // Place the card
  newBoard[position] = {
    card,
    owner: currentPlayer,
  };

  // Check for flips
  const flippedPositions = compareAndFlip(newBoard, position, card, currentPlayer);

  // Flip the cards
  flippedPositions.forEach(pos => {
    newBoard[pos] = {
      ...newBoard[pos],
      owner: currentPlayer,
    };
  });

  // Remove card from hand
  const newPlayerHand = currentPlayer === PLAYER.BLUE
    ? playerHand.filter((_, i) => i !== cardIndex)
    : playerHand;
  const newOpponentHand = currentPlayer === PLAYER.RED
    ? opponentHand.filter((_, i) => i !== cardIndex)
    : opponentHand;

  // Check if game is over (all positions filled)
  const gameOver = newBoard.every(cell => cell !== null);
  const winner = gameOver ? getWinner(newBoard) : null;

  // Switch player
  const nextPlayer = currentPlayer === PLAYER.BLUE ? PLAYER.RED : PLAYER.BLUE;

  return {
    board: newBoard,
    playerHand: newPlayerHand,
    opponentHand: newOpponentHand,
    currentPlayer: gameOver ? currentPlayer : nextPlayer,
    gameOver,
    winner,
    lastMove: {
      position,
      flippedPositions,
    },
  };
};

// Count cards owned by each player
export const getScore = (board) => {
  let blueCount = 0;
  let redCount = 0;

  board.forEach(cell => {
    if (cell !== null) {
      if (cell.owner === PLAYER.BLUE) {
        blueCount++;
      } else {
        redCount++;
      }
    }
  });

  return { blue: blueCount, red: redCount };
};

// Determine winner
export const getWinner = (board) => {
  const score = getScore(board);

  if (score.blue > score.red) {
    return PLAYER.BLUE;
  } else if (score.red > score.blue) {
    return PLAYER.RED;
  } else {
    return 'draw';
  }
};

// AI: Simple strategy - place card in position that flips most cards
export const getAIMove = (state) => {
  const { board, opponentHand } = state;
  let bestMove = null;
  let maxFlips = -1;

  // Try each card in each empty position
  opponentHand.forEach((card, cardIndex) => {
    board.forEach((cell, position) => {
      if (cell === null) {
        // Simulate placing the card
        const flippedPositions = compareAndFlip(
          board.map(c => c), // shallow copy for simulation
          position,
          card,
          PLAYER.RED
        );

        if (flippedPositions.length > maxFlips) {
          maxFlips = flippedPositions.length;
          bestMove = { position, cardIndex };
        }
      }
    });
  });

  // If no flips possible, just place first card in first empty spot
  if (bestMove === null) {
    const firstEmptyPos = board.findIndex(cell => cell === null);
    bestMove = { position: firstEmptyPos, cardIndex: 0 };
  }

  return bestMove;
};
