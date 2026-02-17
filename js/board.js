'use strict'

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
    // board[0][3].isMine = true
    // board[3][2].isMine = true
    console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = '<table><tbody>'

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'

        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const cellClassName = `cell cell-${i}-${j}`
            strHTML += `<td class="${cellClassName}"
                        onclick="onCellClicked(this, ${i}, ${j})"
                        oncontextmenu="onCellMarked(this, ${i}, ${j});">
                        </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    document.querySelector('.board-container').innerHTML = strHTML
}