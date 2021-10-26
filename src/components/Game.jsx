
import { useState } from 'react';
import Board from './Board';
import { newGame, move } from '../libs/GameState';
import { useKeyDown } from '../libs/CustomHooks';

const Game = () => {

    const [gameState, setGameState] = useState(newGame());
    
    const handleNewBoard = () => {
        setGameState(newGame())
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
               
                <div className='board-header'>
                    <button onClick={handleNewBoard}> New Game </button>
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