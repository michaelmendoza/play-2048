
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
            <section className='viewport'> 
                <div className='layout-row-center'>
                    <button onClick={handleNewBoard}> New </button>
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
            </section>
        </div>
    )
    
}

export default Game;