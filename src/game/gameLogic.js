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
    flippedCards: { blue: 0, red: 0 }, // Track flipped cards for Grudge ability
    cardStates: {}, // Track card-specific state (e.g., armor hits taken)
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

// Get effective card stats with elemental modifier and abilities
const getEffectiveStats = (card, cellElement, position, board, owner, gameState = null) => {
  let stats = [...card.stats];

  // Check if this card is silenced by adjacent Nullifier
  let isSilenced = false;
  if (board && position !== undefined) {
    const neighbors = getNeighbors(position);
    isSilenced = Object.values(neighbors).some(neighborPos => {
      if (neighborPos !== null && board[neighborPos]) {
        return board[neighborPos].card.ability === 'nullifier';
      }
      return false;
    });
  }

  // If silenced, skip all ability processing
  if (isSilenced) {
    // Still apply elemental modifiers (they're not abilities)
    if (cellElement !== 'none' && card.element !== 'none') {
      const modifier = card.element === cellElement ? 1 : -1;
      stats = stats.map(stat => Math.max(1, Math.min(10, stat + modifier)));
    }
    return stats;
  }

  // Mirror ability - copies stats from left card
  if (card.ability === 'mirror' && board && position !== undefined) {
    const row = Math.floor(position / 3);
    const col = position % 3;
    if (col > 0) {
      const leftPos = position - 1;
      if (board[leftPos]) {
        // Copy the base stats of the left card (before any modifiers)
        stats = [...board[leftPos].card.stats];
      }
    }
  }

  // Apply Hive Mind - +1 for each other copy of this card on board
  if (card.ability === 'hive_mind' && board) {
    const copiesOnBoard = board.filter(
      cell => cell && cell.owner === owner && cell.card.id === card.id
    ).length;
    if (copiesOnBoard > 0) {
      // Don't count self if already placed
      const boost = copiesOnBoard;
      stats = stats.map(stat => Math.min(10, stat + boost));
    }
  }

  // Apply Grudge - +1 for each card this player has lost
  if (card.ability === 'grudge' && gameState && gameState.flippedCards) {
    const lostCards = owner === PLAYER.BLUE ? gameState.flippedCards.blue : gameState.flippedCards.red;
    stats = stats.map(stat => Math.min(10, stat + lostCards));
  }

  // Apply elemental modifier
  if (cellElement !== 'none' && card.element !== 'none') {
    const elementModifier = card.element === cellElement ? 1 : -1;

    // Hover ability - ignores penalties but keeps bonuses
    if (card.ability === 'hover' && elementModifier < 0) {
      // Skip the penalty
    } else {
      // Check for Elemental Mastery ability - doubles element bonus
      const hasElementalMastery = card.ability === 'elemental_mastery';
      const modifier = hasElementalMastery ? elementModifier * 2 : elementModifier;
      stats = stats.map(stat => Math.max(1, Math.min(10, stat + modifier)));
    }
  }

  // Apply Bad Breath debuff from adjacent enemy cards
  if (board && position !== undefined) {
    const neighbors = getNeighbors(position);
    Object.values(neighbors).forEach(neighborPos => {
      if (neighborPos !== null && board[neighborPos] !== null) {
        const neighborCard = board[neighborPos];
        // Check if neighbor is enemy and has bad_breath
        if (neighborCard.owner !== owner && neighborCard.card.ability === 'bad_breath') {
          stats = stats.map(stat => Math.max(1, stat - 1));
        }
      }
    });
  }

  // Apply Center Boost to adjacent friendly cards if this card is in center
  // This is handled separately in the comparison logic

  return stats;
};

// Helper function to apply Center Boost bonus
const applyCenterBoost = (stats, board, position, owner) => {
  // Check if there's a friendly card in center (position 4) with center_boost
  if (board[4] && board[4].owner === owner && board[4].card.ability === 'center_boost') {
    // Check if current position is adjacent to center
    const neighbors = getNeighbors(4);
    const adjacentToCenter = Object.values(neighbors).includes(position);

    if (adjacentToCenter) {
      // Add +1 to the lowest stat
      const minStat = Math.min(...stats);
      return stats.map(stat => stat === minStat ? Math.min(10, stat + 1) : stat);
    }
  }
  return stats;
};

