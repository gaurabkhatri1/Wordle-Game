// src/utils/checkGuess.js
// -----------------------------------------------------------------------------
// THE BRAIN OF WORDLE: comparing a guess to the secret answer.
//
// For every letter the player typed, we must decide its color:
//   - 'correct'  (green)  -> right letter, right position
//   - 'present'  (yellow) -> right letter, WRONG position
//   - 'absent'   (grey)   -> letter is not in the word at all
//
// This sounds easy... until you meet DUPLICATE letters. That edge case trips up
// almost everyone the first time, so we handle it very carefully below with a
// two-pass approach. Read the comments slowly!
// -----------------------------------------------------------------------------

/**
 * Compare a guessed word against the secret answer and return a color for
 * each letter.
 *
 * @param {string} guess  - the 5-letter word the player typed, e.g. "brave"
 * @param {string} answer - the secret 5-letter word, e.g. "crane"
 * @returns {Array<{ letter: string, status: 'correct' | 'present' | 'absent' }>}
 *          one object per letter, in order.
 */
export function checkGuess(guess, answer) {
  const normalizedGuess = String(guess).toLowerCase();
  const normalizedAnswer = String(answer).toLowerCase();

  // Turn each word into an array of single letters so we can loop over them.
  // "brave" -> ['b', 'r', 'a', 'v', 'e']
  const guessLetters = normalizedGuess.split('');
  const answerLetters = normalizedAnswer.split('');

  // We'll fill this array with a result object for each letter.
  // We start everyone as 'absent' (grey) and "upgrade" them below.
  const result = guessLetters.map((letter) => ({ letter, status: 'absent' }));

  // -------------------------------------------------------------------------
  // WHY TWO PASSES?
  //
  // Imagine the answer is "apple" and the guess is "pppppp"-ish. Each 'p' in
  // the guess should only be allowed to "use up" a real 'p' from the answer
  // ONCE. If we don't track how many letters remain, we could wrongly color
  // extra duplicate letters yellow.
  //
  // So we keep a "tally" of the answer's letters that are still available to
  // be matched. Greens claim their letter first (pass 1), then yellows claim
  // from whatever letters are left over (pass 2).
  // -------------------------------------------------------------------------

  // Build a count of each letter in the answer. e.g. "apple" -> { a:1, p:2, l:1, e:1 }
  const letterCounts = {};
  for (const letter of answerLetters) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // ---- PASS 1: find the GREENS (correct letter AND correct position). -------
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i].status = 'correct';
      // This letter is now "claimed", so reduce how many are available.
      letterCounts[guessLetters[i]]--;
    }
  }

  // ---- PASS 2: find the YELLOWS (right letter, wrong spot). -----------------
  for (let i = 0; i < guessLetters.length; i++) {
    // Skip letters we already coloured green in pass 1.
    if (result[i].status === 'correct') continue;

    const letter = guessLetters[i];

    // Is this letter still available somewhere in the answer?
    // If its remaining count is greater than 0, we can mark it yellow.
    if (letterCounts[letter] > 0) {
      result[i].status = 'present';
      letterCounts[letter]--; // claim one, so later duplicates can't reuse it.
    }
    // Otherwise it stays 'absent' (grey) from our default above.
  }

  return result;
}

/**
 * Update the keyboard's known statuses with a newly evaluated guess.
 * Keeps the strongest status for each key: correct > present > absent.
 *
 * @param {Object} prevStatuses - map from letter (lowercase) to status
 * @param {Array} evaluated - array of { letter, status } from checkGuess()
 * @returns {Object} nextStatuses
 */
export function updateKeyStatuses(prevStatuses, evaluated) {
  const next = { ...(prevStatuses || {}) };
  const rank = { absent: 0, present: 1, correct: 2 };

  for (const { letter, status } of evaluated) {
    const key = String(letter).toLowerCase();
    const prev = next[key];
    if (!prev || rank[status] > rank[prev]) {
      next[key] = status;
    }
  }

  return next;
}