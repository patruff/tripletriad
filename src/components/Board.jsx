import Card from './Card';
import './Board.css';

const Board = ({ board, onCellClick, currentPlayer }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`board-cell ${cell === null ? 'empty' : ''}`}
          onClick={() => cell === null && onCellClick(index)}
        >
          {cell ? (
            <Card card={cell.card} owner={cell.owner} />
          ) : (
            <div className="empty-cell">
              {currentPlayer === 'blue' && <span className="cell-hint">?</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
