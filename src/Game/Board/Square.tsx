import React, { ReactElement, useContext, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../../Context'
import { pieceState, Tetris } from '../../Tetris/Tetris'

interface Props {
  row: number,
  col: number
}

const Item = styled.span`
width: 20px;
height: 20px;
background-color: red;
display: inline-block;
margin: 1px;
`

const Filled = styled.span`
width: 20px;
height: 20px;
background-color: blue;
display: inline-block;
margin: 1px;
`

export default function Square({ row, col }: Props): ReactElement {
  const [state, setState] = useState(pieceState.EMPTY)
  const context = useContext(Context)
  context?.setStateCache(row, col, setState)

  return (
    <span>
      { state === pieceState.FILLED ?
        <Filled /> :
        <Item />
      }
    </span>

  )
}
