# Triple Triad

A web-based recreation of the popular Triple Triad card game from Final Fantasy VIII.

## About

Triple Triad is a strategic card game where two players compete on a 3x3 grid. Each player has a hand of 5 cards with different stats (top, right, bottom, left). Players take turns placing cards on the board, and when a card is placed next to an opponent's card, the stats are compared. If your card's stat is higher, you capture the opponent's card!

## Features

- ✨ 68 cards from FF8 (Levels 1-10)
- 🎮 Play against an AI opponent
- 🎲 Special rules: Same, Plus, Combo, and Elemental
- 🌟 Elemental grid with visual indicators
- 🎨 Clean, modern UI with gradient effects
- 📱 Responsive design
- ⚡ Built with React + Vite for fast performance

## How to Play

1. Select a card from your hand (bottom)
2. Click an empty cell on the board to place it
3. Cards battle adjacent cards - higher stat wins
4. Capture more cards than your opponent to win!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project automatically deploys to GitHub Pages via GitHub Actions when pushed to the main branch.

## Tech Stack

- React 19
- Vite 7
- CSS3 with modern gradients and animations

## Game Rules

### Basic Rules

- Each card has 4 stats: Top, Right, Bottom, Left (1-9, or A=10)
- Players alternate placing cards on a 3x3 grid
- When placed adjacent to an opponent's card, stats are compared
- Higher stat captures the opponent's card
- Player with most cards when board is full wins

### Special Rules

Click "Game Rules" during gameplay to enable/disable these rules before starting a game:

#### Same Rule
When you place a card and **two or more** adjacent cards have **matching values** (e.g., both show 5), all matching cards are captured. This creates strategic opportunities to flip multiple cards with one move.

**Example:** You place a card with Top=7. If adjacent cards to the top and right both have 7 on their facing sides, both get captured!

#### Plus Rule
When you place a card and **two or more** adjacent card comparisons result in the **same sum**, all cards with that sum are captured.

**Example:** You place a card with Top=6 and Right=4. If the top opponent card has Bottom=3 (6+3=9) and the right opponent card has Left=5 (4+5=9), both get captured because the sums match!

#### Combo Rule
When Same or Plus rules trigger and capture cards, those newly captured cards can **immediately flip other adjacent cards** they touch, creating chain reactions. This can lead to massive card swings!

**Example:** Same/Plus captures 2 cards → those 2 cards flip 3 more → those 3 flip 1 more = 6 total captured from one move!

#### Elemental Rule
Board cells are randomly assigned elements (🔥 Fire, ❄️ Ice, ⚡ Thunder, 🌍 Earth, ☠️ Poison, 💨 Wind, 💧 Water, ✨ Holy).

- **Matching element:** Card stats +1 (max 10)
- **Mismatched element:** Card stats -1 (min 1)
- **No element or card:** No modifier

This adds strategic depth - sometimes a weaker card on the right element beats a stronger card on the wrong one!

## Future Enhancements

- More special rules (Random, Open, Sudden Death, Wall Same)
- Deck building system
- Card collection tracking
- Save/load game state
- Online multiplayer
- Sound effects and music
- Card trading system
- Actual card artwork

## Credits

Based on Triple Triad from Final Fantasy VIII by Square Enix.

## License

This is a fan project created for educational purposes.
