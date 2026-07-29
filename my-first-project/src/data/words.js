

export const WORDS = [
    'apple',
    'brave',
    'crane',
    'drive',
    'eagle',
    'flame',
    'grape',
    'house',
    'lemon',
    'match',
    'ocean',
    'plant',
    'react',
    'solar',
    'train',
    'water',
    'yield',
    'zebra',
    'bloom',
    'cloud'
];

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex].toUpperCase();
}