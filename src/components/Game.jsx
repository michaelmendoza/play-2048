
import { useState } from 'react';
import Board from './Board';
import { newGame, move, undoMove } from '../state/GameState.js';
import { useKeyDown } from '../libs/CustomHooks';
import { getHighScore } from '../libs/Storage';

const Game = () => {

    const [gameState, setGameState] = useState(newGame());
    
    const handleNewBoard = () => {
        setGameState(newGame())
    }
    
    const handleDownKey = (event) => {
        event.preventDefault();
        if (event.key === 'u' || event.key === 'U')
            setGameState(undoMove(gameState));
        else
            setGameState(move(gameState, event.key));
    }

    useKeyDown(handleDownKey, gameState);

    return (
        <div>
            <header className='header'> 2048 </header>
            <section className='viewport layout-column-center'> 
                
                <div className='board-header layout-row layout-space-between'>
                    <div className='board-score'> Score: {gameState.score} </div>
                    <div className='board-score'> Best: {getHighScore()} </div>

                    <div>
                        <button className='button-new-game' onClick={handleNewBoard}> New Game </button>
                    </div>
                </div>

                <div className='layout-row-center'>
                    <Board board={gameState.board}></Board>
                </div>

                <div>
                    { gameState.isGameOver ? <div className='game-over-message'> Game Over, Try again </div>: null }
                </div>

                <div>
                    { gameState.isGameWon ? <div className='game-over-message'> Game Won!! </div>: null }
                </div>

                <div className='instructions'>
                    <p>
                        HOW TO PLAY: Use your arrow keys to move the tiles. Press 'U' to undo a move. Tiles with the same number merge into one when they touch. Add them up to reach 2048!
                    </p>
                </div>
                
            </section>
        </div>
    )
    
}

export default Game;