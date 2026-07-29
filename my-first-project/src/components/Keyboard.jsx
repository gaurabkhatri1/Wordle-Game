const KEY_ROWS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

export default function Keyboard({ usedKeys, onKeyPress }) {
    return (
        <div className="keyboard">
            {KEY_ROWS.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((key) => {
                        const status = usedKeys[key];

                        const isAction = key === 'Enter' || key === 'Backspace';
                        const className = [
                            'key',
                            status || '',
                            isAction ? 'wide' : '',
                        ]
                            .join(' ')
                            .trim();

                        return (
                            <button
                                key={key}
                                className={className}
                                onClick={() => onKeyPress(key)}
                            >
                                {key === 'Backspace' ? '⌫' : key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}