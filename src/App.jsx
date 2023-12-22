import { useState } from "react";
import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import WinningCombinations from "./winning-combinations";
import GameOver from "./components/GameOver";

const GamePlayers = {
  X: "Player 1",
  "@": "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const gameBoardFunction = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "@";
  }

  return currentPlayer;
};

function App() {
  const [player, setPlayer] = useState(GamePlayers);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = gameBoardFunction(gameTurns);

  let winner;
  for (const combination of WinningCombinations) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      //winner
      winner = player[firstSquareSymbol];
      console.log(winner);
    }
  }

  const draw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndix) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndix }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChanged = (symbol, newName) => {
    setPlayer((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={GamePlayers.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChanged}
          />
          <Player
            initialName={GamePlayers["@"]}
            symbol="@"
            isActive={activePlayer === "@"}
            onChangeName={handlePlayerNameChanged}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} draw={draw} restart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
