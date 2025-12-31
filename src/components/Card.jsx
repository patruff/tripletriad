import './Card.css';
import { getAbility } from '../data/abilities';

const Card = ({ card, owner, onClick, isPlayable, showAbility = false }) => {
  if (!card) return null;

  const getStatDisplay = (stat) => {
    return stat === 10 ? 'A' : stat;
  };

  const getElementColor = (element) => {
    const colors = {
      fire: '#ff4444',
      ice: '#44bbff',
      thunder: '#ffdd44',
      earth: '#88cc44',
      poison: '#cc44cc',
      wind: '#aaffaa',
      water: '#4488ff',
      holy: '#ffffaa',
      none: 'transparent',
    };
    return colors[element] || 'transparent';
  };

  const getAbilityIcon = (ability) => {
    const icons = {
      // Original abilities
      center_boost: '🎯',
      elemental_mastery: '⚡',
      bad_breath: '☠️',
      poison_aura: '💀',
      giant_slayer: '⚔️',
      ace_hunter: '🏹',
      fortress: '🛡️',
      reflect: '🔄',
      // Swarm abilities
      hive_mind: '🐝',
      infestation: '🦗',
      symbiosis: '🤝',
      // Undead abilities
      haunt: '👻',
      reanimate: '🧟',
      curse: '😈',
      // Flying abilities
      hover: '🪶',
      ambush: '🦅',
      scout: '👁️',
      // Heavy abilities
      lockdown: '⚓',
      self_destruct: '💣',
      armor_plating: '🛡️',
      // Tactical abilities
      amplifier: '📢',
      mirror: '🪞',
      nullifier: '🚫',
      // Signature abilities
      scavenge: '🦴',
      '10000_needles': '🌵',
      grudge: '😠',
      explode: '💥',
      roar: '🦁',
    };
    return icons[ability] || '✨';
  };

  const abilityData = card.ability ? getAbility(card.ability) : null;

  return (
    <div
      className={`card ${owner} ${isPlayable ? 'playable' : ''}`}
      onClick={onClick}
      style={{
        borderColor: getElementColor(card.element),
      }}
    >
      <div className="card-header">
        <div className="card-level">Lv.{card.level}</div>
        <div className="card-name">{card.name}</div>
        {showAbility && card.ability && abilityData && (
          <div
            className="card-ability-icon"
            data-tooltip={`${abilityData.name}\n${abilityData.description}`}
          >
            {getAbilityIcon(card.ability)}
          </div>
        )}
      </div>
      <div className="card-stats">
        <div className="stat stat-top">{getStatDisplay(card.stats[0])}</div>
        <div className="stat-middle">
          <div className="stat stat-left">{getStatDisplay(card.stats[3])}</div>
          <div className="card-center">
            {card.element !== 'none' && (
              <div
                className="element-icon"
                style={{ backgroundColor: getElementColor(card.element) }}
              />
            )}
          </div>
          <div className="stat stat-right">{getStatDisplay(card.stats[1])}</div>
        </div>
        <div className="stat stat-bottom">{getStatDisplay(card.stats[2])}</div>
      </div>
    </div>
  );
};

export default Card;
