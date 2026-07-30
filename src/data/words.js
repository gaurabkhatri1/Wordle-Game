// src/data/words.js
// -----------------------------------------------------------------------------
// This file holds our game's dictionary of 5-letter words.
//
// In a "real" Wordle you would load thousands of words, and you might even
// fetch them from a server. To keep this tutorial focused on React (and not on
// data-loading), we simply hard-code a small list right here in the code.
//
// TWO jobs live in this file:
//   1. WORDS      -> the list of every valid word the player can guess.
//   2. getRandomWord() -> picks one secret answer to start a new game.
// -----------------------------------------------------------------------------

// A plain JavaScript array of strings. Feel free to add more 5-letter words!
// We keep them lowercase so comparisons are simple and consistent.
export const WORDS = [
    'apple',
    'brave',
    'crane',
    'drink',
    'eagle',
    'flame',
    'grape',
    'house',
    'input',
    'joker',
    'knife',
    'lemon',
    'mango',
    'night',
    'ocean',
    'pilot',
    'queen',
    'river',
    'stone',
    'tiger',
    'unity',
    'vivid',
    'water',
    'xenon',
    'yacht',
    'zebra',
];

/**
 * Pick a random word from the WORDS list to be the secret answer.
 *
 * Math.random()            -> a decimal between 0 and 1 (e.g. 0.42)
 * * WORDS.length           -> scale it up to the size of our list
 * Math.floor(...)          -> round down to a whole number index (0, 1, 2, ...)
 *
 * @returns {string} a single random 5-letter word, e.g. "crane"
 */
export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}

// Backwards-compatible exports expected by the rest of the app
export function getRandomAnswer() {
    return getRandomWord()
}

// A Set of valid guesses for quick membership checks. Keep words lowercase.
export const VALID_GUESSES = new Set(WORDS)