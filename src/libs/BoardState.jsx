
// ***************** Constants  ******************

const boardLength = 16;
const stride = 4;
const Rows = 4;
const Cols = 4;

// ***************** Test boards  *****************

export const test0 = [0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0];
export const test1 = [2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0];
export const test2 = [2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0];
export const test3 = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// ***************** Board State Updates *****************

/** Creates new board */
export const createNewBoard = () => {
    let board = new Array(16).fill(0);

    // Get two random cell to fill. Cell should be unique
    board = addToBoard(board);
    board = addToBoard(board);
    return board;
}

/** Adds number to Board */
export const addToBoard = (board) => {
    const newBoard = [...board];
    let idx = getRandomCellIndex();
    while (board[idx] !== 0) {
        idx = getRandomCellIndex();
    }
    newBoard[idx] = 2;
    return newBoard;
}

/** Game move right */
export const moveRight = (board) => {

    let newBoard = [];
    for (let i = 0; i < Rows; i++) {
        const row = getRow(board, i)
        const filteredRow = row.filter(row => row)

        // Combine Row
        const combineRow = combineToRight(filteredRow);

        const zeros = new Array(Cols - combineRow.length).fill(0);
        const newRow = zeros.concat(combineRow);
        newBoard = newBoard.concat(newRow)
    }

    return newBoard
}

/** Game move left */
export const moveLeft = (board) => {

    let newBoard = [];
    for (let i = 0; i < Rows; i++) {
        const row = getRow(board, i)
        let filteredRow = row.filter(row => row)

        // Combine Row
        const combineRow = combineToRight(filteredRow.reverse()).reverse()

        const zeros = new Array(Cols - combineRow.length).fill(0);
        const newRow = combineRow.concat(zeros);
        newBoard = newBoard.concat(newRow)
    }

    return newBoard
}

/** Game move up */
export const moveUp = (board) => {
    const transposedBoard = getTranspose(board);
    const newBoard = moveLeft(transposedBoard)
    return getTranspose(newBoard);
}

/** Game move down */
export const moveDown = (board) => {
    const transposedBoard = getTranspose(board);
    const newBoard = moveRight(transposedBoard)
    return getTranspose(newBoard);
}

// ***************** Board Helper Functions *****************

/** Gets random cell index */
const getRandomCellIndex = () => Math.floor(Math.random() * boardLength);

/** Retrieves row from board for given index */
const getRow = (board, index) => {
    return board.slice(index * stride, index * stride + 4);
}

/** Transposes board */
const getTranspose = (board) => {
    const newBoard = new Array(16).fill(0);

    for(let r = 0; r < Rows; r++) {
        for(let c = 0; c < Cols; c++) {
            newBoard[r * Cols + c] = board[c * Rows + r];
        }
    }
    return newBoard;
}

/** Combines Rows to right side */
const combineToRight = (filteredRow) => {
    const combineRow = [] 
        for ( let k = filteredRow.length - 1; k >= 0; k--) {
            let combine;
            if(k === 0) {
                combineRow.unshift(filteredRow[0])
                break;
            }

            if(filteredRow[k] === filteredRow[k-1]) {
                combine = filteredRow[k] + filteredRow[k-1];
                combineRow.unshift(combine);
                k--;
            }
            else {
                combineRow.unshift(filteredRow[k])
            }            
        }
    return combineRow;
}