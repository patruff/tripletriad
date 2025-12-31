// Triple Triad Card Database with Abilities and Cost System
// Each card has: id, name, level, cost, stats [top, right, bottom, left], element, and optional ability
// Stats range from 1-9, with A=10
// Cost = Level (for deck building weight system)

export const ELEMENTS = {
  NONE: 'none',
  FIRE: 'fire',
  ICE: 'ice',
  THUNDER: 'thunder',
  EARTH: 'earth',
  POISON: 'poison',
  WIND: 'wind',
  WATER: 'water',
  HOLY: 'holy',
};

export const cards = [
  // Level 1 Monster Cards - Cost 1
  { id: 1, name: 'Geezard', level: 1, cost: 1, stats: [1, 4, 1, 5], element: ELEMENTS.NONE, ability: 'scavenge' },
  { id: 2, name: 'Funguar', level: 1, cost: 1, stats: [5, 1, 1, 3], element: ELEMENTS.NONE, ability: 'infestation' },
  { id: 3, name: 'Bite Bug', level: 1, cost: 1, stats: [1, 3, 3, 5], element: ELEMENTS.NONE, ability: 'hive_mind' },
  { id: 4, name: 'Red Bat', level: 1, cost: 1, stats: [6, 1, 1, 2], element: ELEMENTS.NONE, ability: 'haunt' },
  { id: 5, name: 'Blobra', level: 1, cost: 1, stats: [2, 3, 1, 5], element: ELEMENTS.NONE },
  { id: 6, name: 'Gayla', level: 1, cost: 1, stats: [2, 1, 4, 4], element: ELEMENTS.THUNDER, ability: 'symbiosis' },
  { id: 7, name: 'Gesper', level: 1, cost: 1, stats: [1, 5, 4, 1], element: ELEMENTS.NONE },
  { id: 8, name: 'Fastitocalon-F', level: 1, cost: 1, stats: [3, 5, 2, 1], element: ELEMENTS.EARTH },
  { id: 9, name: 'Blood Soul', level: 1, cost: 1, stats: [2, 1, 6, 1], element: ELEMENTS.NONE, ability: 'reanimate' },
  { id: 10, name: 'Caterchipillar', level: 1, cost: 1, stats: [4, 2, 4, 3], element: ELEMENTS.NONE, ability: 'center_boost' },
  { id: 11, name: 'Cockatrice', level: 1, cost: 1, stats: [2, 1, 2, 6], element: ELEMENTS.THUNDER },

  // Level 2 Monster Cards - Cost 2
  { id: 12, name: 'Grat', level: 2, cost: 2, stats: [7, 1, 3, 1], element: ELEMENTS.NONE, ability: 'amplifier' },
  { id: 13, name: 'Buel', level: 2, cost: 2, stats: [6, 2, 2, 3], element: ELEMENTS.NONE, ability: 'mirror' },
  { id: 14, name: 'Mesmerize', level: 2, cost: 2, stats: [5, 3, 3, 4], element: ELEMENTS.NONE, ability: 'nullifier' },
  { id: 15, name: 'Glacial Eye', level: 2, cost: 2, stats: [6, 1, 4, 3], element: ELEMENTS.ICE, ability: 'hover' },
  { id: 16, name: 'Belhelmel', level: 2, cost: 2, stats: [3, 3, 4, 5], element: ELEMENTS.NONE },
  { id: 17, name: 'Thrustaevis', level: 2, cost: 2, stats: [5, 3, 2, 5], element: ELEMENTS.WIND, ability: 'ambush' },
  { id: 18, name: 'Anacondaur', level: 2, cost: 2, stats: [5, 1, 3, 5], element: ELEMENTS.POISON },
  { id: 19, name: 'Creeps', level: 2, cost: 2, stats: [5, 2, 5, 2], element: ELEMENTS.THUNDER, ability: 'hive_mind' },
  { id: 20, name: 'Grendel', level: 2, cost: 2, stats: [4, 4, 5, 2], element: ELEMENTS.THUNDER },

  // Level 3 Monster Cards - Cost 3
  { id: 21, name: 'Forbidden', level: 3, cost: 3, stats: [6, 6, 3, 2], element: ELEMENTS.NONE, ability: 'curse' },
  { id: 22, name: 'Armadodo', level: 3, cost: 3, stats: [6, 3, 1, 6], element: ELEMENTS.EARTH },
  { id: 23, name: 'Tri-Face', level: 3, cost: 3, stats: [3, 5, 5, 5], element: ELEMENTS.POISON },
  { id: 24, name: 'Fastitocalon', level: 3, cost: 3, stats: [7, 5, 1, 3], element: ELEMENTS.EARTH },
  { id: 25, name: 'Snow Lion', level: 3, cost: 3, stats: [7, 1, 5, 3], element: ELEMENTS.ICE },
  { id: 26, name: 'Ochu', level: 3, cost: 3, stats: [5, 6, 3, 3], element: ELEMENTS.NONE },
  { id: 27, name: 'SAM08G', level: 3, cost: 3, stats: [5, 6, 2, 4], element: ELEMENTS.FIRE, ability: 'self_destruct' },
  { id: 28, name: 'Death Claw', level: 3, cost: 3, stats: [4, 4, 7, 2], element: ELEMENTS.FIRE },
  { id: 29, name: 'Cactuar', level: 3, cost: 3, stats: [6, 2, 6, 3], element: ELEMENTS.NONE, ability: '10000_needles' },
  { id: 30, name: 'Tonberry', level: 3, cost: 3, stats: [3, 6, 4, 4], element: ELEMENTS.NONE, ability: 'grudge' },

  // Level 4 Monster Cards - Cost 4
  { id: 31, name: 'T-Rexaur', level: 4, cost: 4, stats: [4, 6, 2, 7], element: ELEMENTS.NONE, ability: 'roar' },
  { id: 32, name: 'Bomb', level: 4, cost: 4, stats: [2, 7, 6, 3], element: ELEMENTS.FIRE, ability: 'explode' },
  { id: 33, name: 'Blitz', level: 4, cost: 4, stats: [1, 6, 4, 7], element: ELEMENTS.THUNDER },
  { id: 34, name: 'Wendigo', level: 4, cost: 4, stats: [7, 3, 1, 6], element: ELEMENTS.NONE },
  { id: 35, name: 'Torama', level: 4, cost: 4, stats: [7, 4, 4, 4], element: ELEMENTS.NONE },
  { id: 36, name: 'Adamantoise', level: 4, cost: 4, stats: [4, 5, 5, 6], element: ELEMENTS.EARTH, ability: 'lockdown' },

  // Level 5 Monster Cards - Cost 5
  { id: 37, name: 'Iron Giant', level: 5, cost: 5, stats: [6, 5, 5, 6], element: ELEMENTS.NONE, ability: 'armor_plating' },
  { id: 38, name: 'Behemoth', level: 5, cost: 5, stats: [3, 6, 5, 7], element: ELEMENTS.NONE },
  { id: 39, name: 'Chimera', level: 5, cost: 5, stats: [7, 6, 5, 3], element: ELEMENTS.WATER },
  { id: 40, name: 'PuPu', level: 5, cost: 5, stats: [3, 10, 2, 1], element: ELEMENTS.NONE, ability: 'scout' },
  { id: 41, name: 'Elastoid', level: 5, cost: 5, stats: [6, 2, 6, 7], element: ELEMENTS.NONE },
  { id: 42, name: 'Malboro', level: 5, cost: 5, stats: [7, 7, 4, 2], element: ELEMENTS.POISON, ability: 'bad_breath' },
  { id: 43, name: 'Ruby Dragon', level: 5, cost: 5, stats: [7, 4, 2, 7], element: ELEMENTS.FIRE },

  // Level 6 Boss Cards - Cost 6
  { id: 44, name: 'Elvoret', level: 6, cost: 6, stats: [7, 8, 3, 4], element: ELEMENTS.WIND },
  { id: 45, name: 'X-ATM092', level: 6, cost: 6, stats: [4, 3, 8, 7], element: ELEMENTS.NONE },
  { id: 46, name: 'Granaldo', level: 6, cost: 6, stats: [7, 2, 8, 5], element: ELEMENTS.NONE },
  { id: 47, name: 'Gerogero', level: 6, cost: 6, stats: [1, 8, 8, 6], element: ELEMENTS.POISON, ability: 'poison_aura' },

  // Level 7 Boss Cards - Cost 7
  { id: 48, name: 'Propagator', level: 7, cost: 7, stats: [8, 4, 4, 8], element: ELEMENTS.NONE },
  { id: 49, name: 'Jumbo Cactuar', level: 7, cost: 7, stats: [8, 8, 4, 4], element: ELEMENTS.NONE, ability: 'center_boost' },
  { id: 50, name: 'Tri-Point', level: 7, cost: 7, stats: [8, 5, 2, 8], element: ELEMENTS.THUNDER },
  { id: 51, name: 'Gargantua', level: 7, cost: 7, stats: [5, 6, 6, 8], element: ELEMENTS.NONE },

  // Level 8 GF Cards - Cost 8
  { id: 52, name: 'MiniMog', level: 8, cost: 8, stats: [9, 3, 2, 6], element: ELEMENTS.NONE },
  { id: 53, name: 'Chicobo', level: 8, cost: 8, stats: [9, 4, 4, 8], element: ELEMENTS.NONE },
  { id: 54, name: 'Quezacotl', level: 8, cost: 8, stats: [2, 9, 9, 4], element: ELEMENTS.THUNDER, ability: 'elemental_mastery' },
  { id: 55, name: 'Shiva', level: 8, cost: 8, stats: [6, 7, 4, 9], element: ELEMENTS.ICE, ability: 'elemental_mastery' },
  { id: 56, name: 'Ifrit', level: 8, cost: 8, stats: [9, 6, 2, 8], element: ELEMENTS.FIRE, ability: 'elemental_mastery' },
  { id: 57, name: 'Siren', level: 8, cost: 8, stats: [8, 2, 9, 6], element: ELEMENTS.NONE },

  // Level 9 GF Cards - Cost 9
  { id: 58, name: 'Carbuncle', level: 9, cost: 9, stats: [8, 4, 10, 4], element: ELEMENTS.NONE, ability: 'reflect' },
  { id: 59, name: 'Diablos', level: 9, cost: 9, stats: [5, 10, 8, 3], element: ELEMENTS.NONE },
  { id: 60, name: 'Leviathan', level: 9, cost: 9, stats: [7, 10, 1, 7], element: ELEMENTS.WATER, ability: 'elemental_mastery' },
  { id: 61, name: 'Odin', level: 9, cost: 9, stats: [8, 10, 3, 5], element: ELEMENTS.NONE, ability: 'ace_hunter' },
  { id: 62, name: 'Bahamut', level: 9, cost: 9, stats: [10, 8, 2, 6], element: ELEMENTS.NONE },

  // Level 10 Player Cards - Cost 10
  { id: 63, name: 'Squall', level: 10, cost: 10, stats: [10, 4, 6, 9], element: ELEMENTS.NONE },
  { id: 64, name: 'Rinoa', level: 10, cost: 10, stats: [10, 2, 8, 4], element: ELEMENTS.NONE },
  { id: 65, name: 'Quistis', level: 10, cost: 10, stats: [9, 6, 2, 10], element: ELEMENTS.NONE },
  { id: 66, name: 'Selphie', level: 10, cost: 10, stats: [10, 8, 6, 4], element: ELEMENTS.NONE },
  { id: 67, name: 'Zell', level: 10, cost: 10, stats: [8, 5, 10, 6], element: ELEMENTS.NONE },
  { id: 68, name: 'Irvine', level: 10, cost: 10, stats: [2, 10, 9, 6], element: ELEMENTS.NONE, ability: 'ace_hunter' },
];

