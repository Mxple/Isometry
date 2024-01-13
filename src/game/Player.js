import React, { useEffect, useState } from "react";

const Player = props => {
  const playerRef = props.forwardedRef;

  useEffect(() => {
    const canvas = playerRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 2000;
    canvas.height = 2000;
  }, []);

  return <canvas className="player" ref={playerRef} {...props}/>;
}
export default Player;
