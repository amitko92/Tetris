document.addEventListener('DOMContentLoaded', ()=>{

    const grid = document.querySelector('.tetris-grid')
    let squares = Array.from(document.querySelectorAll('.tetris-grid div'))
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const scoreDisplay = document.querySelector('#score')
    const levelDisplay = document.querySelector('#level')
    const startBtn = document.querySelector('#start-button')
    const restartBtn = document.querySelector('#restart-button')
    const width = 10
    displayWidth = 4
    const startGridColor =  '#59ec1f'
    let nextRandom = 0
    let timerId
    let score = 0
    let level = 0
    const displayIndex = 0

    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
      ]

    //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //draw the Tetromino
  function draw() {
    current.forEach(index => {
    squares[currentPosition + index].classList.add('tetromino')
    squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''

    })
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } 
    else if (e.keyCode === 38) {
      rotate()
    } 
    else if (e.keyCode === 39) {
      moveRight()
    } 
    else if (e.keyCode === 40) {
      moveDown()
    }
  }  
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }
  

  //the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  //display the shape in the mini-grid display
  function displayNextShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  

  //freeze function
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //start a new tetromino falling
      level += 1
      levelDisplay.innerHTML = level
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayNextShape()
      addScore()
      gameOver()
    }
  }  

  //move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }

  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  //rotate the tetromino
  function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) { //if the current roation gets to 4, make it go back to 0
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  function restartFunc(){
    let i = 0
    currentPosition = 4
    level = 0
    score = 0
    levelDisplay.innerHTML = level
    scoreDisplay.innerHTML = score

    for(i = 0; i < squares.length - width; i++)
    {
        squares[i].style.backgroundColor = startGridColor;
        squares[i].classList.remove('taken')
        squares[i].classList.remove('tetromino')
    }
  }

  function startOrPauseFunc(){
    if (timerId) {
        clearInterval(timerId)
        timerId = null
      } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayNextShape()
      }
  }

    //add score
    function addScore() {
        let counter = 0
        for (let i = 0; i < 199; i +=width) {
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
          if(row.every(index => squares[index].classList.contains('taken'))) {
            counter += 1
            row.forEach(index => {
              squares[index].classList.remove('taken')
              squares[index].classList.remove('tetromino')
              squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
          }
        }
        if(counter <= 1){
            console.log("the current score is, " + score + ", and add " +  counter*10 + counter*5)
            score += counter*10
        }
        else{
            console.log("the current score is, " + score + ", and add " +  counter*10 + counter*5)
            score += counter*10 + counter*1
        }
        scoreDisplay.innerHTML = score

      }
    
      //game over
      function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          window.alert("Game Over, your score is: " + score)
          clearInterval(timerId)
          restartFunc();
        }
      }

  startBtn.addEventListener('click', ()=>{
    startOrPauseFunc();
  })

  restartBtn.addEventListener('click', ()=>{
    startOrPauseFunc();
    currentRotation = 0
    random = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    restartFunc();
  })

})