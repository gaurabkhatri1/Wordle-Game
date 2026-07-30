// src/components/Tile.jsx
// -----------------------------------------------------------------------------
// A TILE is the smallest building block: a single square holding one letter.
//
// It is a "presentational" component, meaning it has NO logic of its own. It
// just receives two pieces of information (called "props") from its parent and
// draws itself accordingly:
//   - letter: the character to show ('c', 'r', ...) or empty ''
//   - status: the colour to use ('correct' | 'present' | 'absent') or undefined
// -----------------------------------------------------------------------------

export default function Tile({ letter, status }) {
    // We build the CSS class name dynamically. Every tile gets the base "tile"
    // class. If it has a status (green/yellow/grey), we append that too, e.g.
    // "tile correct". The .trim() removes the trailing space when status is empty.
    const className = `tile ${status ? status : ''}`.trim();

    return <div className={className}>{letter}</div>;
}