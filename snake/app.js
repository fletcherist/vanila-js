class Main {

}

class Game  extends Main{
  constructor () {
    super()
    this._directions = ['top', 'bottom', 'right', 'left']
    this.directions = {
      top: 'Top',
      bottom: 'Bottom',
      right: 'Right',
      left: 'Left'
    }
    this.config = {
      size: [5, 5],
      snake: {
        start: [0, 4],
        end: [0, 0]
      },
      direction: ''
    }
    this.setInitialDirection()

    console.log(this)
  }

  setInitialDirection () {
    this.config.direction = 
      this.directions[
        this._directions[Math.floor(Math.random() * 4)]
      ]
  }
}

class Area extends Game {
  constructor () {
    super()
    // console.log(this)
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

  printArea () {
    for (let i = 0; i < this.area.length; i++) {
      // console.log(this.area[i])
    }
  }

  get () {
    return this.area
  }

  placeSnake () {
    let middleX = Math.floor(this.area[0].length / 2)
    let middleY = Math.floor(this.area.length / 2)

    this.area[middleY][middleX] = 1
    this.config.snake.start[0] = middleX
    this.config.snake.start[1] = middleY


  }

  renderSnake () {
    const { snake } = this.config
    const { start, end } = snake

    this.area[0][0] = 1
    for (let i = start[0]; i < start[1]; i++) {

    }
    for (let i = end[0]; i <= end[1]; i++) {
  
      this.area[0][1] = 1
      this.area[0][2] = 1
    }
    this.printArea()
    // console.log(start, end)
  }
}

class Renderer {
  constructor () {
    this.brick = {
      width: '80px',
      height: '80px',
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
    snake.style.backgroundColor = 'red'

    return snake
  }

  renderEmpty () {
    const empty = document.createElement('div')
    empty.style.width = this.brick.width
    empty.style.height = this.brick.height
    empty.style.backgroundColor = 'blue'

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
    for (let i = 0; i < area.length; i++) {
      const row = area[i]
      container.appendChild(this.renderRow(row))
    }

    // child.innerText = 'asd'
    document
      .querySelector('#game')
      .appendChild(container)
  }
}

const game = new Game()
const area = new Area()
const renderer = new Renderer()


area.placeSnake()
renderer.render(area.get())

area.renderSnake()