'use strict'

const MINE = '💣'
const FLAG = '🚩'
var gBoard

const gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

const gLevel = {
    SIZE: 4,
    MINES: 2
}

function onInit() {
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    removeMenuRightClick()

}

function buildBoard() {
    const gameSize = gLevel.SIZE
    const board = []

    for (var i = 0; i < gameSize; i++) {
        board.push([])

        for (var j = 0; j < gameSize; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isRevealed: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    board[0][3].isMine = true
    board[3][2].isMine = true
    console.table(board)
    return board
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) continue
            board[i][j].minesAroundCount = countMinesNegs({ i, j }, board)
        }
    }
}

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (cell.isRevealed || cell.isMarked) return

    cell.isRevealed = true

    var content = ''
    if (cell.isMine) content = MINE
    else if (cell.minesAroundCount > 0) content = cell.minesAroundCount

    elCell.innerText = content
    elCell.classList.add('revealed')
}

