import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const handleChangeName = (event) => {
    setPlayerName(event.target.value);
  };

  let name = <span className="player-name">{playerName}</span>;
  let buttonLabel = "Edit";

  if (isEditing) {
    name = (
      <input
        type="text"
        value={playerName}
        onChange={handleChangeName}
        required
      />
    );
    buttonLabel = "Save";
  }
  return (
    <li className={`${isActive ? "active" : ""}`}>
      <span className="player">
        {name}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{buttonLabel}</button>
    </li>
  );
};

export default Player;
