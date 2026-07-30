import test from 'node:test';
import assert from 'node:assert/strict';
import { checkGuess } from '../src/utils/checkGuess.js';

test('checkGuess normalizes mixed-case input before comparing letters', () => {
    const result = checkGuess('ApPle', 'apple');

    assert.deepEqual(result, [
        { letter: 'a', status: 'correct' },
        { letter: 'p', status: 'correct' },
        { letter: 'p', status: 'correct' },
        { letter: 'l', status: 'correct' },
        { letter: 'e', status: 'correct' },
    ]);
});
