import React, { useState } from 'react'

const Player = ({initialName, symbol, isActive}) => {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing,setIsEditing] = useState(false)

    const handleEditClick = () =>{
        setIsEditing((isEditing) => !isEditing)
    }

    const handleChange =(e) =>{
        setPlayerName(e.target.value)
    }
  return (
    <>
    <li className={isActive ? 'active' : undefined}>
        
              <span className="player">
                {isEditing === false ?  <span className="player-name">{playerName}</span>: <input type='text' value={playerName} onChange={handleChange}/>}
             
              <span className="player-symbol">{symbol}</span>
              </span>
              <button onClick={handleEditClick}>{isEditing === false ? "Edit": "Save"}</button>
            </li>
    </>
  )
}

export default Player