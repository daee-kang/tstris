export type gridType = number[][]

export enum pieceState {
  EMPTY = 0,
  FILLED,
  DELETE,
}

export class Tetris {
  static row = 15
  static col = 10

  level: number
  points: number
  grid: gridType
  currentPiece: { x: number, y: number }

  constructor() {
    this.level = 0
    this.points = 0
    this.grid = []
    this.currentPiece = { x: 5, y: 0 }

    //init board to 0's
    for (let i = 0; i < Tetris.row; i++) {
      this.grid.push([])
      for (let j = 0; j < Tetris.col; j++) {
        this.grid[i].push(0)
      }
    }

    this.grid[this.currentPiece.x][this.currentPiece.y] = 1
  }

  static getNormalizedIndex = (row: number, col: number) => (Tetris.col * col) + row
  clearCurrent = () => this.grid[this.currentPiece.x][this.currentPiece.y] = 0
  setCurrent = () => this.grid[this.currentPiece.x][this.currentPiece.y] = 1
  set = (x: number, y: number) => this.grid[x][y] = 1

  //gravity
  nextFrame = () => {
    this.clearCurrent()
    this.currentPiece.y++;
    if (this.currentPiece.y >= Tetris.row || this.checkCollision()) {
      this.set(this.currentPiece.x, this.currentPiece.y - 1);
      this.currentPiece.y = 0;
      return;
    }
    this.setCurrent()
  }

  moveLeft = () => {
    this.clearCurrent()
    this.currentPiece.x--;
    if (this.currentPiece.x < 0) this.currentPiece.x = 0;
    this.setCurrent()
  }
  moveRight = () => {
    this.clearCurrent()
    this.currentPiece.x++;
    if (this.currentPiece.x >= Tetris.col) this.currentPiece.x = Tetris.col - 1;
    this.setCurrent()
  }

  checkCollision = () => {
    let x = this.currentPiece.x
    let y = this.currentPiece.y

    return this.grid[x][y] == 1
  }
}