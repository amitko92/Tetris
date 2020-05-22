document.addEventListener('DOMContentLoaded', ()=>{

    const grid = document.querySelector('.tetris-grid')
    let squares = Array.from(document.querySelectorAll('.tetris-grid grid div'))
    const scoreDisplay = document.querySelector('#score')
    const levelDisplay = document.querySelector('#level')
    const startBtn = document.querySelector('#start-button')
    const restartBtn = document.querySelector('#restart-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    let level = 0



})