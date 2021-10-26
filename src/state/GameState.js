import { createNewBoard, addToBoard, moveDown, moveLeft, moveRight, moveUp } from "./BoardState.js"
import { getHighScore, setHighScore } from "../libs/Storage";
import { arrayEquals, createFrequencyDictionary } from "../libs/Utils";

export const winValue = 2048;

/** Create a new GameState */
export const newGame = () => ({ 
    board: createNewBoard(),
    history: [],
    score: 0,
    scoreHistory: [0],
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

    // Check if BoardChanged i.e. move is valid move
    const boardChanged = !arrayEquals(state.board, newBoard);
    if (!boardChanged) {
        return state;
    }

    // Update board: Add new tile to board 
    newBoard = addToBoard(newBoard);

    // Check GameOver/GameWon status
    newState.isGameOver = checkGameOver(newBoard)
    newState.isGameWon = checkGameWon(newBoard);

    // Update score and scoreHistory
    const newScore =  state.score + calculateScore(state.board, newBoard);
    newState.score = newScore;
    newState.scoreHistory = [...state.scoreHistory, newScore];
    if(newScore > getHighScore()) setHighScore(newScore);

    // Udpate board and history
    newState.board = newBoard;
    newState.history = [...state.history, state.board]
    return newState;
}

/** Undo last move using move history */
export const undoMove = (state) => {
    if(state.history.length === 0) return state;

    const newState = {...state};
    const lastBoard = newState.history.pop();
    newState.board = lastBoard;

    newState.scoreHistory.pop();
    newState.score = newState.scoreHistory[newState.scoreHistory.length - 1];

    newState.isGameOver = checkGameOver(lastBoard);
    newState.isGameWon = checkGameWon(lastBoard);
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

/** Calculates score for move from board -> newBoard */
const calculateScore = (board, newBoard) => {

    // Get frequency dicts for boards
    const oldDict = createFrequencyDictionary(board);
    const newDict = createFrequencyDictionary(newBoard);
    
    // Create empty mergeCountDict
    const maxLog2 = Math.log2(Math.max(...Object.keys(newDict)));
    const range = [...Array(maxLog2+1).keys()]; 
    range.shift();
    const mergeCountDict = {'0': 0 };
    range.forEach(idx => mergeCountDict[Math.pow(2, idx)] = 0)

    // Get keys for unique tiles and fill missing keys for frequency dicts
    let keys = Object.keys(mergeCountDict);
    keys = keys.map(key => parseInt(key));
    keys = keys.sort((a,b) => a - b)
    keys.forEach(key => { 
        if(!oldDict[key]) oldDict[key] = 0;
        if(!newDict[key]) newDict[key] = 0;
    })

    // Generate a dictionary of mergeCounts for given key
    let score = 0;
    for (let i = keys.length - 1; i > 0; i--) { 
        const key = keys[i];
        const diff = newDict[key] - oldDict[key];
        
        if(!keys[i+1]) { 
            // Case for largest key
            mergeCountDict[key] = diff > 0 ? diff : 0;
        }
        else {
            const key2 = keys[i+1];
            const diff2 = diff + 2 * mergeCountDict[key2];
            mergeCountDict[key] = diff2 > 0 ? diff2 : 0;
        }
    }

    // Calculate score based on mergeCount dictionary
    score = 0;
    keys.forEach(key => {
        score += key * mergeCountDict[key];
    });
    return score;
}