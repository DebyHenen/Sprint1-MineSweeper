'use strict'

const MINE = '💣'
const FLAG = '🚩'
const SMILEYS = ['😁', '😎', '😤']

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

var gFlagsCounter = gLevel.MINES
var gIntervalId

function onInit() {
    stopTimer()

    gGame.isOn = true
    gGame.revealedCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gFlagsCounter = gLevel.MINES

    renderTimer()
    renderFlagsCount()
    renderSmiley(0)

    gBoard = buildBoard()
    placeRndMines(gBoard, gLevel.MINES)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    removeMenuRightClick()
}

function onCellClicked(elCell, i, j) {

    if (!gGame.isOn) return

    const cell = gBoard[i][j]
    if (cell.isRevealed || cell.isMarked) return

    startTimer()

    cell.isRevealed = true

    if (cell.isMine) {
        elCell.innerText = MINE
        elCell.classList.add('mine', 'revealed')
        gGame.isOn = false
        gameOver()
        return
    }

    gGame.revealedCount++
    var content = ''
    if (cell.minesAroundCount > 0) content = cell.minesAroundCount
    elCell.innerText = content

    if (cell.minesAroundCount === 0) expandReveal({ i, j }, gBoard)

    elCell.classList.add('revealed')
    checkGameOver()
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return

    const cell = gBoard[i][j]
    if (cell.isRevealed) return

    cell.isMarked = !cell.isMarked
    gGame.markedCount += cell.isMarked ? 1 : -1
    gFlagsCounter += cell.isMarked ? -1 : 1
    elCell.innerText = cell.isMarked ? FLAG : ''
    elCell.classList.toggle('marked', cell.isMarked)
    renderFlagsCount()
    checkGameOver()
}

function checkGameOver() {
    const totalCells = gLevel.SIZE * gLevel.SIZE
    const nonMineCells = totalCells - gLevel.MINES

    if (gGame.revealedCount === nonMineCells && gGame.markedCount === gLevel.MINES) {
        gGame.isOn = false
        stopTimer()
        renderSmiley(1)
        console.log('you win!')
    }
}

function revealAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (!cell.isMine || cell.isMarked) continue

            const elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.innerText = MINE
            elCell.classList.add('revealed')
        }
    }
}

function expandReveal(pos, board) {

    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === pos.i && j === pos.j) continue

            const neighbor = board[i][j]
            if (neighbor.isMine || neighbor.isMarked || neighbor.isRevealed) continue
            neighbor.isRevealed = true
            gGame.revealedCount++

            const elNeighbor = document.querySelector(`.cell-${i}-${j}`)
            elNeighbor.classList.add('revealed')

            var content = ''
            if (neighbor.minesAroundCount > 0) content = neighbor.minesAroundCount
            elNeighbor.innerText = content
        }
    }
}

function gameOver() {
    console.log('Game Over 💥')
    stopTimer()
    revealAllMines(gBoard)
    renderSmiley(2)
}

function onSetLevel(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    onInit()
}

function startTimer() {
    if (gIntervalId) return
    gIntervalId = setInterval(() => {
        gGame.secsPassed++
        renderTimer()
    }, 1000)
}

function stopTimer() {
    clearInterval(gIntervalId)
    gIntervalId = null
}

function renderFlagsCount() {
    document.querySelector('.flag-count span').innerText = gFlagsCounter
}

function renderTimer() {
    document.querySelector('.timer span').innerText = gGame.secsPassed
}

function renderSmiley(idx) {
    document.querySelector('.smiley span').innerText = SMILEYS[idx]
}