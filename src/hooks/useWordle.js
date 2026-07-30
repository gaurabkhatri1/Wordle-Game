import { useCallback, useState } from 'react'
import { VALID_GUESSES } from '../data/words'
import { checkGuess, updateKeyStatuses } from '../utils/checkGuess'

export const WORD_LENGTH = 5
export const MAX_TURNS = 6

export function useWordle(answer) {
    const [turn, setTurn] = useState(0)
    const [guesses, setGuesses] = useState([])
    const [currentGuess, setCurrentGuess] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})
    const [error, setError] = useState('')

    // Handle a key press from either physical keyboard or on-screen keyboard
    const handleKeyup = useCallback(
        (key) => {
            if (isCorrect || turn >= MAX_TURNS) return

            if (key === 'Enter') {
                // submit
                if (currentGuess.length !== WORD_LENGTH) {
                    setError('Not enough letters')
                    return
                }

                const guessLower = currentGuess.toLowerCase()
                if (typeof VALID_GUESSES !== 'undefined' && !VALID_GUESSES.has(guessLower)) {
                    setError('Not in word list')
                    return
                }

                // evaluate and store (display letters uppercase)
                const evaluated = checkGuess(guessLower, String(answer).toLowerCase()).map((c) => ({
                    letter: c.letter.toUpperCase(),
                    status: c.status,
                }))

                setGuesses((prev) => [...prev, evaluated])
                setUsedKeys((prev) => updateKeyStatuses(prev, evaluated))
                setTurn((t) => t + 1)
                setIsCorrect(guessLower === String(answer).toLowerCase())
                setCurrentGuess('')
                setError('')
            } else if (key === 'Backspace') {
                setCurrentGuess((prev) => {
                    setError('')
                    return prev.slice(0, -1)
                })
            } else if (/^[a-zA-Z]$/.test(key)) {
                setError('')
                setCurrentGuess((prev) => (prev.length < WORD_LENGTH ? prev + key.toUpperCase() : prev))
            }
        },
        [currentGuess, isCorrect, turn, answer]
    )

    // expose a tiny API compatible with the rest of the app
    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        handleKeyup,
        error,
    }
}
