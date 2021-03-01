import React, { ReactElement, useContext, useEffect } from 'react';
import { Context } from '../Context';
import Board from './Board/Board';

export default function Game(): ReactElement {
  const context = useContext(Context);

  //GAME LOO
  useEffect(() => {
    //set event handlers
    document.addEventListener("keydown", handleKeyPress, false);
  }, []);

  const handleKeyPress = (ev: KeyboardEvent) => {
    context?.handleInput(ev.code);
  };

  return (<div>
    <Board />
    <button onClick={() => {
      context?.getBoard();
      const renderGame = () => context?.nextFrame();
      setInterval(renderGame, 1000);
    }}>start game</button>
  </div>
  );
}
