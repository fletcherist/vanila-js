class Main {

}

class Game extends Main{
  constructor () {
    super()
    this._directions = ['up', 'down', 'right', 'left']
    this.directions = {
      up: 'Up',
      down: 'Down',
      right: 'Right',
      left: 'Left'
    }
    this.config = {
      size: [10, 10],
      snake: {
        start: [1, 1],
        end: [1, 1]
      },
      apple: [0, 0],
      hasAppleEaten: false,
      moves: 0,
      direction: this.directions.up
    }
    // this.setInitialDirection()
    
  }

  nextGameTick () {
    
  }
  changeDirection () {
    
  }
}

class Area extends Game {
  constructor () {
    super()
    this.area = []
    this.createArea = this.createArea.bind(this)
    this.createArea()
  }

  createArea () {
    const { size } = this.config
    for (let i = 0; i < size[0]; i++) {
      this.area[i] = []
      for (let e = 0; e < size[1]; e++) {
        this.area[i][e] = 0
      }
    }
    return this.area
  }

  get () {
    return this.area
  }

  placeSnake () {
    let randomX = this.config.snake.start[0]
    let randomY= this.config.snake.start[1]

    this.area[randomY][randomX] = 1
  }

  placeApple () {
    const randomX = Math.floor(Math.random() * this.config.size[0])
    const randomY = Math.floor(Math.random() * this.config.size[1])

    this.config.apple[0] = randomX
    this.config.apple[1] = randomY
    this.area[randomX][randomY] = 2
  }

  ifAppleHere (x, y) {
    const { snake } = this.config
    if (this.config.apple[0] === x && this.config.apple[1] === y) {
      alert('true')
      return true
    }

    return false
  }
  
  moveSnake (direction) {
    const { snake } = this.config
    let x, y
    let removeEnd = true

    switch(direction) {
      case this.directions.up:
        x = snake.start[0] - 1
        y = snake.start[1]

        this.config.snake.start[0]-- 
      break
      case this.directions.down:
        x = snake.start[0] + 1
        y = snake.start[1]

        this.config.snake.start[0]++ 
      break;
      case this.directions.left:
        x = snake.start[0]
        y = snake.start[1] - 1

        this.config.snake.start[1]--
      break
      case this.directions.right:
        x = snake.start[0]
        y = snake.start[1] + 1

        this.config.snake.start[1]++
      break
    }

    if (this.ifAppleHere(x, y)) {
      // Do not erase the end of the snake
      this.config.hasAppleEaten = true
      // this.area[snake.end[0]][snake.end[1]] = 1 
    } else {
      if (this.config.hasAppleEaten) {

        this.config.hasAppleEaten = false
      } else {
        this.area[snake.end[0]][snake.end[1]] = 0   

        let snakeEnd = this.getSnakeEnd(snake.end[0], snake.end[1])
        console.log(snakeEnd)
        if (snakeEnd) {
          this.config.snake.end[0] = snakeEnd[0]
          this.config.snake.end[1] = snakeEnd[1]
        }
        // alert(this.getSnakeEnd())
        
       // Find the nearest point
      // if (this.area[this.config.snake.end[0] + 1] === 1) {
      //   this.config.snake.end[0] = this.config.snake.end[0] + 1
      // } else if (this.area[this.config.snake.end[0] - 1] === 1) {
      //   this.config.snake.end[0] = this.config.snake.end[0] - 1
      // }

      // if (this.area[this.config.snake.end[1] + 1] === 1) {
      //   this.config.snake.end[1] = this.config.snake.end[1] + 1
      // } else if (this.area[this.config.snake.end[1] - 1] === 1) {
      //   this.config.snake.end[1] = this.config.snake.end[1] - 1
      // }

      }
    }
    // Move the snake
    this.area[x][y] = 1

    // console.log(this.config.snake.start)
    // console.log(this.config.snake.end)
    // console.log('-------')

    // Increment the moves counter
    this.config.moves++
  }

  getSnakeEnd (x, y) {
    const a = this.area
    // if (a[y]) {

    // }
    if (a[y - 1][x - 1] === 1) {
      return [y - 1, x - 1]
    } 
    if (a[y - 1][x] === 1) {
      return [y - 1, x]
    } 
    if (a[y - 1][x + 1] === 1) {
      return [y - 1, x + 1]
    } 
    if (a[y][x - 1] === 1) {
      return [y, x -1]
    }
    if (a[y][x] === 1) {
      return [y, x]
    }
    if (a[y][x + 1] === 1) {
      return [y, x + 1]
    } 
    if (a[y + 1][x - 1] === 1) {
      return [y + 1, x - 1]
    } 
    if (a[y + 1][x] === 1) {
      return [y + 1, x]
    } 
    if (a[y + 1][x + 1] === 1) {
      return [y + 1, x + 1]
    }

    return false
  }
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

class Controllers extends Main {
  constructor () {
    super()
    this.keyUp = 38
    this.keyDown = 40
    this.keyLeft = 37
    this.keyRight = 39

    this.keyW = 87
    this.keyS = 83
    this.keyA = 65
    this.keyD = 68
  }

  listen () {
    window.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case this.keyUp:
        case this.keyW:
          moveSnake('Up')
        break;
        case this.keyDown:
        case this.keyS:
          moveSnake('Down')
        break;
        case this.keyLeft:
        case this.keyA:
          moveSnake('Left')
        break;
        case this.keyRight:
        case this.keyD:
          moveSnake('Right')
        break;
      }
    })
  }
}

const game = new Game()
const area = new Area()
const renderer = new Renderer()
const controller = new Controllers()

controller.listen()
area.placeSnake()
area.placeApple()

renderer.render(area.get())
setInterval(() => {
  renderer.render(area.get())  
}, 200)


function moveSnake (direction) {
  area.moveSnake(direction)
  renderer.render(area.get())  
}

