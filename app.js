document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
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
  
  // radnomly select a Tetromino and its first rotation 
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  // draw the first rotation in the first tetromino
  function draw(){
    current.forEach(index=>{
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  function undraw(){
    current.forEach(index=>{
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // make the tetromino move dwon every second
  timerId = setInterval(moveDown, 1000)

  function control(e){
    if(e.keyCode === 37)// left
    {
      moveLeft()
    }
    else if(e.keyCode === 40)// dwon
    {
      moveDown()
    }
    else if(e.keyCode === 39)// right
    {
      moveRight()
    }
    else if(e.keyCode === 38)// up
    {
      rotation()
    }
  }
  document.addEventListener('keyup',control)

  // move down function
  function moveDown(){
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // freeze function

  function freeze(){
    if(current.some(index=> squares[currentPosition + index + width].classList.contains('taken'))){
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // start a new tetromino falling
      random = Math.floor(Math.random()* theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }


  // move the tetromino left, unless is it the edge or there is a blockage
  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index=>(currentPosition + index) % width === 0)
    if (!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition += 1
    }
    draw()
  }

  function moveRight(){
    undraw()
    const isAtLeftEdge = current.some(index=>(currentPosition + index) % width === width - 1)
    if (!isAtLeftEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition += 1
    }
    draw()
  }

  function rotation(){
    undraw()
    currentRotation ++
    if(currentRotation === current.length){
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  // show up next tetromino in the mini grid

  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]






})





