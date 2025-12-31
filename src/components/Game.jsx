import { useState, useEffect } from 'react';
import Board from './Board';
import Hand from './Hand';
import DeckBuilder from './DeckBuilder';
import { getRandomDeck } from '../data/cards';
import {
  createInitialState,
  placeCard,
  getScore,
  getAIMove,
  PLAYER,
  RULES,
  generateElementalGrid,
} from '../game/gameLogic';
import './Game.css';

const Game = () => {
  const [gameState, setGameState] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [message, setMessage] = useState('');
  const [activeRules, setActiveRules] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [playerDeck, setPlayerDeck] = useState(null);
  const [showDeckBuilder, setShowDeckBuilder] = useState(true);

  const startNewGame = (customDeck = null) => {
    // Use custom deck or the saved player deck
    const deck = customDeck || playerDeck || getRandomDeck(5, 30);
    const opponentDeck = getRandomDeck(5, 30);

    // Generate elemental grid if Elemental rule is active
    const elementalGrid = activeRules.includes(RULES.ELEMENTAL)
      ? generateElementalGrid()
      : null;

    const initialState = createInitialState(deck, opponentDeck, activeRules, elementalGrid);
    setGameState(initialState);
    setSelectedCard(null);
    setMessage('Select a card from your hand, then click on the board to place it.');
  };

  const handleDeckComplete = (deck) => {
    setPlayerDeck(deck);
    setShowDeckBuilder(false);
    startNewGame(deck);
  };

  // Initialize with deck builder
  useEffect(() => {
    // Don't auto-start, let user build deck first
  }, []);

  const toggleRule = (rule) => {
    setActiveRules(prev => {
      if (prev.includes(rule)) {
        return prev.filter(r => r !== rule);
      } else {
        return [...prev, rule];
      }
    });
  };

  // Handle card selection from hand
  const handleCardSelect = (cardIndex) => {
    if (gameState.currentPlayer === PLAYER.BLUE && !gameState.gameOver) {
      setSelectedCard(cardIndex);
      setMessage('Now click on an empty cell on the board to place your card.');
    }
  };

  // Handle placing card on board
  const handleCellClick = (position) => {
    if (gameState.gameOver) return;

    if (gameState.currentPlayer === PLAYER.BLUE) {
      if (selectedCard === null) {
        setMessage('Please select a card from your hand first.');
        return;
      }

      const newState = placeCard(gameState, position, selectedCard);
      if (newState) {
        setGameState(newState);
        setSelectedCard(null);

        if (newState.gameOver) {
          announceWinner(newState.winner);
        } else {
          setMessage("Opponent's turn...");
          // AI turn will be triggered by useEffect
        }
      } else {
        setMessage('Invalid move. Try again.');
      }
    }
  };

  // AI turn
  useEffect(() => {
    if (
      gameState &&
      gameState.currentPlayer === PLAYER.RED &&
      !gameState.gameOver
    ) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(gameState);
        const newState = placeCard(gameState, aiMove.position, aiMove.cardIndex);

        if (newState) {
          setGameState(newState);

          if (newState.gameOver) {
            announceWinner(newState.winner);
          } else {
            setMessage('Your turn! Select a card from your hand.');
          }
        }
      }, 1000); // 1 second delay for AI move

      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const announceWinner = (winner) => {
    if (winner === PLAYER.BLUE) {
      setMessage('🎉 You win! Congratulations!');
    } else if (winner === PLAYER.RED) {
      setMessage('😔 You lose. Better luck next time!');
    } else {
      setMessage("🤝 It's a draw!");
    }
  };

  // Show deck builder if user hasn't built a deck yet
  if (showDeckBuilder) {
    return <DeckBuilder onDeckComplete={handleDeckComplete} initialDeck={playerDeck || []} />;
  }

  if (!gameState) {
    return <div className="game">Loading...</div>;
  }

  const score = getScore(gameState.board);

  return (
    <div className="game">
      <header className="game-header">
        <h1>Triple Triad</h1>
        <p className="game-subtitle">Final Fantasy VIII Card Game</p>
      </header>

      <div className="game-info">
        <div className="score-board">
          <div className="score blue">
            <span className="score-label">You</span>
            <span className="score-value">{score.blue}</span>
          </div>
          <div className="score red">
            <span className="score-label">Opponent</span>
            <span className="score-value">{score.red}</span>
          </div>
        </div>
        <div className="game-message">{message}</div>
      </div>

      <Hand
        cards={gameState.opponentHand}
        owner="red"
        onCardClick={() => {}}
        selectedCard={null}
        isCurrentPlayer={false}
      />

      <Board
        board={gameState.board}
        onCellClick={handleCellClick}
        currentPlayer={gameState.currentPlayer}
        elementalGrid={gameState.elementalGrid}
      />

      <Hand
        cards={gameState.playerHand}
        owner="blue"
        onCardClick={handleCardSelect}
        selectedCard={selectedCard}
        isCurrentPlayer={gameState.currentPlayer === PLAYER.BLUE}
      />

      <div className="game-controls">
        <button
          className="deck-btn"
          onClick={() => setShowDeckBuilder(true)}
        >
          Build Deck
        </button>
        <button
          className="rules-btn"
          onClick={() => setShowRules(!showRules)}
        >
          {showRules ? 'Hide Rules' : 'Game Rules'}
        </button>
        <button className="new-game-btn" onClick={() => startNewGame()}>
          New Game
        </button>
      </div>

      {showRules && (
        <div className="rules-panel">
          <h3>Special Rules</h3>
          <div className="rules-list">
            <label className="rule-option">
              <input
                type="checkbox"
                checked={activeRules.includes(RULES.SAME)}
                onChange={() => toggleRule(RULES.SAME)}
                disabled={gameState.board.some(cell => cell !== null)}
              />
              <span>
                <strong>Same:</strong> If 2+ adjacent cards have matching values, capture all
              </span>
            </label>
            <label className="rule-option">
              <input
                type="checkbox"
                checked={activeRules.includes(RULES.PLUS)}
                onChange={() => toggleRule(RULES.PLUS)}
                disabled={gameState.board.some(cell => cell !== null)}
              />
              <span>
                <strong>Plus:</strong> If 2+ adjacent cards have matching sums, capture all
              </span>
            </label>
            <label className="rule-option">
              <input
                type="checkbox"
                checked={activeRules.includes(RULES.COMBO)}
                onChange={() => toggleRule(RULES.COMBO)}
                disabled={gameState.board.some(cell => cell !== null)}
              />
              <span>
                <strong>Combo:</strong> Captured cards can capture other cards in a chain
              </span>
            </label>
            <label className="rule-option">
              <input
                type="checkbox"
                checked={activeRules.includes(RULES.ELEMENTAL)}
                onChange={() => toggleRule(RULES.ELEMENTAL)}
                disabled={gameState.board.some(cell => cell !== null)}
              />
              <span>
                <strong>Elemental:</strong> Board cells have elements. Matching element +1, mismatched -1
              </span>
            </label>
          </div>
          {gameState.board.some(cell => cell !== null) && (
            <p className="rule-warning">Rules can only be changed before the game starts</p>
          )}
          {activeRules.length > 0 && (
            <div className="active-rules">
              <strong>Active:</strong> {activeRules.join(', ').toUpperCase()}
            </div>
          )}
        </div>
      )}

      {gameState.gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>{message}</h2>
            <p>Final Score: You {score.blue} - {score.red} Opponent</p>
            <button className="play-again-btn" onClick={() => startNewGame()}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
