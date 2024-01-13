import bedrock from "../assets/bedrock.png"
import obsidian from "../assets/obsidian.png"
import stone from "../assets/stone.png"
import dirt from "../assets/dirt.png"
import grass from "../assets/grass.png"

export const imageUrls = [
	bedrock,
	obsidian,
	stone,
	dirt,
	grass
]

export const IMAGES = [];

// once images are loaded, overwrite IMAGES
export function setImages(loadedImages) {
	for (let i = 0; i < loadedImages.length; i++) {
		IMAGES.push(loadedImages[i]);
	}
}
