'use strict'

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) continue
            board[i][j].minesAroundCount = countMinesNegs({ i, j }, board)
        }
    }
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

function placeRndMines(board, numMines, excludePos) {
    var count = 0

    while (count < numMines) {
        var randI = getRandomIntInclusive(0, board.length - 1)
        var randJ = getRandomIntInclusive(0, board[0].length - 1)

        if (randI === excludePos.i && randJ === excludePos.j) continue
        if (board[randI][randJ].isMine) continue

        board[randI][randJ].isMine = true
        count++
    }
}