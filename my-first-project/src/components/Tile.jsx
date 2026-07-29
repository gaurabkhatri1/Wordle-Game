export default function Tile({ letter, status }) {
    const className = `tile ${status ? status : ''}`.trim();

    return <div className={className}>{letter}</div>;
}