import React, { useState } from 'react';

function Digit() {
    const gridSize = 8;
    const [grid, setGrid] = useState(Array(gridSize * gridSize).fill(0));
    const [color, setColor] = useState('');
    const [predictedGrid, setPredictedGrid] = useState(null);

    const numbers = {
        0 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        1 : [0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 16, 0, 0, 0, 0, 0, 16, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 0],
        2 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0],
        3 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 16, 16, 16, 0, 0, 0],
        4 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 16, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        5 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0],
        6 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 0, 16, 16, 16, 0, 0],
        7 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        8 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 0, 16, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0],
        9 : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0],
    }

    const convertedNumbers = Object.keys(numbers).reduce((acc, key) => {
        const flatArray = numbers[key];
        const grid = [];
        for (let i = 0; i < flatArray.length; i += 8) {
            grid.push(flatArray.slice(i, i + 8)); 
        }
        acc[key] = grid; 
        return acc;
    }, {});

    const resetGrid = () => {
        const newGrid = [...grid];
        newGrid.fill(0);
        setGrid(newGrid);
    }

    const handleCellClick = (index) => {
        const newGrid = [...grid];
        newGrid[index] = newGrid[index] === 0 ? 16 : 0;
        setGrid(newGrid);
    };

    const handleColorChange = (event) => {
        const colorButton = document.getElementById("color-button");
        setColor(event.target.value);
        colorButton.style.backgroundColor = color;
    }

    const resetColor = () => {
        const colorButton = document.getElementById("color-button");
        setColor("#1a1a1a");
        colorButton.style.backgroundColor = color;
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/predict', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ grid }), 
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Response from API:', data);
            const predictedDigit = data.prediction;
            setPredictedGrid(convertedNumbers[predictedDigit]);
        } catch (error) {
            console.error('Error sending digit:', error);
        }
    };

    return (
        <div>
            <div
                className="pixel-field"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: '320px',
                    height: '320px',
                }}
            >
                {grid.map((value, index) => (
                    <div
                        key={index}
                        className="cell"
                        style={{
                            backgroundColor: value ? color : 'white',
                            border: '1px solid #ccc',
                            width: '100%',
                            height: '100%',
                            cursor: 'crosshair',
                        }}
                        onClick={() => handleCellClick(index)}
                    />
                ))}
            </div>
            <button onClick={handleSubmit} style={{marginLeft:'-50px', marginTop: '10px', marginRight: '4px', }}>Predict</button>
            <button onClick={resetGrid}>Reset</button>
            <button className='color-button' id='color-button' onDoubleClick={resetColor}>
                <input onChange={handleColorChange}
                        type='color' />
            </button>
            <div
                className="response-field"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: '320px',
                    height: '320px',
                    marginTop: '20px',
                }}
            >
                {predictedGrid &&
                    predictedGrid.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: cell > 0 ? color : 'white', 
                                }}
                            />
                        ))
                    ))}
            </div>
        </div>
    );
}

export default Digit;