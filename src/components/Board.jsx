import Card from './Card';
import './Board.css';

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

const getElementSymbol = (element) => {
  const symbols = {
    fire: '🔥',
    ice: '❄️',
    thunder: '⚡',
    earth: '🌍',
    poison: '☠️',
    wind: '💨',
    water: '💧',
    holy: '✨',
    none: '',
  };
  return symbols[element] || '';
};

const Board = ({ board, onCellClick, currentPlayer, elementalGrid = null }) => {
  return (
    <div className="board">
      {board.map((cell, index) => {
        const element = elementalGrid ? elementalGrid[index] : 'none';
        const hasElement = element !== 'none';

        return (
          <div
            key={index}
            className={`board-cell ${cell === null ? 'empty' : ''} ${hasElement ? 'elemental' : ''}`}
            onClick={() => cell === null && onCellClick(index)}
            style={{
              backgroundColor: hasElement
                ? `${getElementColor(element)}15`
                : undefined,
            }}
          >
            {hasElement && (
              <div className="cell-element" style={{ color: getElementColor(element) }}>
                {getElementSymbol(element)}
              </div>
            )}
            {cell ? (
              <Card card={cell.card} owner={cell.owner} showAbility={true} />
            ) : (
              <div className="empty-cell">
                {currentPlayer === 'blue' && <span className="cell-hint">?</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
