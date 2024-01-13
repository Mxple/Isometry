import { DIM, TSIZE } from "./utils/constants";
import { expand, flatten, isopos, leftShade, mapCellToTriangle, rightShade, topShade, toRGB, toRGBA, triPos } from "./utils/helpers";
import { getMasks, getTriangle } from "./utils/mask";
import { world, triangles } from "./world";

export default class Game {
  constructor() {
    this.canvasRef = null;
    this.mapRef = null;
    this.canvasCtx = null;
    this.mapCtx = null;
    this.selected = [];
    this.color = "rgba(0,0,0,0)";
  }

  init(canvasRef) {
    this.canvasRef = canvasRef;
    this.canvasCtx = canvasRef.current.getContext('2d');
    this.drawAll();
  }

  coordsToTriangle(x, y) {
    // first get row
    let yy = ~~(y / (TSIZE / 4));
    let yLeft = y % (TSIZE / 4);

    // then get column
    let xx = ~~(x / (TSIZE / 2));
    let xLeft = x % (TSIZE / 2);

    // check for overlap into triangle above
    if (xx % 2 === yy % 2) {
      if (xLeft < TSIZE / 2 - 2 * yLeft) yy--;
    } else {
      if (xLeft > 2 * yLeft) yy--;
    }

    return (yy * (DIM.COLS * 2 + 1) + xx);
  }

  // draws the triangle
  drawTriangle(tri) {
    if (tri < 0 || tri >= triangles.length) return;
    const [ xPos, yPos ] = triPos(tri);
    let triangleMask = getTriangle(xPos, yPos, tri % 2);

    // reset this triangle
    this.canvasCtx.fillStyle = "#FFFFFF";
    this.canvasCtx.strokeStyle = "#FFFFFF";
    this.canvasCtx.fill(triangleMask);
    // this.canvasCtx.stroke(triangleMask);

    // let currOpacity = 0;

    const cells = triangles[tri];
    for (let i = cells.length - 1; i >= 0; i--) {
    // for (let i = 0; i < cells.length; i++) {
      const color = world[cells[i].cell];
      if ((color & 0xFF) === 0) continue;  // transparent

      // if (currOpacity >= 1) return;
      // currOpacity += (1 - currOpacity) * ((color & 0xFF) / 0xFF);
      
      if (cells[i].triNum < 2) {
        this.canvasCtx.fillStyle = topShade(color);
        this.canvasCtx.strokeStyle = topShade(color);
      } else if (cells[i].triNum < 4) {
        this.canvasCtx.fillStyle = rightShade(color);
        this.canvasCtx.strokeStyle = rightShade(color);
      } else {
        this.canvasCtx.fillStyle = leftShade(color);
        this.canvasCtx.strokeStyle = leftShade(color);
      }
      this.canvasCtx.fill(triangleMask);
      // this.canvasCtx.stroke(triangleMask);

      return;
    }
  }

  drawAll() {
    // reset canvas for drawing
    this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);

    for (let tri = 0; tri < triangles.length; tri++) {
      this.drawTriangle(tri)
    }
  }

  drawCursor(e) {
    const x = e.clientX, y = e.clientY;
    let tri = this.coordsToTriangle(x, y);
    
    // reset canvas
    this.selected.forEach(tri => this.drawTriangle(tri));
    this.selected.length = 0;

    // find all triangles to highlight
    const thisCell = this.rayCast(tri);
    if (thisCell === null) return;
    this.selected.push(tri);
    switch(triangles[tri][this.closestNonEmpty(tri)].triNum) {
      case 0: // top face left
        if (this.rayCast(tri+1) === thisCell)
          this.selected.push(tri+1);
        break;
      case 1:
        if (this.rayCast(tri-1) === thisCell)
          this.selected.push(tri-1);
        break;
      case 2:
        if (this.rayCast(tri+(DIM.COLS * 2 + 1)) === thisCell)
          this.selected.push(tri+(DIM.COLS * 2 + 1))
        break;
      case 3:
        if (this.rayCast(tri-(DIM.COLS * 2 + 1)) === thisCell)
          this.selected.push(tri-(DIM.COLS * 2 + 1))
        break;
      case 4:
        if (this.rayCast(tri-(DIM.COLS * 2 + 1)) === thisCell)
          this.selected.push(tri-(DIM.COLS * 2 + 1))
        break;
      case 5:
        if (this.rayCast(tri+(DIM.COLS * 2 + 1)) === thisCell)
          this.selected.push(tri+(DIM.COLS * 2 + 1))
        break;
    }

    this.selected.forEach(tri => {
      const [ xPos, yPos ] = triPos(tri);
      const triangleMask = getTriangle(xPos, yPos, tri % 2);

      this.canvasCtx.fillStyle = "#FFFFFFAA";
      this.canvasCtx.fill(triangleMask);  
    });
  }

  // first real cell 
  rayCast(tri) {
    if (tri < 0 || tri >= triangles.length) return null;

    const cells = triangles[tri];
    for (let i = cells.length - 1; i >= 0; i--) {
      if (world[cells[i].cell] === 0) continue;
      return cells[i].cell;
    }
    return null;
  }

  closestNonEmpty(tri) {
    if (tri < 0 || tri >= triangles.length) return null;

    const cells = triangles[tri];
    for (let i = cells.length - 1; i >= 0; i--) {
      if (world[cells[i].cell] === 0) continue;
      return i;
    }
    return null;
  }

  destroy() {
    if (this.selected.length < 1) return;
    let cell = this.rayCast(this.selected[0]);
    world[cell] = 0;  // deletion

    const [ x, y, z ] = expand(cell);
    mapCellToTriangle(x, y, z).forEach(tri => {
      this.drawTriangle(tri);
    });
  }
}
