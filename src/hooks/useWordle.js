import { useCallback, useRef, useState } from 'react'
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
    const currentGuessRef = useRef('')

    const updateCurrentGuess = useCallback((nextGuess) => {
        const normalized = String(nextGuess || '').replace(/[^a-z]/gi, '').toUpperCase()
        currentGuessRef.current = normalized
        setCurrentGuess(normalized)
    }, [])

    // Handle a key press from either physical keyboard or on-screen keyboard
    const handleKeyup = useCallback(
        (key) => {
            if (isCorrect || turn >= MAX_TURNS) return

            const normalizedKey = String(key || '').toLowerCase()

            if (normalizedKey === 'enter') {
                const normalizedGuess = String(currentGuessRef.current).replace(/[^a-z]/gi, '').toLowerCase()
                if (normalizedGuess.length !== WORD_LENGTH) {
                    setError('Not enough letters')
                    return
                }

                if (typeof VALID_GUESSES !== 'undefined' && !VALID_GUESSES.has(normalizedGuess)) {
                    setError('Not in word list')
                    return
                }

                const evaluated = checkGuess(normalizedGuess, String(answer).toLowerCase()).map((c) => ({
                    letter: c.letter.toUpperCase(),
                    status: c.status,
                }))

                setGuesses((prev) => [...prev, evaluated])
                setUsedKeys((prev) => updateKeyStatuses(prev, evaluated))
                setTurn((t) => t + 1)
                setIsCorrect(normalizedGuess === String(answer).toLowerCase())
                updateCurrentGuess('')
                setError('')
            } else if (normalizedKey === 'backspace') {
                const updatedGuess = String(currentGuessRef.current).slice(0, -1)
                updateCurrentGuess(updatedGuess)
                setError('')
            } else if (/^[a-z]$/.test(normalizedKey)) {
                setError('')
                const nextGuess = String(currentGuessRef.current).replace(/[^a-z]/gi, '').toUpperCase()
                const updatedGuess = nextGuess.length < WORD_LENGTH ? nextGuess + normalizedKey.toUpperCase() : nextGuess
                updateCurrentGuess(updatedGuess)
            }
        },
        [answer, isCorrect, turn, updateCurrentGuess]
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
