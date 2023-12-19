const GameOver = ({ winner, draw, restart }) => {
  return (
    <div id="game-over">
      <h2> Game Over!</h2>
      {winner && <p>{winner} Won!</p>}
      {draw && <p>Draw!</p>}
      <p>
        <button onClick={restart}>Restart</button>
      </p>
    </div>
  );
};

export default GameOver;