export const DECK_COST_LIMIT = 30; // Max cost for a 5-card deck

export const getCardById = (id) => cards.find(card => card.id === id);

export const getCardsByLevel = (level) => cards.filter(card => card.level === level);

export const getRandomCards = (count) => {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get random cards within a cost limit
export const getRandomDeck = (deckSize = 5, costLimit = DECK_COST_LIMIT) => {
  const deck = [];
  let totalCost = 0;
  const availableCards = [...cards];

  while (deck.length < deckSize && availableCards.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];

    if (totalCost + card.cost <= costLimit) {
      deck.push(card);
      totalCost += card.cost;
      availableCards.splice(randomIndex, 1);
    } else {
      // If we can't afford this card, remove it from consideration
      availableCards.splice(randomIndex, 1);
    }
  }

  // Fill remaining slots with level 1 cards if needed
  while (deck.length < deckSize) {
    const level1Cards = cards.filter(c => c.level === 1 && !deck.includes(c));
    if (level1Cards.length === 0) break;
    const randomCard = level1Cards[Math.floor(Math.random() * level1Cards.length)];
    if (totalCost + randomCard.cost <= costLimit) {
      deck.push(randomCard);
      totalCost += randomCard.cost;
    } else {
      break;
    }
  }

  return deck;
};

// Calculate total cost of a deck
export const calculateDeckCost = (deck) => {
  return deck.reduce((total, card) => total + (card.cost || card.level), 0);
};

// Validate deck meets requirements
export const isValidDeck = (deck, deckSize = 5, costLimit = DECK_COST_LIMIT) => {
  if (deck.length !== deckSize) return false;
  const totalCost = calculateDeckCost(deck);
  return totalCost <= costLimit;
};
