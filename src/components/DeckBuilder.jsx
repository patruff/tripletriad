import { useState } from 'react';
import { cards, DECK_COST_LIMIT, calculateDeckCost, isValidDeck } from '../data/cards';
import { getAbility } from '../data/abilities';
import Card from './Card';
import './DeckBuilder.css';

const DeckBuilder = ({ onDeckComplete, initialDeck = [] }) => {
  const [selectedCards, setSelectedCards] = useState(initialDeck);
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterElement, setFilterElement] = useState('all');

  const totalCost = calculateDeckCost(selectedCards);
  const remainingCost = DECK_COST_LIMIT - totalCost;
  const isDeckComplete = selectedCards.length === 5;
  const isDeckValid = isValidDeck(selectedCards, 5, DECK_COST_LIMIT);

  const handleCardClick = (card) => {
    const isSelected = selectedCards.some(c => c.id === card.id);

    if (isSelected) {
      // Remove card from deck
      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
    } else {
      // Add card to deck if there's room and cost allows
      if (selectedCards.length < 5 && totalCost + card.cost <= DECK_COST_LIMIT) {
        setSelectedCards([...selectedCards, card]);
      }
    }
  };

  const handleClearDeck = () => {
    setSelectedCards([]);
  };

  const handleRandomDeck = () => {
    const { getRandomDeck } = require('../data/cards');
    const randomDeck = getRandomDeck(5, DECK_COST_LIMIT);
    setSelectedCards(randomDeck);
  };

  const handleSaveDeck = () => {
    if (isDeckComplete && isDeckValid) {
      onDeckComplete(selectedCards);
    }
  };

  // Filter cards
  const filteredCards = cards.filter(card => {
    if (filterLevel !== 'all' && card.level !== parseInt(filterLevel)) {
      return false;
    }
    if (filterElement !== 'all' && card.element !== filterElement) {
      return false;
    }
    return true;
  });

  return (
    <div className="deck-builder">
      <div className="deck-builder-header">
        <h2>Deck Builder</h2>
        <p className="deck-subtitle">Build a deck of 5 cards with a maximum cost of {DECK_COST_LIMIT}</p>
      </div>

      <div className="deck-status">
        <div className="deck-cost">
          <span className="label">Total Cost:</span>
          <span className={`value ${totalCost > DECK_COST_LIMIT ? 'over-limit' : ''}`}>
            {totalCost} / {DECK_COST_LIMIT}
          </span>
        </div>
        <div className="deck-cards">
          <span className="label">Cards:</span>
          <span className={`value ${!isDeckComplete ? 'incomplete' : ''}`}>
            {selectedCards.length} / 5
          </span>
        </div>
        {!isDeckValid && isDeckComplete && (
          <div className="deck-error">⚠️ Deck exceeds cost limit!</div>
        )}
      </div>

      <div className="selected-deck">
        <h3>Your Deck {isDeckComplete && isDeckValid && '✓'}</h3>
        <div className="selected-cards">
          {[...Array(5)].map((_, index) => {
            const card = selectedCards[index];
            return (
              <div key={index} className="deck-slot">
                {card ? (
                  <div className="deck-card-wrapper" onClick={() => handleCardClick(card)}>
                    <Card card={card} owner="blue" showAbility={true} />
                    <div className="card-cost">Cost: {card.cost}</div>
                    {card.ability && (
                      <div className="card-ability-badge">
                        {getAbility(card.ability)?.type}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty-deck-slot">Empty</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="deck-actions">
        <button onClick={handleClearDeck} className="btn-secondary">
          Clear Deck
        </button>
        <button onClick={handleRandomDeck} className="btn-secondary">
          Random Deck
        </button>
        <button
          onClick={handleSaveDeck}
          className="btn-primary"
          disabled={!isDeckComplete || !isDeckValid}
        >
          {onDeckComplete ? 'Start Game' : 'Save Deck'}
        </button>
      </div>

      <div className="card-filters">
        <label>
          Level:
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            <option value="all">All Levels</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Level {i + 1}</option>
            ))}
          </select>
        </label>
        <label>
          Element:
          <select value={filterElement} onChange={(e) => setFilterElement(e.target.value)}>
            <option value="all">All Elements</option>
            <option value="none">None</option>
            <option value="fire">Fire</option>
            <option value="ice">Ice</option>
            <option value="thunder">Thunder</option>
            <option value="earth">Earth</option>
            <option value="poison">Poison</option>
            <option value="wind">Wind</option>
            <option value="water">Water</option>
            <option value="holy">Holy</option>
          </select>
        </label>
      </div>

      <div className="card-collection">
        <h3>Card Collection ({filteredCards.length} cards)</h3>
        <div className="collection-grid">
          {filteredCards.map((card) => {
            const isSelected = selectedCards.some(c => c.id === card.id);
            const canAfford = totalCost + card.cost <= DECK_COST_LIMIT;
            const hasRoom = selectedCards.length < 5;
            const canSelect = !isSelected && canAfford && hasRoom;

            return (
              <div
                key={card.id}
                className={`collection-card ${isSelected ? 'selected' : ''} ${!canSelect && !isSelected ? 'disabled' : ''}`}
                onClick={() => handleCardClick(card)}
              >
                <Card card={card} owner="blue" isPlayable={canSelect || isSelected} showAbility={true} />
                <div className="card-info">
                  <div className="card-cost-badge">Cost: {card.cost}</div>
                  {card.ability && (
                    <div className="card-ability-info">
                      <strong>{getAbility(card.ability)?.name}</strong>
                      <p>{getAbility(card.ability)?.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;
