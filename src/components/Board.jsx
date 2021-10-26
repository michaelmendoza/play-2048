import { winValue } from "../libs/GameState";

const Board = ({board}) => {

    const getClassName = (value) => {
        return `cell cell-${value}`;
    }
    
    return (
        <div className='board'>
            { 
                board.map((cell, index) => <div className={getClassName(cell)} key={index}> {cell ? cell : ''} </div>)
            }
        </div>
    )

}

export default Board;