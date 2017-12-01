const app = {
  snakeHead: [],
  snakeTail: [],
  directions: Object.freeze({
    left: 'left',
    right: 'right',
    up: 'up',
    down: 'down'
  }),
  gameStatus: null,
  GAME_MATRIX_SIZE: 0,
  GAME_STATUSES: Object.freeze({
    STARTED: 'STARTED'
    OVER: 'OVER'
  })
}

app.currentDirection = app.directions.right

class Stack {
  constructor() {
    this.stack = []
  }

  push(value) {
    this.stack.push(value)
  }

  pop() {
    const oldStack = this.stack
    this.stack = []
    for (let i = 1; i < oldStack.length; i++) {
      this.stack.push(oldStack[i])
    }
    return oldStack[0]
  }
}

app.createGameMatrix = (size = 20) => {
  let matrix = []
  for (let i = 0; i < size; i++) {
    matrix.push([])
  }
  for (let i = 0; i < size; i++) {
    for (let e = 0; e < size; e++) {
      matrix[i][e] = 0
    }
  }

  app.GAME_MATRIX_SIZE = size
  return matrix
}

app.startGame = () => app.gameStatus = app.GAME_STATUSES.STARTED
app.endGame = () => app.gameStatus = app.GAME_STATUSES.OVER
app.isGameOvered = () => app.gameStatus === app.GAME_STATUSES.OVER

app.placeSnake = (y, x) => {
  app.snakeHead = [y, x]
  app.snakeTail = new Stack()
  app.snakeTail.push([y, x])
  app.gameMatrix[y][x] = 1
}

app.getRandomMatrixSize = () => Math.floor(Math.random() * app.GAME_MATRIX_SIZE)
app.pickRandomPlace = () => [
  app.getRandomMatrixSize(),
  app.getRandomMatrixSize()
]

app.placeApple = (y, x) => {
  app.gameMatrix[y][x] = 2
}

app.placeRandomApple = () => app.placeApple(...app.pickRandomPlace())

app.moveSnake = (direction) => {
  let dx = 0, dy = 0
  switch (direction) {
    case app.directions.left: dx--; break
    case app.directions.right: dx++; break
    case app.directions.up: dy--; break
    case app.directions.down: dy++; break
    default: throw new Error('Invalid direction')
  }

  app.snakeHead[0] = app.snakeHead[0] + dy
  app.snakeHead[1] = app.snakeHead[1] + dx

  app.snakeTail.push([app.snakeHead[0], app.snakeHead[1]])

  const headPositionAfterMove = app.gameMatrix[app.snakeHead[0]][app.snakeHead[1]]
  if (headPositionAfterMove === 1) {
    alert('you died. game over')
  }
  // apple is not here
  if (headPositionAfterMove !== 2) {
    let tail = app.snakeTail.pop()
    app.gameMatrix[tail[0]][tail[1]] = 0
  } else {
    // apple eaten. generate new apple
    app.placeRandomApple()
  }
  app.gameMatrix[app.snakeHead[0]][app.snakeHead[1]] = 1
  app.currentDirection = direction
}

class Renderer {
  constructor () {
    
    this.brick = {
      width: '30px',
      height: '30px',
      color: 'grey',
      border: '1px solid black'
    }

    this.renderSnake()
    this.renderEmpty()
    this.renderApple()
  }

  renderSnake () {
    const snake = document.createElement('div')
    snake.style.width = this.brick.width
    snake.style.height = this.brick.height
    snake.style.backgroundColor = '#d04000'

    return snake
  }

  renderEmpty () {
    const empty = document.createElement('div')
    empty.style.width = this.brick.width
    empty.style.height = this.brick.height
    empty.style.backgroundColor = 'rgba(255, 255, 255, 0)'
    // empty.style.border = '1px solid rgba(0, 0, 0, .1)'
  
    return empty
  }
  
  renderApple () {
    const apple = document.createElement('div')
    apple.style.width = this.brick.width
    apple.style.height = this.brick.height
    apple.style.backgroundColor = 'green'

    return apple
  }

  renderRow (_row) {
    let row = document.createElement('div')
    row.style.display = 'flex'

    for (let i = 0; i < _row.length; i++) {
      let elem
      switch (_row[i]) {
        case 0: elem = this.renderEmpty(); break
        case 1: elem = this.renderSnake(); break
        case 2: elem = this.renderApple(); break
      }
      row.appendChild(elem)  
    }

    return row
  }

  render (area) {
    const container = document.createElement('div')
    const DOM = document.querySelector('#game')
    DOM.innerHTML = ''
    for (let i = 0; i < area.length; i++) {
      const row = area[i]
      container.appendChild(this.renderRow(row))
    }

    DOM.appendChild(container)
  }
}

class Controllers {
  constructor () {
    this.keyUp = 38
    this.keyDown = 40
    this.keyLeft = 37
    this.keyRight = 39

    this.keyW = 87
    this.keyS = 83
    this.keyA = 65
    this.keyD = 68
    this.renderer = new Renderer()
  }

  listen () {
    window.addEventListener('keydown', event => {
      const direction = app.currentDirection
      switch (event.keyCode) {
        case this.keyUp:
        case this.keyW:
          if (direction === app.directions.down) return
          app.currentDirection = app.directions.up
        break;
        case this.keyDown:
        case this.keyS:
          if (direction === app.directions.up) return
          app.currentDirection = app.directions.down
        break;
        case this.keyLeft:
        case this.keyA:
          if (direction === app.directions.right) return
          app.currentDirection = app.directions.left
        break;
        case this.keyRight:
        case this.keyD:
          if (direction === app.directions.left) return
          app.currentDirection = app.directions.right
        break;
      }
      this.renderer.render(app.gameMatrix)
    })
  }
}

const controller = new Controllers()
const renderer = new Renderer()
controller.listen()

app.gameMatrix = app.createGameMatrix()
app.placeSnake(0, 0)
app.placeRandomApple()

renderer.render(app.gameMatrix)
setInterval(() => {
  app.moveSnake(app.currentDirection)
  renderer.render(app.gameMatrix)
}, 150)
