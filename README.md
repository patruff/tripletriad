# Triple Triad

A web-based recreation of the popular Triple Triad card game from Final Fantasy VIII.

## About

Triple Triad is a strategic card game where two players compete on a 3x3 grid. Each player has a hand of 5 cards with different stats (top, right, bottom, left). Players take turns placing cards on the board, and when a card is placed next to an opponent's card, the stats are compared. If your card's stat is higher, you capture the opponent's card!

## Features

- ✨ 68 cards from FF8 (Levels 1-10)
- 🎮 Play against an AI opponent
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

## Game Rules (Basic)

- Each card has 4 stats: Top, Right, Bottom, Left (1-9, or A=10)
- Players alternate placing cards on a 3x3 grid
- When placed adjacent to an opponent's card, stats are compared
- Higher stat captures the opponent's card
- Player with most cards when board is full wins

## Future Enhancements

- Special rules (Same, Plus, Combo, Elemental)
- Deck building system
- Card collection tracking
- Online multiplayer
- Sound effects and music
- Card trading system

## Credits

Based on Triple Triad from Final Fantasy VIII by Square Enix.

## License

This is a fan project created for educational purposes.
