// Card Abilities System

export const ABILITY_TYPES = {
  NONE: 'none',
  SUPPORT: 'support',
  SABOTAGE: 'sabotage',
  SLAYER: 'slayer',
  SHIELD: 'shield',
  SWARM: 'swarm',
  UNDEAD: 'undead',
  FLYING: 'flying',
  HEAVY: 'heavy',
  TACTICAL: 'tactical',
};

export const TRIGGER_TYPES = {
  PASSIVE: 'passive',       // Always active (aura)
  ON_PLAY: 'on_play',       // Triggers when card is placed (battlecry)
  ON_FLIP: 'on_flip',       // Triggers when card is captured (deathrattle)
  REACTIVE: 'reactive',     // Triggers in response to events
};

export const ABILITIES = {
  // Support Abilities
  CENTER_BOOST: {
    id: 'center_boost',
    type: ABILITY_TYPES.SUPPORT,
    name: 'Center Support',
    description: 'If in center position, adjacent friendly cards get +1 to their lowest side',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  ELEMENTAL_MASTERY: {
    id: 'elemental_mastery',
    type: ABILITY_TYPES.SUPPORT,
    name: 'Elemental Mastery',
    description: 'Doubles element bonus (+2 instead of +1 on matching element)',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  // Sabotage Abilities
  BAD_BREATH: {
    id: 'bad_breath',
    type: ABILITY_TYPES.SABOTAGE,
    name: 'Bad Breath',
    description: 'Adjacent enemy cards have their stats reduced by 1',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  POISON_AURA: {
    id: 'poison_aura',
    type: ABILITY_TYPES.SABOTAGE,
    name: 'Poison Aura',
    description: 'Enemy cards placed adjacent this turn get -2 to all sides',
    trigger: TRIGGER_TYPES.REACTIVE,
  },

  // Slayer Abilities
  GIANT_SLAYER: {
    id: 'giant_slayer',
    type: ABILITY_TYPES.SLAYER,
    name: 'Giant Slayer',
    description: 'Your 1-3 stats beat enemy A (10) stats',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  ACE_HUNTER: {
    id: 'ace_hunter',
    type: ABILITY_TYPES.SLAYER,
    name: 'Ace Hunter',
    description: 'Treats all enemy A (10) values as 5',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  // Shield Abilities
  FORTRESS: {
    id: 'fortress',
    type: ABILITY_TYPES.SHIELD,
    name: 'Fortress',
    description: 'Cannot be flipped by basic comparison (only Same/Plus)',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  REFLECT: {
    id: 'reflect',
    type: ABILITY_TYPES.SHIELD,
    name: 'Reflect',
    description: 'When flipped, also flip the card that captured it',
    trigger: TRIGGER_TYPES.ON_FLIP,
  },

  // Swarm Abilities
  HIVE_MIND: {
    id: 'hive_mind',
    type: ABILITY_TYPES.SWARM,
    name: 'Hive Mind',
    description: 'Gain +1 to all stats for every other copy of this card on the board',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  INFESTATION: {
    id: 'infestation',
    type: ABILITY_TYPES.SWARM,
    name: 'Infestation',
    description: 'When played, spawn a weak token (1/1/1/1) in a random adjacent empty slot',
    trigger: TRIGGER_TYPES.ON_PLAY,
  },

  SYMBIOSIS: {
    id: 'symbiosis',
    type: ABILITY_TYPES.SWARM,
    name: 'Symbiosis',
    description: 'If placed next to another Swarm card, both cannot be flipped by Same/Plus',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  // Undead Abilities
  HAUNT: {
    id: 'haunt',
    type: ABILITY_TYPES.UNDEAD,
    name: 'Haunt',
    description: 'When flipped, immediately flip one random adjacent card',
    trigger: TRIGGER_TYPES.ON_FLIP,
  },

  REANIMATE: {
    id: 'reanimate',
    type: ABILITY_TYPES.UNDEAD,
    name: 'Reanimate',
    description: 'If this card is in your hand at game end, it counts as captured',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  CURSE: {
    id: 'curse',
    type: ABILITY_TYPES.UNDEAD,
    name: 'Curse',
    description: "When played, permanently reduce one adjacent enemy card's stats by 1",
    trigger: TRIGGER_TYPES.ON_PLAY,
  },

  // Flying Abilities
  HOVER: {
    id: 'hover',
    type: ABILITY_TYPES.FLYING,
    name: 'Hover',
    description: 'Ignores elemental tile penalties (but still gains bonuses)',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  AMBUSH: {
    id: 'ambush',
    type: ABILITY_TYPES.FLYING,
    name: 'Ambush',
    description: 'Can be played on top of an existing card if its total power is less than 10',
    trigger: TRIGGER_TYPES.ON_PLAY,
  },

  SCOUT: {
    id: 'scout',
    type: ABILITY_TYPES.FLYING,
    name: 'Scout',
    description: 'When played, reveal one random card from opponent\'s hand',
    trigger: TRIGGER_TYPES.ON_PLAY,
  },

  // Heavy Abilities
  LOCKDOWN: {
    id: 'lockdown',
    type: ABILITY_TYPES.HEAVY,
    name: 'Lockdown',
    description: 'Cannot be flipped by combo rules (Same/Plus). Only direct comparison',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  SELF_DESTRUCT: {
    id: 'self_destruct',
    type: ABILITY_TYPES.HEAVY,
    name: 'Self-Destruct',
    description: 'When flipped, remove this card from the board entirely (empty space)',
    trigger: TRIGGER_TYPES.ON_FLIP,
  },

  ARMOR_PLATING: {
    id: 'armor_plating',
    type: ABILITY_TYPES.HEAVY,
    name: 'Armor Plating',
    description: 'The first time this would be flipped, prevent it (requires two attacks)',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  // Tactical Abilities
  AMPLIFIER: {
    id: 'amplifier',
    type: ABILITY_TYPES.TACTICAL,
    name: 'Amplifier',
    description: 'Adjacent friendly cards gain +2 to the side touching this card',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  MIRROR: {
    id: 'mirror',
    type: ABILITY_TYPES.TACTICAL,
    name: 'Mirror',
    description: 'Copies the stats of the card to its left',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  NULLIFIER: {
    id: 'nullifier',
    type: ABILITY_TYPES.TACTICAL,
    name: 'Nullifier',
    description: 'Silences the abilities of all adjacent cards',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  // Specific Signature Abilities
  SCAVENGE: {
    id: 'scavenge',
    type: ABILITY_TYPES.SUPPORT,
    name: 'Scavenge',
    description: 'If you win the match with this card on the board, gain bonus points',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  TEN_THOUSAND_NEEDLES: {
    id: '10000_needles',
    type: ABILITY_TYPES.SLAYER,
    name: '10,000 Needles',
    description: 'If this card attacks a side with value A (10), it wins automatically',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  GRUDGE: {
    id: 'grudge',
    type: ABILITY_TYPES.UNDEAD,
    name: 'Grudge',
    description: 'Gain +1 to all sides for every card you have lost (flipped) this match',
    trigger: TRIGGER_TYPES.PASSIVE,
  },

  EXPLODE: {
    id: 'explode',
    type: ABILITY_TYPES.HEAVY,
    name: 'Explode',
    description: 'When flipped, turn all adjacent cards into empty spaces',
    trigger: TRIGGER_TYPES.ON_FLIP,
  },

  ROAR: {
    id: 'roar',
    type: ABILITY_TYPES.HEAVY,
    name: 'Roar',
    description: 'When played, opponent cannot place cards adjacent to this on their next turn',
    trigger: TRIGGER_TYPES.ON_PLAY,
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
