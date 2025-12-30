// Triple Triad Game Logic

export const PLAYER = {
  BLUE: 'blue',
  RED: 'red',
};

export const RULES = {
  SAME: 'same',
  PLUS: 'plus',
  COMBO: 'combo',
  ELEMENTAL: 'elemental',
};

// Generate random elemental grid for Elemental rule
export const generateElementalGrid = () => {
  const elements = ['none', 'fire', 'ice', 'thunder', 'earth', 'poison', 'wind', 'water', 'holy'];
  const grid = Array(9).fill(null).map(() => {
    // 50% chance of no element, 50% chance of random element
    return Math.random() < 0.5 ? 'none' : elements[Math.floor(Math.random() * elements.length)];
  });
  return grid;
};

// Create initial game state
export const createInitialState = (playerDeck, opponentDeck, activeRules = [], elementalGrid = null) => {
  return {
    board: Array(9).fill(null), // 3x3 grid, null = empty
    playerHand: [...playerDeck],
    opponentHand: [...opponentDeck],
    currentPlayer: PLAYER.BLUE,
    gameOver: false,
    winner: null,
    activeRules: activeRules,
    elementalGrid: elementalGrid || Array(9).fill('none'),
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

// Get effective card stats with elemental modifier
const getEffectiveStats = (card, cellElement) => {
  if (cellElement === 'none' || card.element === 'none') {
    return card.stats;
  }

  const modifier = card.element === cellElement ? 1 : -1;
  return card.stats.map(stat => Math.max(1, Math.min(10, stat + modifier)));
};

// Compare cards and flip if necessary (basic rule)
// Returns array of positions that were flipped
export const compareAndFlip = (board, position, card, owner, elementalGrid = null, activeRules = []) => {
  const neighbors = getNeighbors(position);
  const flippedPositions = [];

  const directions = {
    top: { cardStat: 0, opponentStat: 2 },    // card's top vs opponent's bottom
    right: { cardStat: 1, opponentStat: 3 },  // card's right vs opponent's left
    bottom: { cardStat: 2, opponentStat: 0 }, // card's bottom vs opponent's top
    left: { cardStat: 3, opponentStat: 1 },   // card's left vs opponent's right
  };

  // Get card stats with elemental modifier if applicable
  const useElemental = activeRules.includes(RULES.ELEMENTAL) && elementalGrid;
  const cardStats = useElemental ? getEffectiveStats(card, elementalGrid[position]) : card.stats;

  // Check for Same and Plus rule triggers
  const sameValues = [];
  const plusSums = [];
  const adjacentCards = [];

  Object.keys(neighbors).forEach(direction => {
    const neighborPos = neighbors[direction];

    if (neighborPos !== null && board[neighborPos] !== null) {
      const neighborCard = board[neighborPos];

      // Only battle with opponent's cards
      if (neighborCard.owner !== owner) {
        const { cardStat, opponentStat } = directions[direction];
        const neighborStats = useElemental
          ? getEffectiveStats(neighborCard.card, elementalGrid[neighborPos])
          : neighborCard.card.stats;

        const cardValue = cardStats[cardStat];
        const opponentValue = neighborStats[opponentStat];

        adjacentCards.push({
          position: neighborPos,
          cardValue,
          opponentValue,
          sum: cardValue + opponentValue,
        });

        // Basic rule: higher stat wins
        if (cardValue > opponentValue) {
          flippedPositions.push(neighborPos);
        }

        // Track for Same rule
        if (cardValue === opponentValue) {
          sameValues.push(neighborPos);
        }

        // Track for Plus rule
        plusSums.push({ position: neighborPos, sum: cardValue + opponentValue });
      }
    }
  });

  // Apply Same rule if active
  if (activeRules.includes(RULES.SAME) && sameValues.length >= 2) {
    // Same rule: if 2+ adjacent cards have equal values, flip all of them
    sameValues.forEach(pos => {
      if (!flippedPositions.includes(pos)) {
        flippedPositions.push(pos);
      }
    });
  }

  // Apply Plus rule if active
  if (activeRules.includes(RULES.PLUS) && plusSums.length >= 2) {
    // Plus rule: if 2+ adjacent cards have equal sums, flip all of them
    const sumCounts = {};
    plusSums.forEach(({ sum }) => {
      sumCounts[sum] = (sumCounts[sum] || 0) + 1;
    });

    Object.keys(sumCounts).forEach(sum => {
      if (sumCounts[sum] >= 2) {
        plusSums.forEach(({ position, sum: s }) => {
          if (s === parseInt(sum) && !flippedPositions.includes(position)) {
            flippedPositions.push(position);
          }
        });
      }
    });
  }

  return flippedPositions;
};

// Apply Combo rule: flipped cards can flip other cards
const applyCombo = (board, initialFlips, owner, elementalGrid, activeRules) => {
  if (!activeRules.includes(RULES.COMBO)) {
    return initialFlips;
  }

  const allFlipped = new Set(initialFlips);
  const toProcess = [...initialFlips];

  while (toProcess.length > 0) {
    const pos = toProcess.shift();
    const cell = board[pos];

    if (!cell) continue;

    // Check if this flipped card can flip others
    const comboFlips = compareAndFlip(board, pos, cell.card, owner, elementalGrid, activeRules);

    comboFlips.forEach(flipPos => {
      if (!allFlipped.has(flipPos)) {
        allFlipped.add(flipPos);
        toProcess.push(flipPos);
      }
    });
  }

  return Array.from(allFlipped);
};

// Place a card on the board
export const placeCard = (state, position, cardIndex) => {
  const { board, currentPlayer, playerHand, opponentHand, activeRules, elementalGrid } = state;

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

  // Check for initial flips
  let flippedPositions = compareAndFlip(
    newBoard,
    position,
    card,
    currentPlayer,
    elementalGrid,
    activeRules
  );

  // Apply Combo rule if active
  if (activeRules.includes(RULES.COMBO) && flippedPositions.length > 0) {
    // First flip the initial cards
    flippedPositions.forEach(pos => {
      newBoard[pos] = {
        ...newBoard[pos],
        owner: currentPlayer,
      };
    });

    // Then check for combo flips
    flippedPositions = applyCombo(newBoard, flippedPositions, currentPlayer, elementalGrid, activeRules);
  }

  // Flip all cards (including combo flips)
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
    activeRules,
    elementalGrid,
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
  const { board, opponentHand, activeRules, elementalGrid } = state;
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
          PLAYER.RED,
          elementalGrid,
          activeRules || []
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
