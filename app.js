document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 8
  const squares = []
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

  // END END END
})
