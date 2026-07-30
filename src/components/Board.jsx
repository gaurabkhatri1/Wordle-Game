// src/components/Board.jsx
// -----------------------------------------------------------------------------
// The BOARD is the full 6x5 grid: 6 Rows stacked vertically.
//
// Its job is to figure out, for each of the 6 rows, WHICH state that row is in
// and hand the right data down to the <Row /> component:
//   - Rows BEFORE the current turn  -> a submitted guess (coloured).
//   - The row AT the current turn   -> the live text being typed.
//   - Rows AFTER the current turn   -> empty.
// -----------------------------------------------------------------------------

import Row from './Row';
import { MAX_TURNS } from '../hooks/useWordle';

export default function Board({ guesses, currentGuess, turn }) {
    return (
        <div className="board">
            {/* Build an array of 6 rows and render a <Row /> for each. */}
            {Array.from({ length: MAX_TURNS }).map((_, index) => {
                // Is THIS row the one the player is actively typing in right now?
                const isCurrentRow = index === turn;

                return (
                    <Row
                        key={index}
                        // The already-submitted guess for this row (or null if not yet played).
                        guess={guesses[index]}
                        // Only the active row receives the live `currentGuess` text.
                        // Every other row receives null, so it shows blanks or its colours.
                        currentGuess={isCurrentRow ? currentGuess : null}
                    />
                );
            })}
        </div>
    );
}