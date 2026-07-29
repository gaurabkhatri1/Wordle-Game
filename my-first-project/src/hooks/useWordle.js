import { useState } from 'react';
import { checkGuess } from '../utils/checkGuess';

export const WORD_LENGTH = 5;
export const MAX_TURNS = 6;

export function useWordle(answer) {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState(Array(MAX_TURNS).fill(null));
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const addLetter = (letter) => {
        setCurrentGuess((prev) =>
            prev.length < WORD_LENGTH ? prev + letter : prev
        );
    };

    const removeLetter = () => {
        setCurrentGuess((prev) => prev.slice(0, -1));
    };

    const submitGuess = () => {
        if (turn >= MAX_TURNS || isCorrect) return;

        if (currentGuess.length !== WORD_LENGTH) return;

        const formattedGuess = checkGuess(currentGuess, answer);

        setGuesses((prevGuesses) => {
            const newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setUsedKeys((prevUsedKeys) => {
            const newKeys = { ...prevUsedKeys };
            formattedGuess.forEach(({ letter, status }) => {
                const current = newKeys[letter];
                if (status === 'correct') {
                    newKeys[letter] = 'correct';
                } else if (status === 'present' && current !== 'correct') {
                    newKeys[letter] = 'present';
                } else if (status === 'absent' && !current) {
                    newKeys[letter] = 'absent';
                }
            });
            return newKeys;
        });

        if (currentGuess === answer) {
            setIsCorrect(true);
        }

        setTurn((prevTurn) => prevTurn + 1);
        setCurrentGuess('');
    };

    const handleKeyup = (key) => {
        if (key === 'Enter') {
            submitGuess();
            return;
        }

        if (key === 'Backspace') {
            removeLetter();
            return;
        }

        if (/^[a-zA-Z]$/.test(key)) {
            addLetter(key.toLowerCase());
        }
    };

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
}