// Helper function to apply Amplifier bonus
const applyAmplifier = (stats, board, position, owner) => {
  if (!board || position === undefined) return stats;

  const neighbors = getNeighbors(position);
  const directions = {
    top: 0,    // top stat
    right: 1,  // right stat
    bottom: 2, // bottom stat
    left: 3,   // left stat
  };

  let newStats = [...stats];

  // Check each direction for friendly Amplifier cards
  Object.keys(neighbors).forEach(direction => {
    const neighborPos = neighbors[direction];
    if (neighborPos !== null && board[neighborPos]) {
      const neighborCard = board[neighborPos];
      // If neighbor is friendly and has Amplifier
      if (neighborCard.owner === owner && neighborCard.card.ability === 'amplifier') {
        // Boost the stat facing the Amplifier by +2
        const statIndex = directions[direction];
        newStats[statIndex] = Math.min(10, newStats[statIndex] + 2);
      }
    }
  });

  return newStats;
};

// Compare cards and flip if necessary (basic rule)
// Returns array of positions that were flipped
export const compareAndFlip = (board, position, card, owner, elementalGrid = null, activeRules = [], gameState = null) => {
  const neighbors = getNeighbors(position);
  const flippedPositions = [];
  const reflectPositions = []; // Track cards with reflect ability that got flipped

  const directions = {
    top: { cardStat: 0, opponentStat: 2 },    // card's top vs opponent's bottom
    right: { cardStat: 1, opponentStat: 3 },  // card's right vs opponent's left
    bottom: { cardStat: 2, opponentStat: 0 }, // card's bottom vs opponent's top
    left: { cardStat: 3, opponentStat: 1 },   // card's left vs opponent's right
  };

  // Get card stats with elemental modifier and abilities if applicable
  const useElemental = activeRules.includes(RULES.ELEMENTAL) && elementalGrid;
  let cardStats = useElemental
    ? getEffectiveStats(card, elementalGrid[position], position, board, owner, gameState)
    : getEffectiveStats(card, 'none', position, board, owner, gameState);

  // Apply Center Boost if this card is adjacent to a friendly center card with the ability
  cardStats = applyCenterBoost(cardStats, board, position, owner);

  // Apply Amplifier bonuses from adjacent friendly cards
  cardStats = applyAmplifier(cardStats, board, position, owner);

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
        let neighborStats = useElemental
          ? getEffectiveStats(neighborCard.card, elementalGrid[neighborPos], neighborPos, board, neighborCard.owner, gameState)
          : getEffectiveStats(neighborCard.card, 'none', neighborPos, board, neighborCard.owner, gameState);

        // Apply Center Boost to neighbor if applicable
        neighborStats = applyCenterBoost(neighborStats, board, neighborPos, neighborCard.owner);

        // Apply Amplifier bonuses to neighbor
        neighborStats = applyAmplifier(neighborStats, board, neighborPos, neighborCard.owner);

        let cardValue = cardStats[cardStat];
        let opponentValue = neighborStats[opponentStat];

        // Apply Slayer abilities
        // Giant Slayer: Your 1-3 stats beat enemy A (10) stats
        if (card.ability === 'giant_slayer' && cardValue >= 1 && cardValue <= 3 && opponentValue === 10) {
          opponentValue = 0; // Make it always lose
        }

        // Ace Hunter: Treats all enemy A (10) values as 5
        if (card.ability === 'ace_hunter' && opponentValue === 10) {
          opponentValue = 5;
        }

        // 10,000 Needles: Auto-win vs A (10)
        if (card.ability === '10000_needles' && opponentValue === 10) {
          opponentValue = 0; // Make it always lose
        }

        adjacentCards.push({
          position: neighborPos,
          cardValue,
          opponentValue,
          sum: cardValue + opponentValue,
        });

        // Check for Fortress and Lockdown abilities - can't be flipped by basic comparison
        const hasFortress = neighborCard.card.ability === 'fortress';
        const hasLockdown = neighborCard.card.ability === 'lockdown';

        // Check for Armor Plating - requires two hits to flip
        let hasArmor = false;
        if (neighborCard.card.ability === 'armor_plating' && gameState && gameState.cardStates) {
          const armorKey = `${neighborPos}_armor`;
          if (!gameState.cardStates[armorKey]) {
            // First hit - absorb it
            hasArmor = true;
            // Mark that this card has been hit once (will be processed in placeCard)
          }
        }

        // Basic rule: higher stat wins (unless opponent has Fortress/Lockdown/Armor)
        if (cardValue > opponentValue && !hasFortress && !hasLockdown && !hasArmor) {
          flippedPositions.push(neighborPos);

          // Check if flipped card has Reflect ability
          if (neighborCard.card.ability === 'reflect') {
            reflectPositions.push(position); // Reflect back to attacker
          }
        }

        // Track for Same rule (ignores Fortress but NOT Lockdown)
        if (cardValue === opponentValue && !hasLockdown) {
          sameValues.push(neighborPos);
        }

        // Track for Plus rule (ignores Fortress but NOT Lockdown)
        if (!hasLockdown) {
          plusSums.push({ position: neighborPos, sum: cardValue + opponentValue });
        }
      }
    }
  });

  // Apply Same rule if active (ignores Fortress, but Lockdown and Symbiosis are immune)
  if (activeRules.includes(RULES.SAME) && sameValues.length >= 2) {
    // Same rule: if 2+ adjacent cards have equal values, flip all of them
    sameValues.forEach(pos => {
      if (!flippedPositions.includes(pos)) {
        const targetCard = board[pos];

        // Check for Symbiosis - immune to Same/Plus if next to another Swarm card
        let hasSymbiosisProtection = false;
        if (targetCard && targetCard.card.ability === 'symbiosis') {
          const neighbors = getNeighbors(pos);
          hasSymbiosisProtection = Object.values(neighbors).some(neighborPos => {
            if (neighborPos !== null && board[neighborPos]) {
              const neighbor = board[neighborPos];
              const swarmAbilities = ['hive_mind', 'infestation', 'symbiosis'];
              return neighbor.owner === targetCard.owner && swarmAbilities.includes(neighbor.card.ability);
            }
            return false;
          });
        }

        // Lockdown and Symbiosis (when protected) prevent Same/Plus flips
        if (!targetCard || (targetCard.card.ability !== 'lockdown' && !hasSymbiosisProtection)) {
          flippedPositions.push(pos);

          // Check if flipped card has Reflect ability
          if (targetCard && targetCard.card.ability === 'reflect' && !reflectPositions.includes(position)) {
            reflectPositions.push(position);
          }
        }
      }
    });
  }

  // Apply Plus rule if active (ignores Fortress, but Lockdown and Symbiosis are immune)
  if (activeRules.includes(RULES.PLUS) && plusSums.length >= 2) {
    // Plus rule: if 2+ adjacent cards have equal sums, flip all of them
    const sumCounts = {};
    plusSums.forEach(({ sum }) => {
      sumCounts[sum] = (sumCounts[sum] || 0) + 1;
    });

    Object.keys(sumCounts).forEach(sum => {
      if (sumCounts[sum] >= 2) {
        plusSums.forEach(({ position: pos, sum: s }) => {
          if (s === parseInt(sum) && !flippedPositions.includes(pos)) {
            const targetCard = board[pos];

            // Check for Symbiosis - immune to Same/Plus if next to another Swarm card
            let hasSymbiosisProtection = false;
            if (targetCard && targetCard.card.ability === 'symbiosis') {
              const neighbors = getNeighbors(pos);
              hasSymbiosisProtection = Object.values(neighbors).some(neighborPos => {
                if (neighborPos !== null && board[neighborPos]) {
                  const neighbor = board[neighborPos];
                  const swarmAbilities = ['hive_mind', 'infestation', 'symbiosis'];
                  return neighbor.owner === targetCard.owner && swarmAbilities.includes(neighbor.card.ability);
                }
                return false;
              });
            }

            // Lockdown and Symbiosis (when protected) prevent Same/Plus flips
            if (!targetCard || (targetCard.card.ability !== 'lockdown' && !hasSymbiosisProtection)) {
              flippedPositions.push(pos);

              // Check if flipped card has Reflect ability
              if (targetCard && targetCard.card.ability === 'reflect' && !reflectPositions.includes(position)) {
                reflectPositions.push(position);
              }
            }
          }
        });
      }
    });
  }

  // Apply Reflect ability - flip the attacker if they flipped a card with reflect
  // Note: Reflect positions are added to the flipped list but shouldn't trigger combos
  reflectPositions.forEach(pos => {
    if (!flippedPositions.includes(pos)) {
      flippedPositions.push(pos);
    }
  });

  return flippedPositions;
};

