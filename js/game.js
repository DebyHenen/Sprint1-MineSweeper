'use strict'

const MINE = '💣'
const FLAG = '🚩'
const SMILEYS = ['😎', '😟']

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

    gBoard = buildBoard()
    placeRndMines(gBoard, gLevel.MINES)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    renderFlagsCount()
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
        stopTimer()
        revealAllMines(gBoard)
        gameOver()
        return
    }

    gGame.revealedCount++
    var content = ''
    if (cell.minesAroundCount > 0) content = cell.minesAroundCount
    elCell.innerText = content

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
        console.log('you win!')
    }
}

function revealAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            if (cell.isMine) document.querySelector(`.cell-${i}-${j}`).innerText = MINE
        }
    }
}

function gameOver() {
    console.log('Game Over 💥')
    stopTimer()
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