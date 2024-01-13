// helper scripts
import { DIM, TSIZE, OFFSETS } from "./constants";

// converts cartesian coords to flattened world coords
export function flatten(col, row, lay) {
	return DIM.LAYER_SIZE * lay + DIM.COLS * row + col;
}

export function expand(flattened) {
	let z = ~~(flattened / DIM.LAYER_SIZE);
	flattened %= DIM.LAYER_SIZE;
	let y = ~~(flattened / DIM.COLS);
	flattened %= DIM.COLS;
	let x = flattened;
	return [x, y, z]
}

// converts x, y, z coords into a position
export function isopos(x, y, z) {
	let xx = OFFSETS.xOffset;
	let yy = OFFSETS.yOffset;
	xx += TSIZE * x;
	yy += TSIZE * y / 4;
	if (y % 2 === 1) xx += TSIZE / 2;
	
	yy -= z * TSIZE / 2;
	yy += (DIM.LAYS - 1) * TSIZE / 2;

	return [xx, yy];
}

// maps a cell to its 6 triangles
export function mapCellToTriangle(x, y, z) {
	// first get top left triangle
	let xx = y % 2 ? x * 2 + 1 : x * 2;			// LOL I CAN FINALLY GO EAT
	let yy = DIM.LAYS * 2 + y - (2 * z) - 2;	// fuck around and find out

	// clockwise
	return [
		(xx + 0) + (yy + 0) * ( DIM.COLS * 2 + 1 ),
		(xx + 1) + (yy + 0) * ( DIM.COLS * 2 + 1 ),
		(xx + 1) + (yy + 1) * ( DIM.COLS * 2 + 1 ),
		(xx + 1) + (yy + 2) * ( DIM.COLS * 2 + 1 ),
		(xx + 0) + (yy + 2) * ( DIM.COLS * 2 + 1 ),
		(xx + 0) + (yy + 1) * ( DIM.COLS * 2 + 1 )
	];
}

export function triPos(tri) {
	let x = tri % ( DIM.COLS * 2 + 1 );
	let y = ~~(tri / ( DIM.COLS * 2 + 1 ));
	let xx = OFFSETS.xOffset;
	let yy = OFFSETS.yOffset;
	xx += x * TSIZE / 2; // this is good no touch
	yy += TSIZE * y / 4;
	// yy += (DIM.LAYS - 1) * TSIZE / 4;

	return [xx, yy];
}


export function toRGB(num) {
	return "#"+num.toString(16).padStart(6, "0");
}

export function toRGBA(num) {
	return "#"+num.toString(16).padStart(8, "0");
}

export function topShade(col) {
	let r = col >> 24 & 0xFF;
	let g = col >> 16 & 0xFF;
	let b = col >> 8 & 0xFF;
	let a = col & 0xFF;
	return "rgba("+[r,g,b,a].join()+")";
}
export function leftShade(col) {
	let r = col >> 24 & 0xFF;
	let g = col >> 16 & 0xFF;
	let b = col >> 8 & 0xFF;
	let a = col & 0xFF;
	r = Math.max(0, r - 32);
	g = Math.max(0, g - 32);
	b = Math.max(0, b - 32);
	return "rgba("+[r,g,b,a].join()+")";
}
export function rightShade(col) {
	let r = col >> 24 & 0xFF;
	let g = col >> 16 & 0xFF;
	let b = col >> 8 & 0xFF;
	let a = col & 0xFF;
	r = Math.max(0, r - 64);
	g = Math.max(0, g - 64);
	b = Math.max(0, b - 64);
	return "rgba("+[r,g,b,a].join()+")";
}
