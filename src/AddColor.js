import { useState } from 'react';

export function AddColor() {
    const [color, setColor] = useState('orange');
    const styles = {
        background: color,
    };
    const [colorList, setColorList] = useState([
        "red", "orange", "pink", "green"
    ]);
    return (
        <div>
            <h1>Color Game</h1>
            <input
                style={styles}
                onChange={(event) => setColor(event.target.value)}
                placeholder="Enter a color"
                value={color} />
            <button onClick={() => setColorList([...colorList, color])}>
                Add Color
            </button>
            {colorList.map((clr) => (
                <ColorBox color={clr} />
            ))}
        </div>
    );
}
function ColorBox({ color }) {
    const styles = {
        width: "250px",
        height: "30px",
        background: color,
        marginTop: "10px"
    };
    return (
        <div style={styles}></div>
    );
}
