import React, { useState } from "react";

export default function App() {
  const size = 3;
  const totalBoxes = size * size;
  const [matrix, setMatrix] = useState(Array(totalBoxes).fill("white"));
  const [clickOrder, setClickOrder] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleClick = (index) => {
    if (gameCompleted) {
      resetGame();
      return;
    }

    if (matrix[index] === "white") {
      const newMatrix = [...matrix];
      newMatrix[index] = "green";
      setMatrix(newMatrix);
      setClickOrder([...clickOrder, index]);

      if (index === totalBoxes - 1) {
        triggerSequenceChange();
      }
    }
  };

  const triggerSequenceChange = () => {
    clickOrder.forEach((idx, i) => {
      setTimeout(() => {
        setMatrix((prev) => {
          const newMatrix = [...prev];
          newMatrix[idx] = "orange";
          return newMatrix;
        });
      }, i * 500);
    });

    setTimeout(() => setGameCompleted(true), clickOrder.length * 500);
  };

  const resetGame = () => {
    setMatrix(Array(totalBoxes).fill("white"));
    setClickOrder([]);
    setGameCompleted(false);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gap: "5px",
        }}
      >
        {matrix.map((color, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: color,
              border: "1px solid black",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
