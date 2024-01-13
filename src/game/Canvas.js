import React, { useEffect } from "react";

const Canvas = props => {
  const canvasRef = props.forwardedRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 2000;
    canvas.height = 2000;
  }, []);

  return <canvas className="game" ref={canvasRef} {...props}/>;
}
export default Canvas;
