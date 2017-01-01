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
      size: [12, 12],
      snake: {
        start: [3, 3],
        end: [3, 3]
      },
      direction: this.directions.up
    }
    // this.setInitialDirection()
    
  }

  // setInitialDirection () {
  //   this.config.direction = 
  //     this.directions[
  //       this._directions[Math.floor(Math.random() * 4)]
  //     ]
  // }

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
    for (let i = 0; i <= size[0]; i++) {
      this.area[i] = []
      for (let e = 0; e <= size[1]; e++) {
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

    this.area[randomX][randomY] = 2
  }

  ifAppleHere (x, y) {
    const { snake } = this.config
    if (this.area[x][y] === 2) {
      return true
    }

    return false
  }
  
  moveSnake (direction) {
    const { snake } = this.config
    let x, y

    switch(direction) {
      case this.directions.up:
        x = snake.start[0] - 1
        y = snake.start[1]

        this.ifAppleHere(x, y)
        this.area[x][y] = 1

        this.config.snake.start[0]--
        console.log('up')
      break
      case this.directions.down:
        x = snake.start[0] + 1
        y = snake.start[1]

        this.ifAppleHere(x, y)
        this.area[x][y] = 1
        this.config.snake.start[0]++

        console.log('down')
      break;
      case this.directions.left:
        x = snake.start[0]
        y = snake.start[1] - 1

        this.ifAppleHere(x, y)
        this.area[x][y] = 1
        this.config.snake.start[1]--

        console.log('left')
      break
      case this.directions.right:
        x = snake.start[0]
        y = snake.start[1] + 1

        this.ifAppleHere(x, y)
        this.area[x][y] = 1  
        this.config.snake.start[1]++

        console.log('right')
      break
    }
    // Erase end of the snake
    this.area[snake.end[0]][snake.end[1]] = 0
    this.config.snake.end[0] = this.config.snake.start[0]
    this.config.snake.end[1] = this.config.snake.start[1]
  }
  
}

class Renderer {
  constructor () {
    document.querySelector('body').style.backgroundColor = '#210'
    
    this.brick = {
      width: '50px',
      height: '50px',
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

