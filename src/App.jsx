
import { useState } from "react";
import Player from "./components/Player.jsx";
import { WINNING_COMBINATIONS } from "./components/Winning-combinations.jsx";
import Log from "./components/Log.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  // const [activePlayer,setActivePlayer] = useState("X")
  const [gameTurns, setGameTurns] = useState([])
  const [hasWinner, setHasWinner] = useState(false)

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array =>[...array])];


  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;

    }
  }

  const hasDraw = gameTurns.length===9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) =>{
    // setActivePlayer((currActivePlayer)=> currActivePlayer === 'X'? 'O': 'X')
    setGameTurns(prevTurns => {
     const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex},player: currentPlayer},
        ...prevTurns];
        return updatedTurns;
    });
  }

  const handleRestart = () =>{
    setGameTurns([]);
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className='highlight-player'>
            <Player initialName = "player 1" symbol = 'X' isActive={activePlayer === 'X'}/>
            <Player initialName = "player 2" symbol = 'O' isActive={activePlayer === 'O'}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} 
        board = {gameBoard}
        />
        </div>
        <Log turns={gameTurns}/>
      </main>
    </>
  );
}

export default App;
