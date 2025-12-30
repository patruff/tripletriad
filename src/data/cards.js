// Triple Triad Card Database
// Each card has: name, level, and stats [top, right, bottom, left]
// Stats range from 1-9, with A=10

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
  // Level 1 Monster Cards
  { id: 1, name: 'Geezard', level: 1, stats: [1, 4, 1, 5], element: ELEMENTS.NONE },
  { id: 2, name: 'Funguar', level: 1, stats: [5, 1, 1, 3], element: ELEMENTS.NONE },
  { id: 3, name: 'Bite Bug', level: 1, stats: [1, 3, 3, 5], element: ELEMENTS.NONE },
  { id: 4, name: 'Red Bat', level: 1, stats: [6, 1, 1, 2], element: ELEMENTS.NONE },
  { id: 5, name: 'Blobra', level: 1, stats: [2, 3, 1, 5], element: ELEMENTS.NONE },
  { id: 6, name: 'Gayla', level: 1, stats: [2, 1, 4, 4], element: ELEMENTS.THUNDER },
  { id: 7, name: 'Gesper', level: 1, stats: [1, 5, 4, 1], element: ELEMENTS.NONE },
  { id: 8, name: 'Fastitocalon-F', level: 1, stats: [3, 5, 2, 1], element: ELEMENTS.EARTH },
  { id: 9, name: 'Blood Soul', level: 1, stats: [2, 1, 6, 1], element: ELEMENTS.NONE },
  { id: 10, name: 'Caterchipillar', level: 1, stats: [4, 2, 4, 3], element: ELEMENTS.NONE },
  { id: 11, name: 'Cockatrice', level: 1, stats: [2, 1, 2, 6], element: ELEMENTS.THUNDER },

  // Level 2 Monster Cards
  { id: 12, name: 'Grat', level: 2, stats: [7, 1, 3, 1], element: ELEMENTS.NONE },
  { id: 13, name: 'Buel', level: 2, stats: [6, 2, 2, 3], element: ELEMENTS.NONE },
  { id: 14, name: 'Mesmerize', level: 2, stats: [5, 3, 3, 4], element: ELEMENTS.NONE },
  { id: 15, name: 'Glacial Eye', level: 2, stats: [6, 1, 4, 3], element: ELEMENTS.ICE },
  { id: 16, name: 'Belhelmel', level: 2, stats: [3, 3, 4, 5], element: ELEMENTS.NONE },
  { id: 17, name: 'Thrustaevis', level: 2, stats: [5, 3, 2, 5], element: ELEMENTS.WIND },
  { id: 18, name: 'Anacondaur', level: 2, stats: [5, 1, 3, 5], element: ELEMENTS.POISON },
  { id: 19, name: 'Creeps', level: 2, stats: [5, 2, 5, 2], element: ELEMENTS.THUNDER },
  { id: 20, name: 'Grendel', level: 2, stats: [4, 4, 5, 2], element: ELEMENTS.THUNDER },

  // Level 3 Monster Cards
  { id: 21, name: 'Forbidden', level: 3, stats: [6, 6, 3, 2], element: ELEMENTS.NONE },
  { id: 22, name: 'Armadodo', level: 3, stats: [6, 3, 1, 6], element: ELEMENTS.EARTH },
  { id: 23, name: 'Tri-Face', level: 3, stats: [3, 5, 5, 5], element: ELEMENTS.POISON },
  { id: 24, name: 'Fastitocalon', level: 3, stats: [7, 5, 1, 3], element: ELEMENTS.EARTH },
  { id: 25, name: 'Snow Lion', level: 3, stats: [7, 1, 5, 3], element: ELEMENTS.ICE },
  { id: 26, name: 'Ochu', level: 3, stats: [5, 6, 3, 3], element: ELEMENTS.NONE },
  { id: 27, name: 'SAM08G', level: 3, stats: [5, 6, 2, 4], element: ELEMENTS.FIRE },
  { id: 28, name: 'Death Claw', level: 3, stats: [4, 4, 7, 2], element: ELEMENTS.FIRE },
  { id: 29, name: 'Cactuar', level: 3, stats: [6, 2, 6, 3], element: ELEMENTS.NONE },
  { id: 30, name: 'Tonberry', level: 3, stats: [3, 6, 4, 4], element: ELEMENTS.NONE },

  // Level 4 Monster Cards
  { id: 31, name: 'T-Rexaur', level: 4, stats: [4, 6, 2, 7], element: ELEMENTS.NONE },
  { id: 32, name: 'Bomb', level: 4, stats: [2, 7, 6, 3], element: ELEMENTS.FIRE },
  { id: 33, name: 'Blitz', level: 4, stats: [1, 6, 4, 7], element: ELEMENTS.THUNDER },
  { id: 34, name: 'Wendigo', level: 4, stats: [7, 3, 1, 6], element: ELEMENTS.NONE },
  { id: 35, name: 'Torama', level: 4, stats: [7, 4, 4, 4], element: ELEMENTS.NONE },
  { id: 36, name: 'Adamantoise', level: 4, stats: [4, 5, 5, 6], element: ELEMENTS.EARTH },

  // Level 5 Monster Cards
  { id: 37, name: 'Iron Giant', level: 5, stats: [6, 5, 5, 6], element: ELEMENTS.NONE },
  { id: 38, name: 'Behemoth', level: 5, stats: [3, 6, 5, 7], element: ELEMENTS.NONE },
  { id: 39, name: 'Chimera', level: 5, stats: [7, 6, 5, 3], element: ELEMENTS.WATER },
  { id: 40, name: 'PuPu', level: 5, stats: [3, 10, 2, 1], element: ELEMENTS.NONE },
  { id: 41, name: 'Elastoid', level: 5, stats: [6, 2, 6, 7], element: ELEMENTS.NONE },
  { id: 42, name: 'Malboro', level: 5, stats: [7, 7, 4, 2], element: ELEMENTS.POISON },
  { id: 43, name: 'Ruby Dragon', level: 5, stats: [7, 4, 2, 7], element: ELEMENTS.FIRE },

  // Level 6 Boss Cards
  { id: 44, name: 'Elvoret', level: 6, stats: [7, 8, 3, 4], element: ELEMENTS.WIND },
  { id: 45, name: 'X-ATM092', level: 6, stats: [4, 3, 8, 7], element: ELEMENTS.NONE },
  { id: 46, name: 'Granaldo', level: 6, stats: [7, 2, 8, 5], element: ELEMENTS.NONE },
  { id: 47, name: 'Gerogero', level: 6, stats: [1, 8, 8, 6], element: ELEMENTS.POISON },

  // Level 7 Boss Cards
  { id: 48, name: 'Propagator', level: 7, stats: [8, 4, 4, 8], element: ELEMENTS.NONE },
  { id: 49, name: 'Jumbo Cactuar', level: 7, stats: [8, 8, 4, 4], element: ELEMENTS.NONE },
  { id: 50, name: 'Tri-Point', level: 7, stats: [8, 5, 2, 8], element: ELEMENTS.THUNDER },
  { id: 51, name: 'Gargantua', level: 7, stats: [5, 6, 6, 8], element: ELEMENTS.NONE },

  // Level 8 GF Cards
  { id: 52, name: 'MiniMog', level: 8, stats: [9, 3, 2, 6], element: ELEMENTS.NONE },
  { id: 53, name: 'Chicobo', level: 8, stats: [9, 4, 4, 8], element: ELEMENTS.NONE },
  { id: 54, name: 'Quezacotl', level: 8, stats: [2, 9, 9, 4], element: ELEMENTS.THUNDER },
  { id: 55, name: 'Shiva', level: 8, stats: [6, 7, 4, 9], element: ELEMENTS.ICE },
  { id: 56, name: 'Ifrit', level: 8, stats: [9, 6, 2, 8], element: ELEMENTS.FIRE },
  { id: 57, name: 'Siren', level: 8, stats: [8, 2, 9, 6], element: ELEMENTS.NONE },

  // Level 9 GF Cards
  { id: 58, name: 'Carbuncle', level: 9, stats: [8, 4, 10, 4], element: ELEMENTS.NONE },
  { id: 59, name: 'Diablos', level: 9, stats: [5, 10, 8, 3], element: ELEMENTS.NONE },
  { id: 60, name: 'Leviathan', level: 9, stats: [7, 10, 1, 7], element: ELEMENTS.WATER },
  { id: 61, name: 'Odin', level: 9, stats: [8, 10, 3, 5], element: ELEMENTS.NONE },
  { id: 62, name: 'Bahamut', level: 9, stats: [10, 8, 2, 6], element: ELEMENTS.NONE },

  // Level 10 Player Cards
  { id: 63, name: 'Squall', level: 10, stats: [10, 4, 6, 9], element: ELEMENTS.NONE },
  { id: 64, name: 'Rinoa', level: 10, stats: [10, 2, 8, 4], element: ELEMENTS.NONE },
  { id: 65, name: 'Quistis', level: 10, stats: [9, 6, 2, 10], element: ELEMENTS.NONE },
  { id: 66, name: 'Selphie', level: 10, stats: [10, 8, 6, 4], element: ELEMENTS.NONE },
  { id: 67, name: 'Zell', level: 10, stats: [8, 5, 10, 6], element: ELEMENTS.NONE },
  { id: 68, name: 'Irvine', level: 10, stats: [2, 10, 9, 6], element: ELEMENTS.NONE },
];

export const getCardById = (id) => cards.find(card => card.id === id);

export const getCardsByLevel = (level) => cards.filter(card => card.level === level);

export const getRandomCards = (count) => {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
