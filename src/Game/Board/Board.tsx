import React, { ReactElement, ReactNode } from 'react'
import { Tetris } from '../../Tetris/Tetris'
import Square from './Square'

export default function Board(): ReactElement {
  const createBoard = () => {
    let out: ReactNode[] = []

    for (let i = 0; i < Tetris.row; i++) {
      let inners: ReactNode[] = []
      for (let j = 0; j < Tetris.col; j++) {
        inners.push(<Square col={i} row={j} />)
      }
      out.push(<div style={{ height: 22 }}>{inners}</div>)
    }

    return out
  }

  return <div>
    {createBoard()}
  </div>
}
