'use strict'

function removeMenuRightClick() {
    const elContainer = document.querySelector('.board-container')
    elContainer.addEventListener('contextmenu', function (event) {
        if (event.target.classList.contains('cell')) event.preventDefault()
    })
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

