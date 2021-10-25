import { winValue } from "../libs/GameState";

const Board = ({board}) => {

    const getClassName = (value) => {
        return value === winValue ? 'cell win' : 'cell';
    }

    return (
        <div className='board'>
            { 
                board.map((cell, index) => <div className={getClassName(cell)} key={index}> {cell} </div>)
            }
        </div>
    )

}

export default Board;