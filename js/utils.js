'use strict'

function renderBoard(board) {
    var strHTML = '<table><tbody>'

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'

        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const cellClassName = `cell cell-${i}-${j}`

            var cellContent = ''

            if (cell.isMarked) cellContent = FLAG

            if (cell.isRevealed) {
                if (cell.isMine) cellContent = MINE
                else if (cell.minesAroundCount > 0) cellContent = cell.minesAroundCount
                else cellContent = '' // 0 נשאר ריק
            }


            strHTML += `<td class="${cellClassName}" onclick="onCellClicked(this, ${i},${j})">${cellContent}</td>`
        }

        strHTML += '</tr>'
    }

    strHTML += '</tbody></table>'
    document.querySelector('.board-container').innerHTML = strHTML
}

function countMinesNegs(pos, board) {
    var count = 0

    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === pos.i && j === pos.j) continue

            if (board[i][j].isMine) count++
        }
    }
    return count
}



function removeMenuRightClick() {
  const elContainer = document.querySelector('.board-container')
  elContainer.addEventListener('contextmenu', function (event) {
    if (event.target.classList.contains('cell')) event.preventDefault()
  })
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
