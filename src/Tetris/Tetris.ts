export type gridType = number[][];

export enum pieceState {
  EMPTY = 0,
  FILLED,
  DELETE,
}

export const pieces = [
  //names:  https://tetris.fandom.com/wiki/Tetromino
  //pivots: https://tetris.fandom.com/wiki/SRS?file=SRS-pieces.png
  [ //L
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [ //J
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [ //L
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [ //O
    [1, 1],
    [1, 1]
  ],
  [ //S
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [ //Z
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [ //T
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]
];

export class Tetris {
  static row = 15;
  static col = 10;

  level: number;
  points: number;
  grid: gridType;
  currentPiece: number[][];
  currentPieceCoord: { x: number, y: number; };

  constructor() {
    this.level = 0;
    this.points = 0;
    this.grid = [];
    this.currentPiece = this.getRandomPiece();
    this.currentPieceCoord = { x: 5, y: 0 };

    //init board to 0's
    for (let i = 0; i < Tetris.row; i++) {
      this.grid.push([]);
      for (let j = 0; j < Tetris.col; j++) {
        this.grid[i].push(0);
      }
    }

    this.drawPiece();
  }

  static getNormalizedIndex = (row: number, col: number) => (Tetris.col * col) + row;
  set = (x: number, y: number) => this.grid[x][y] = 1;
  clear = (x: number, y: number) => this.grid[x][y] = 0;


  //gravity
  nextFrame = () => {
    this.clearCurrent();
    if (this.checkGravity()) {
      this.currentPieceCoord.y++;
      this.drawPiece();
      return;
    } else {
      this.drawPiece(); //redraw since we cleared it
      this.getRandomPiece();
    }
  };

  moveLeft = () => {
    this.clearCurrent();
    this.currentPieceCoord.x--;
    if (this.currentPieceCoord.x < 0) this.currentPieceCoord.x = 0;
    this.drawPiece();
  };

  moveRight = () => {
    this.clearCurrent();
    this.currentPieceCoord.x++;
    if (this.currentPieceCoord.x >= Tetris.col) this.currentPieceCoord.x = Tetris.col - 1;
    this.drawPiece();
  };

  rotate = () => {
    console.log("im fucking here bruh");
    this.clearCurrent();
    //check if we can rotate first
    let temp = this.currentPiece;
    console.log("pre", temp);
    temp = this.transpose(temp);
    console.log("after", temp);

    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece.length; j++) {
        if (temp[i][j] === 1) {
          let newx = this.currentPieceCoord.x + i;
          let newy = this.currentPieceCoord.y + j;
          if (newx >= Tetris.col ||
            newy >= Tetris.row ||
            this.grid[newx][newy] === 1) {
            this.drawPiece();
            return;
          }
        }
      }
    }

    this.currentPiece = temp;
    this.drawPiece();
  };

  transpose = (a: number[][]) => {
    var n = a.length;
    for (var i = 0; i < n / 2; i++) {
      for (var j = i; j < n - i - 1; j++) {
        var tmp = a[i][j];
        a[i][j] = a[n - j - 1][i];
        a[n - j - 1][i] = a[n - i - 1][n - j - 1];
        a[n - i - 1][n - j - 1] = a[j][n - i - 1];
        a[j][n - i - 1] = tmp;
      }
    }
    return a;
  };

  checkCollision = () => {

  };

  checkGravity = () => {
    let newPieceCoord = { x: this.currentPieceCoord.x, y: this.currentPieceCoord.y + 1 };
    let startx = Math.floor(this.currentPiece.length / 2);

    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece.length; j++) {
        if (this.currentPiece[i][j] === 1) {
          if (newPieceCoord.y + i >= Tetris.row) return false;
          if (this.grid[newPieceCoord.x - startx + j][newPieceCoord.y + i] === 1) return false;
        }
      }
    }

    return true;
  };

  getRandomPiece = () => {
    this.currentPieceCoord = { x: 0, y: 0 };
    return pieces[Math.floor(Math.random() * pieces.length)];
  };

  drawPiece = () => {
    let startx = Math.floor(this.currentPiece.length / 2);

    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece.length; j++) {
        if (this.currentPiece[i][j] === 1)
          this.set(this.currentPieceCoord.x - startx + j, this.currentPieceCoord.y + i);
      }
    }
  };

  clearCurrent = () => {
    let startx = Math.floor(this.currentPiece.length / 2);

    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece.length; j++) {
        if (this.currentPiece[i][j] === 1)
          this.clear(this.currentPieceCoord.x - startx + j, this.currentPieceCoord.y + i);
      }
    }
  };

}