import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import MouseMap from "./MouseMap.js";
import "./game.scss"
import Game from "./Game";

function BlockGame() {
  const canvasRef = useRef(null);

  const game = new Game();
  useEffect(() => {
    game.init(canvasRef);
    game.drawAll();
  }, []);

  const handleMove = (e) => {
    game.drawCursor(e);
  }

  const handleClick = () => {
    game.destroy();
  }

  return (
    <Canvas forwardedRef={canvasRef} onClick={handleClick} onMouseMove={handleMove}/>
  )
}

export default BlockGame;