// Apply Combo rule: flipped cards can flip other cards
const applyCombo = (board, initialFlips, owner, elementalGrid, activeRules, gameState) => {
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
    const comboFlips = compareAndFlip(board, pos, cell.card, owner, elementalGrid, activeRules, gameState);

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
  const { board, currentPlayer, playerHand, opponentHand, activeRules, elementalGrid, flippedCards } = state;

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
  const newFlippedCards = { ...flippedCards };
  const newCardStates = { ...state.cardStates };

  // Place the card
  newBoard[position] = {
    card,
    owner: currentPlayer,
  };

  // ON_PLAY triggers - execute before battle
  const onPlayEffects = [];

  // Curse: Reduce one adjacent enemy card's stats by 1 permanently
  if (card.ability === 'curse') {
    const neighbors = getNeighbors(position);
    const adjacentEnemies = Object.values(neighbors).filter(
      pos => pos !== null && newBoard[pos] && newBoard[pos].owner !== currentPlayer
    );
    if (adjacentEnemies.length > 0) {
      const targetPos = adjacentEnemies[Math.floor(Math.random() * adjacentEnemies.length)];
      const targetCard = newBoard[targetPos];
      // Create a cursed version of the card with -1 to all stats
      const cursedStats = targetCard.card.stats.map(stat => Math.max(1, stat - 1));
      newBoard[targetPos] = {
        ...targetCard,
        card: { ...targetCard.card, stats: cursedStats }
      };
      onPlayEffects.push({ type: 'curse', target: targetPos });
    }
  }

  // Infestation: Spawn a weak token in adjacent empty slot
  if (card.ability === 'infestation') {
    const neighbors = getNeighbors(position);
    const emptySlots = Object.values(neighbors).filter(pos => pos !== null && newBoard[pos] === null);
    if (emptySlots.length > 0) {
      const tokenPos = emptySlots[Math.floor(Math.random() * emptySlots.length)];
      // Spawn a 1/1/1/1 token
      newBoard[tokenPos] = {
        card: { id: 'token', name: 'Larva', level: 1, cost: 0, stats: [1, 1, 1, 1], element: 'none' },
        owner: currentPlayer
      };
      onPlayEffects.push({ type: 'infestation', position: tokenPos });
    }
  }

  // Check for initial flips
  let flippedPositions = compareAndFlip(
    newBoard,
    position,
    card,
    currentPlayer,
    elementalGrid,
    activeRules,
    { ...state, board: newBoard, cardStates: newCardStates }
  );

  // Track Armor Plating hits before flipping
  const armorBlocked = [];
  flippedPositions.forEach(pos => {
    const targetCard = newBoard[pos];
    if (targetCard && targetCard.card.ability === 'armor_plating') {
      const armorKey = `${pos}_armor`;
      if (!newCardStates[armorKey]) {
        // First hit - block it
        newCardStates[armorKey] = true;
        armorBlocked.push(pos);
      }
    }
  });

  // Remove armor-blocked positions from flips
  flippedPositions = flippedPositions.filter(pos => !armorBlocked.includes(pos));

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
    flippedPositions = applyCombo(newBoard, flippedPositions, currentPlayer, elementalGrid, activeRules, { ...state, board: newBoard, cardStates: newCardStates });
  }

  // Track flipped cards for Grudge ability and apply ON_FLIP triggers
  const onFlipTriggers = [];
  flippedPositions.forEach(pos => {
    const flippedCard = newBoard[pos];
    const previousOwner = flippedCard.owner;

    // Track flipped cards for Grudge ability
    if (previousOwner !== currentPlayer) {
      if (previousOwner === PLAYER.BLUE) {
        newFlippedCards.blue++;
      } else {
        newFlippedCards.red++;
      }

      // Clear armor state if the card is actually flipped
      const armorKey = `${pos}_armor`;
      if (newCardStates[armorKey]) {
        delete newCardStates[armorKey];
      }

      // Check for ON_FLIP abilities (Haunt, Explode, etc.)
      if (flippedCard.card.ability === 'haunt') {
        onFlipTriggers.push({ type: 'haunt', position: pos });
      } else if (flippedCard.card.ability === 'explode') {
        onFlipTriggers.push({ type: 'explode', position: pos });
      } else if (flippedCard.card.ability === 'self_destruct') {
        onFlipTriggers.push({ type: 'self_destruct', position: pos });
      }
    }

    newBoard[pos] = {
      ...newBoard[pos],
      owner: currentPlayer,
    };
  });

  // Process ON_FLIP triggers
  onFlipTriggers.forEach(trigger => {
    if (trigger.type === 'haunt') {
      // Haunt: Flip one random adjacent card
      const neighbors = getNeighbors(trigger.position);
      const adjacentEnemies = Object.values(neighbors).filter(
        pos => pos !== null && newBoard[pos] && newBoard[pos].owner !== currentPlayer
      );
      if (adjacentEnemies.length > 0) {
        const randomEnemy = adjacentEnemies[Math.floor(Math.random() * adjacentEnemies.length)];
        newBoard[randomEnemy] = { ...newBoard[randomEnemy], owner: currentPlayer };
      }
    } else if (trigger.type === 'explode') {
      // Explode: Clear all adjacent cards (set to null)
      const neighbors = getNeighbors(trigger.position);
      Object.values(neighbors).forEach(pos => {
        if (pos !== null && newBoard[pos]) {
          newBoard[pos] = null;
        }
      });
    } else if (trigger.type === 'self_destruct') {
      // Self-Destruct: Remove this card from board
      newBoard[trigger.position] = null;
    }
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
      onPlayEffects,
      armorBlocked,
    },
    activeRules,
    elementalGrid,
    flippedCards: newFlippedCards,
    cardStates: newCardStates,
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
          activeRules || [],
          state
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
