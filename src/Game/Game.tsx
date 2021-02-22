import { render } from '@testing-library/react'
import React, { ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import { gridType } from '../Tetris/Tetris'
import Board from './Board/Board'

export default function Game(): ReactElement {
  const context = useContext(Context)

  //GAME LOOP
  useEffect(() => {
    //set event handlers
    document.addEventListener("keydown", handleKeyPress, false)
  }, [])

  const handleKeyPress = (ev: KeyboardEvent) => {
    context?.handleInput(ev.code)
  }

  return (<div>
    <Board />
    <button onClick={() => {
      const renderGame = () => context?.nextFrame()
      setInterval(renderGame, 1000)
    }}>start game</button>
  </div>
  )
}
