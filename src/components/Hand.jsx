import Card from './Card';
import './Hand.css';

const Hand = ({ cards, owner, onCardClick, selectedCard, isCurrentPlayer }) => {
  return (
    <div className={`hand ${owner}`}>
      <div className="hand-label">
        {owner === 'blue' ? 'Your Hand' : "Opponent's Hand"}
      </div>
      <div className="hand-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`hand-card ${selectedCard === index ? 'selected' : ''}`}
          >
            {owner === 'blue' ? (
              <Card
                card={card}
                owner={owner}
                onClick={() => isCurrentPlayer && onCardClick(index)}
                isPlayable={isCurrentPlayer}
              />
            ) : (
              <div className="card-back">?</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hand;
