document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 8
  const squares = []
  let score = 0
  const scoreDisplay = document.getElementById('scoreTag')
  const candyColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
  ]
  // Create Board
  function createBoard () {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true) // drag square
      square.setAttribute('id', i) // set id for each square
      let randomColor = Math.floor(Math.random() * candyColors.length)
      square.style.backgroundColor = candyColors[randomColor]
      grid.appendChild(square)
      squares.push(square) // elements into array of 64 squares
    }
  }
  createBoard()

  // Drag the candies
  let colorBeingDragged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplaced

  // there are 6 events when dragging
  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))
  // we need 6 functions to handle the addEventListener
  function dragStart () {
    squareIdBeingDragged = parseInt(this.id) // store the id and color of the original square
    colorBeingDragged = this.style.backgroundColor
    // console.log(colorBeingDragged)
    // console.log(this.id, 'dragstart')
  }
  function dragOver (e) {
    e.preventDefault() // don't do anything
    // console.log(this.id, 'dragover')
  }
  function dragEnter (e) {
    e.preventDefault() // don't do anything
  // console.log(this.id, 'dragenter')
  }
  function dragLeave () {
    // console.log(this.id, 'dragleave')
  }
  function dragDrop () {
    // console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundColor // we have the color to be replaced
    squareIdBeingReplaced = parseInt(this.id) // id to replace
    this.style.backgroundColor = colorBeingDragged // change the color
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
  }
  function dragEnd () {
    // console.log(this.id, 'dragend')
    // what is a valid move ? we can't just drop anywhere our candy
    let validMoves = [
      squareIdBeingDragged - 1, // left
      squareIdBeingDragged - width, // up
      squareIdBeingDragged + 1, // right
      squareIdBeingDragged + width // down
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)
    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
  }

  // Checking for matches
  // --- Row of four
  function checkRowForFour () {
    for (let i = 0; i < 61; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3]
      let decideColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue // avoids blank squares at edge of grid
      if (rowOfFour.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  // --- Row of three
  function checkRowForThree () {
    for (let i = 0; i < 62; i++) {
      let rowOfThree = [i, i + 1, i + 2]
      let decideColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue // avoids blank squares at edge of grid
      if (rowOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  // --- Column of four
  function checkColumnForFour () {
    for (let i = 0; i < 40; i++) { // originally Ania had i<47, but it didn't work dor the last column at botom
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      let decideColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      if (columnOfFour.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  // --- Column of three
  function checkColumnForThree () {
    for (let i = 0; i < 48; i++) { // originally Ania had i<47, but it didn't work dor the last column at botom
      let columnOfThree = [i, i + width, i + width * 2]
      let decideColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      if (columnOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  function moveDown () {
    for (let i = 0; i < 55; i++) { // 56 or 63
      if (squares[i + width].style.backgroundColor === '') {
        squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
        squares[i].style.backgroundColor = ''
      }
      // fill blank squares
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && (squares[i].style.backgroundColor === '')) {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        squares[i].style.backgroundColor = candyColors[randomColor]
      }
    }
  }
  // every 100 miliseconds check if theres a row match of three
  window.setInterval(function () {
    moveDown()
    checkColumnForFour()
    checkRowForFour()
    checkRowForThree()
    checkColumnForThree()
  }, 100)
  // END END END
})
