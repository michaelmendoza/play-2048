
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
export const test4 = [4,4,0,0,2,8,0,0,2,8,4,2,4,16,4,2];
export const test5 = [0,2,8,2,2,4,16,2,2,4,16,2,2,4,8,4];

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
    newBoard[idx] = getCellStartingValue();
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

/** Gets starting cell value - randomly selected between 2 and 4 */
const getCellStartingValue = () => Math.random() > 0.8 ? 4 : 2;

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
const combineToRight = (row) => {
    const combineRow = [] 
    // From right to left, for possible merges
    for (let k = row.length - 1; k >= 0; k--) {
        // Check if two adjcent can be merged
        if (row[k] === row[k-1]) {
            const combine = row[k] + row[k-1];
            combineRow.unshift(combine);
            k--;
        }
        else {
            combineRow.unshift(row[k])
        }            
    }
    return combineRow;
}