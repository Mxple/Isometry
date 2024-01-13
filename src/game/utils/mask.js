import { TSIZE } from "./constants";

export function getMasks(xPos, yPos) {
	// mask points lmao
	const a0x = xPos + TSIZE / 2;
	const a0y = yPos;
	const b0x = xPos;
	const b0y = yPos + TSIZE / 4;
	const b1x = xPos + TSIZE;
	const b1y = yPos + TSIZE / 4;
	const c0x = xPos + TSIZE / 2;
	const c0y = yPos + TSIZE / 2;
	const d0x = xPos;
	const d0y = yPos + 3 * TSIZE / 4;
	const d1x = xPos + TSIZE; 
	const d1y = yPos + 3 * TSIZE / 4;
	const e0x =	xPos + TSIZE / 2; 
	const e0y = yPos + TSIZE;

	return [
		new Path2D("M "+[a0x,a0y,b0x,b0y,c0x,c0y+1,b1x,b1y].join(" ")),
		new Path2D("M "+[b0x,b0y,c0x,c0y,e0x,e0y,d0x,d0y].join(" ")),
		new Path2D("M "+[b1x,b1y,c0x,c0y,e0x,e0y,d1x,d1y].join(" "))
	];
}

export function getTriangles(xPos, yPos) {
	const a0x = xPos + TSIZE / 2;
	const a0y = yPos;
	const b0x = xPos;
	const b0y = yPos + TSIZE / 4;
	const b1x = xPos + TSIZE;
	const b1y = yPos + TSIZE / 4;
	const c0x = xPos + TSIZE / 2;
	const c0y = yPos + TSIZE / 2;
	const d0x = xPos;
	const d0y = yPos + 3 * TSIZE / 4;
	const d1x = xPos + TSIZE; 
	const d1y = yPos + 3 * TSIZE / 4;
	const e0x =	xPos + TSIZE / 2; 
	const e0y = yPos + TSIZE;

	return [
		new Path2D("M "+[a0x,a0y,b0x,b0y,c0x,c0y]),
		new Path2D("M "+[a0x,a0y,b1x,b1y,c0x,c0y]),
		new Path2D("M "+[c0x,c0y,b1x,b1y,d1x,d1y]),
		new Path2D("M "+[c0x,c0y,e0x,e0y,d1x,d1y]),
		new Path2D("M "+[c0x,c0y,e0x,e0y,d0x,d0y]),
		new Path2D("M "+[c0x,c0y,b0x,b0y,d0x,d0y]),
	];
}

export function getTriangle(xPos, yPos, type) {
	const a0x = xPos + TSIZE / 2;
	const a0y = yPos;
	const b0x = xPos;
	const b0y = yPos + TSIZE / 4;
	const b1x = xPos + TSIZE;
	const b1y = yPos + TSIZE / 4;
	const c0x = xPos + TSIZE / 2;
	const c0y = yPos + TSIZE / 2;

	return type ?
		new Path2D("M "+[a0x-TSIZE/2,a0y,b1x-TSIZE/2,b1y,c0x-TSIZE/2,c0y]):
		new Path2D("M "+[a0x,a0y,b0x,b0y,c0x,c0y]);
}
