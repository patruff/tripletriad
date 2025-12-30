# Triple Triad

A web-based recreation of the popular Triple Triad card game from Final Fantasy VIII.

## 🎮 Play Online

**[Play Triple Triad Now!](https://patruff.github.io/tripletriad/)**

The game is deployed and playable at: https://patruff.github.io/tripletriad/

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

### Basic Gameplay

1. **Select a card** - Click on a card in your hand (bottom of screen)
   - Selected card will rise up to show it's active
   - A blue arrow appears below the selected card

2. **Place the card** - Click on an empty cell on the 3x3 board
   - Empty cells show a "?" hint when it's your turn
   - Your cards are outlined in blue, opponent's in red

3. **Card battles** - When placed adjacent to opponent cards, stats are compared
   - Each card has 4 stats: Top, Right, Bottom, Left
   - Stats range from 1-9, with 'A' = 10
   - Higher stat wins and captures the opponent's card

4. **Win condition** - Player with the most cards when the board is full wins!
   - Score is displayed at the top: You vs Opponent
   - Cards count includes both placed cards and remaining hand

### Game Controls

- **Game Rules Button** - Opens the special rules panel
  - Toggle rules ON/OFF before starting a game
  - Rules are locked once the first card is played
  - Shows which rules are currently active

- **New Game Button** - Starts a fresh game
  - Randomly selects 5 cards for each player
  - Generates new elemental grid if Elemental rule is active
  - Keeps your selected rules settings

- **Score Display** - Shows current card count
  - Blue number = Your cards
  - Red number = Opponent's cards

### Understanding Cards

Each card displays:
- **Card Name** - Top right (e.g., "Squall", "Ifrit")
- **Level** - Top left (Lv.1 through Lv.10)
- **Stats** - Large numbers in cross formation
  - Top stat (attacks upward)
  - Right stat (attacks right)
  - Bottom stat (attacks downward)
  - Left stat (attacks left)
- **Element Symbol** - Center circle (if card has an element)
  - 🔥 Fire, ❄️ Ice, ⚡ Thunder, 🌍 Earth
  - ☠️ Poison, 💨 Wind, 💧 Water, ✨ Holy

### Card Colors

- **Blue border** - Your cards
- **Red border** - Opponent's cards
- **Element border color** - Shows card's element type (if any)

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

#### How to Enable Special Rules

1. Click the **"Game Rules"** button
2. Check the boxes for the rules you want to enable
3. Click **"New Game"** to start with those rules
4. Rules **cannot be changed** once the game has started

**Note:** Rules can be combined! Try Same + Combo for explosive chain reactions, or Elemental + Plus for complex strategic gameplay.

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

**Visual Indicator:** When Elemental rule is active, board cells display element symbols and have color-tinted backgrounds.

## Tips & Strategy

- **Study the board** - Look at opponent card positions and plan your moves
- **Save strong cards** - Don't waste high-level cards early
- **Use elements wisely** - A 5-stat card on matching element becomes 6!
- **Corner advantage** - Corner positions only battle 2 directions
- **Edge control** - Edge positions battle 3 directions, center battles 4
- **Combo chains** - With Combo rule, position for chain reactions
- **Same/Plus setups** - Try to create situations where multiple cards match
- **Element positioning** - Place elemental cards on matching cells for +1 boost

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
