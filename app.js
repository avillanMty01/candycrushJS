document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 8
  const squares = []
  let score = 0
  const scoreDisplay = document.getElementById('scoreTag')
  const candyColors = [
    'url(alt-images/alt-red.png)',
    'url(alt-images/alt-yellow.png)',
    'url(alt-images/alt-orange.png)',
    'url(alt-images/alt-purple.png)',
    'url(alt-images/alt-green.png)',
    'url(alt-images/alt-blue.png)'
  ]
  /*
  const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
  ]
  */
  // Create Board
  function createBoard () {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true) // drag square
      square.setAttribute('id', i) // set id for each square
      let randomColor = Math.floor(Math.random() * candyColors.length)
      square.style.backgroundImage = candyColors[randomColor]
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
    colorBeingDragged = this.style.backgroundImage
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
    colorBeingReplaced = this.style.backgroundImage // we have the color to be replaced
    squareIdBeingReplaced = parseInt(this.id) // id to replace
    this.style.backgroundImage = colorBeingDragged // change the color
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
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
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
  }

  // Checking for matches

  // --- Row of five
  function checkRowForFive () {
    for (let i = 0; i < 61; i++) {
      let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
      let decideColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
      if (notValid.includes(i)) continue // avoids blank squares at edge of grid
      if (rowOfFive.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 5
        scoreDisplay.innerHTML = score
        rowOfFive.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  // --- Column of five
  function checkColumnForFive () {
    for (let i = 0; i < 32; i++) { // originally Ania had i<47, but it didn't work dor the last column at botom
      let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
      let decideColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      if (columnOfFive.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 5
        scoreDisplay.innerHTML = score
        columnOfFive.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  // --- Row of four
  function checkRowForFour () {
    for (let i = 0; i < 61; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3]
      let decideColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue // avoids blank squares at edge of grid
      if (rowOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  // --- Column of four
  function checkColumnForFour () {
    for (let i = 0; i < 40; i++) { // originally Ania had i<47, but it didn't work dor the last column at botom
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      let decideColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      if (columnOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  // --- Row of three
  function checkRowForThree () {
    for (let i = 0; i < 62; i++) {
      let rowOfThree = [i, i + 1, i + 2]
      let decideColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue // avoids blank squares at edge of grid
      if (rowOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  // --- Column of three
  function checkColumnForThree () {
    for (let i = 0; i < 48; i++) { // originally Ania had i<47, but it didn't work dor the last column at botom
      let columnOfThree = [i, i + width, i + width * 2]
      let decideColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      if (columnOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  function moveDown () {
    for (let i = 0; i < 56; i++) { // 56 or 63
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
        squares[i].style.backgroundImage = ''
      }
      // fill blank squares
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && (squares[i].style.backgroundImage === '')) {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        squares[i].style.backgroundImage = candyColors[randomColor]
      }
    }
  }
  // every 100 miliseconds check if theres a row match of three
  window.setInterval(function () {
    moveDown()
    checkRowForFive()
    checkColumnForFive()
    checkColumnForFour()
    checkRowForFour()
    checkRowForThree()
    checkColumnForThree()
  }, 100)
  // END END END
})
