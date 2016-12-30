class Main {

}

class Game  extends Main{
  constructor () {
    super()
    this.config = {
      size: [5, 5],
      snake: {
        start: [0, 4],
        end: [0, 0]
      }
    }
    console.log(this)
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
      console.log(this.area[i])
    }
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
    console.log(start, end)
  }
}

class Renderer {
  constructor () {
  }

  render () {
    const child = document.createElement('div')
    child.innerText = 'Hello world'
    document.querySelector('#game').appendChild(child)
  }
}

const game = new Game()
const area = new Area()
const renderer = new Renderer()
renderer.render()

area.renderSnake()