import Tile from './Tile';
import { WORD_LENGTH } from '../hooks/useWordle';

export default function Row({ guess, currentGuess }) {
    if (guess) {
        return (
            <div className="row">
                {guess.map((item, index) => (
                    <Tile key={index} letter={item.letter} status={item.status} />
                ))}
            </div>
        );
    }

    if (currentGuess != null) {
        const letters = currentGuess.split('');

        return (
            <div className="row">
                {Array.from({ length: WORD_LENGTH }).map((_, index) => (
                    <Tile key={index} letter={letters[index] || ''} />
                ))}
            </div>
        );
    }

    return (
        <div className="row">
            {Array.from({ length: WORD_LENGTH }).map((_, index) => (
                <Tile key={index} letter="" />
            ))}
        </div>
    );
}