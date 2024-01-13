import { DIM } from "./utils/constants";
import { expand, flatten, mapCellToTriangle } from "./utils/helpers";

// world should be a 3D array of enums
export const world = new Uint32Array(DIM.TOTAL_SIZE);
for (let i = 0; i < DIM.TOTAL_SIZE; i++) {
  world[i] = Math.floor(Math.random() * 0xFFFFFFFF);
}

const triangles = new Array(( DIM.COLS * 2 + 1 ) * ( DIM.ROWS + 2 * DIM.LAYS ));
for (let i = 0; i < triangles.length; i++) {
  triangles[i] = new Array();
}

// precompute triangles, who knew it was this easy
for (let z = 0; z < DIM.LAYS; z++) {
  for (let y = 0; y < DIM.ROWS; y++) {
    for (let x = 0; x < DIM.COLS; x++) {
      const cellTriangles = mapCellToTriangle(x, y, z);
      const flattened = flatten(x,y,z);
      triangles[cellTriangles[0]].push({cell : flattened, triNum : 0});
      triangles[cellTriangles[1]].push({cell : flattened, triNum : 1});
      triangles[cellTriangles[2]].push({cell : flattened, triNum : 2});
      triangles[cellTriangles[3]].push({cell : flattened, triNum : 3});
      triangles[cellTriangles[4]].push({cell : flattened, triNum : 4});
      triangles[cellTriangles[5]].push({cell : flattened, triNum : 5});
    }
  }
}

console.log(triangles)
export { triangles };
