// Card Abilities System

export const ABILITY_TYPES = {
  NONE: 'none',
  SUPPORT: 'support',
  SABOTAGE: 'sabotage',
  SLAYER: 'slayer',
  SHIELD: 'shield',
};

export const ABILITIES = {
  // Support Abilities
  CENTER_BOOST: {
    id: 'center_boost',
    type: ABILITY_TYPES.SUPPORT,
    name: 'Center Support',
    description: 'If in center position, adjacent friendly cards get +1 to their lowest side',
    trigger: 'passive',
  },

  ELEMENTAL_MASTERY: {
    id: 'elemental_mastery',
    type: ABILITY_TYPES.SUPPORT,
    name: 'Elemental Mastery',
    description: 'Doubles element bonus (+2 instead of +1 on matching element)',
    trigger: 'passive',
  },

  // Sabotage Abilities
  BAD_BREATH: {
    id: 'bad_breath',
    type: ABILITY_TYPES.SABOTAGE,
    name: 'Bad Breath',
    description: 'Adjacent enemy cards have their stats reduced by 1',
    trigger: 'passive',
  },

  POISON_AURA: {
    id: 'poison_aura',
    type: ABILITY_TYPES.SABOTAGE,
    name: 'Poison Aura',
    description: 'Enemy cards placed adjacent this turn get -2 to all sides',
    trigger: 'reactive',
  },

  // Slayer Abilities
  GIANT_SLAYER: {
    id: 'giant_slayer',
    type: ABILITY_TYPES.SLAYER,
    name: 'Giant Slayer',
    description: 'Your 1-3 stats beat enemy A (10) stats',
    trigger: 'passive',
  },

  ACE_HUNTER: {
    id: 'ace_hunter',
    type: ABILITY_TYPES.SLAYER,
    name: 'Ace Hunter',
    description: 'Treats all enemy A (10) values as 5',
    trigger: 'passive',
  },

  // Shield Abilities
  FORTRESS: {
    id: 'fortress',
    type: ABILITY_TYPES.SHIELD,
    name: 'Fortress',
    description: 'Cannot be flipped by basic comparison (only Same/Plus)',
    trigger: 'passive',
  },

  REFLECT: {
    id: 'reflect',
    type: ABILITY_TYPES.SHIELD,
    name: 'Reflect',
    description: 'When flipped, also flip the card that captured it',
    trigger: 'reactive',
  },
};

// Helper to get ability by ID
export const getAbility = (abilityId) => {
  return Object.values(ABILITIES).find(a => a.id === abilityId);
};

// Check if an ability should trigger
export const shouldTriggerAbility = (ability, context) => {
  if (!ability) return false;

  const { trigger, position, boardPosition } = context;

  // Center support only triggers in center (position 4)
  if (ability.id === 'center_boost' && boardPosition !== 4) {
    return false;
  }

  return true;
};
