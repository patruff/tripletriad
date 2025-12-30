import './Card.css';

const Card = ({ card, owner, onClick, isPlayable }) => {
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
