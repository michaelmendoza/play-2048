import { createNewBoard, addToBoard, moveDown, moveLeft, moveRight, moveUp } from "./BoardState";
import { arrayEquals } from "./Utils";

export const winValue = 2048;

/** Create a new GameState */
export const newGame = () => ({ 
    board: createNewBoard(),
    isGameOver: false,
    isGameWon: false
})

/** Game Move - Updates state based on move */
export const move = (state, key) => {
    const newState = {...state};

    // Do Move and get updated board
    const boardMoves = {
        "ArrowLeft"  : moveLeft,
        "ArrowRight" : moveRight,
        "ArrowUp"    : moveUp,
        "ArrowDown"  : moveDown,
    }
    
    // Check if GameMove is available
    if(state.isGameWon || state.isGameOver)
        return state

    // Accept only valid key presses 
    if(!boardMoves.hasOwnProperty(key))
        return state;

    // Generate updated board 
    let newBoard = boardMoves[key]?.(state.board)

    // Update GameState based on Move
    const boardChanged = !arrayEquals(state.board, newBoard);
    if (boardChanged) {
        newBoard = addToBoard(newBoard);
    }
    else {
        newState.isGameOver = checkGameOver(newBoard)
    }
    newState.isGameWon = checkGameWon(newBoard);
    newState.board = newBoard;
    return newState;
}

/** Check for GameOver state */
const checkGameOver = (board) => {

    let isGameOver = true;
    
    let _board = [...board];
    _board = moveRight(_board);
    isGameOver = arrayEquals(board, _board) ? isGameOver : false;

    _board = moveLeft(board);
    isGameOver = arrayEquals(board, _board) ? isGameOver : false;
    
    _board = moveUp(board);
    isGameOver = arrayEquals(board, _board) ? isGameOver : false;

    _board = moveDown(board);
    isGameOver = arrayEquals(board, _board) ? isGameOver : false;

    return isGameOver
}

/** Check for GameWon state */
const checkGameWon = (board) => {
    const won = board.find((cell) => cell >= winValue)
    return won ? true : false;
}