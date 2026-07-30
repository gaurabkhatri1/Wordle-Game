// src/App.jsx
// -----------------------------------------------------------------------------
// THE TOP-LEVEL COMPONENT that assembles the whole game.
//
// Think of App as the "conductor of the orchestra". It:
//   1. Picks the secret answer.
//   2. Calls our useWordle hook to get the game state + input handler.
//   3. Listens for real (physical) keyboard presses.
//   4. Renders the Board and Keyboard.
//   5. Shows a win/lose message and a "Play Again" button when the game ends.
// -----------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useWordle, MAX_TURNS } from './hooks/useWordle';
import { getRandomWord } from './data/words';
import './App.css';

export default function App() {
  // The secret answer for the CURRENT game. We store it in state so that a
  // "Play Again" click can swap in a brand-new word. We pass a function to
  // useState (called a "lazy initializer") so getRandomWord only runs once,
  // on the very first render — not on every re-render.
  const [answer, setAnswer] = useState(() => getRandomWord());

  // Ask our custom hook for everything we need to run the game.
  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, error } =
    useWordle(answer);

  // The game is over if the player guessed correctly OR ran out of turns.
  const isGameOver = isCorrect || turn >= MAX_TURNS;

  // ------------------------------------------------ listen to the REAL keyboard
  // useEffect lets us run "side effects" — things outside of React's normal
  // drawing, like attaching a browser event listener. Here we listen for every
  // keydown on the whole page and forward it to our hook's handler.
  useEffect(() => {
    // If the game is over, we stop accepting keyboard input.
    if (isGameOver) return;

    const onKeyDown = (event) => handleKeyup(event.key);

    // Start listening when this component appears / re-runs.
    window.addEventListener('keydown', onKeyDown);

    // CLEANUP: React runs this returned function before the next effect and
    // when the component unmounts. Removing the old listener prevents the same
    // keypress from being handled twice.
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyup, isGameOver]);

  // Start a fresh game: pick a new word and reload so all state resets cleanly.
  // (Reloading is the simplest possible reset — perfect for a tutorial.)
  const handlePlayAgain = () => {
    setAnswer(getRandomWord());
    window.location.reload();
  };

  return (
    <div className="app">
      <h1>React Wordle</h1>
      <p className="subtitle">Guess the 5-letter word in 6 tries.</p>
      {error && <p className="error">{error}</p>}

      {/* The 6x5 grid of tiles. */}
      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} />

      {/* When the game ends, show the result and a way to play again. */}
      {isGameOver && (
        <div className="message">
          {isCorrect ? (
            <p className="win">🎉 You got it! The word was "{answer}".</p>
          ) : (
            <p className="lose">😢 Out of tries! The word was "{answer}".</p>
          )}
          <button className="play-again" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}

      {/* The clickable on-screen keyboard. It shares the same input handler. */}
      <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyup} />
    </div>
  );
}