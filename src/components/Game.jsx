
import { useState } from 'react';
import Board from './Board';
import { newGame, move, undoMove } from '../state/GameState.js';
import { useKeyDown } from '../libs/CustomHooks';
import { getHighScore } from '../libs/Storage';

const DEBUG = false; 

const Game = () => {

    const [gameState, setGameState] = useState(newGame());
    
    const handleNewBoard = () => {
        setGameState(newGame())
    }
    
    const handleUndoMove = () => {
        setGameState(undoMove(gameState));
    }

    const handleDownKey = (event) => {
        event.preventDefault();
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
                        { DEBUG ? <button onClick={handleUndoMove}> Undo </button> : null }
                        <button onClick={handleNewBoard}> New Game </button>
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
                        HOW TO PLAY: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!
                    </p>
                </div>

                { DEBUG ? <ColorPallete/> : null }
                
            </section>
        </div>
    )
    
}

const ColorPallete = () => {
    return (
        <div> 
            <span style={{padding:'1em'}} className='cell-0'> 2 </span>
            <span style={{padding:'1em'}} className='cell-2'> 2 </span>
            <span style={{padding:'1em'}} className='cell-4'> 4 </span>
            <span style={{padding:'1em'}} className='cell-8'> 8 </span>
            <span style={{padding:'1em'}} className='cell-16'> 16 </span>
            <span style={{padding:'1em'}} className='cell-32'> 32 </span>
            <span style={{padding:'1em'}} className='cell-64'> 64 </span>
            <span style={{padding:'1em'}} className='cell-128'> 128 </span>
            <span style={{padding:'1em'}} className='cell-256'> 256 </span>
            <span style={{padding:'1em'}} className='cell-512'> 512 </span>
            <span style={{padding:'1em'}} className='cell-1024'> 1024 </span>
            <span style={{padding:'1em'}} className='cell-2048'> 2048 </span>
        </div>
    )
}

export default Game;