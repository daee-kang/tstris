import React, { createContext, MutableRefObject, useRef } from 'react'
import { gridType, pieceState, Tetris } from './Tetris/Tetris';

type tstrisContextType = {
  game: MutableRefObject<Tetris>,
  getBoard: () => void,
  nextFrame: () => void,
  stateCache: MutableRefObject<React.Dispatch<React.SetStateAction<pieceState>>[]>,
  setStateCache: (row: number, col: number, setPiece: React.Dispatch<React.SetStateAction<pieceState>>) => void,
  handleInput: (input: string) => void
}

const Context = createContext<tstrisContextType | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const game = useRef(new Tetris())

  const getBoard = () => {
    let grid = game.current.grid
    for (let i = 0; i < Tetris.row; i++) {
      for (let j = 0; j < Tetris.col; j++) {
        stateCache.current[Tetris.getNormalizedIndex(j, i)](grid[j][i])
      }
    }
  }

  //temp
  const nextFrame = () => {
    game.current.nextFrame()
    getBoard()
  }

  const stateCache = useRef<React.Dispatch<React.SetStateAction<pieceState>>[]>([])

  const setStateCache = (row: number, col: number, setPiece: React.Dispatch<React.SetStateAction<pieceState>>) => {
    let index = Tetris.getNormalizedIndex(row, col)
    stateCache.current[index] = setPiece
  }

  const handleInput = (input: string) => {
    switch (input) {
      case "ArrowLeft":
        game.current.moveLeft()
        break;
      case "ArrowUp":
        break;
      case "ArrowRight":
        game.current.moveRight()
        break;
      case "ArrowDown":
        break;
      default:
        break;
    }
    getBoard()
  }

  return (
    <Context.Provider value={{
      game,
      getBoard,
      nextFrame,
      stateCache,
      setStateCache,
      handleInput
    }}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }