// 4*4
const DEFAULT_SQUARE_COUNT = 4;

export function setStrokes(ctx: CanvasRenderingContext2D, squareCount = DEFAULT_SQUARE_COUNT) {
	if(!ctx) return;
	const canvasWidth = ctx.canvas.width;
	const singleSquareSize = canvasWidth / squareCount;
		for (let i = 0; i < squareCount; i++) {
			let xAxis = i * singleSquareSize;
			for (let j = 0; j < squareCount; j++) {
				let yAxis = j * singleSquareSize;
				ctx.strokeStyle = "#04060E";
				ctx.strokeRect(xAxis, yAxis, singleSquareSize, singleSquareSize);
			}
		}
	return ctx;
}

export function clearCanvas(ctx: CanvasRenderingContext2D | null): CanvasRenderingContext2D | null {
	if (!ctx) return null;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	return ctx;
}

export function calculateCanvasSize(windowWidth: number) {
	if (windowWidth > 1200) return 600;
	if (windowWidth < 600 && windowWidth >= 320) return 300;
	if (windowWidth < 320 && windowWidth >= 250) return 250;
	if (windowWidth < 250) return 200;
	return (Math.floor(windowWidth / 200) * 200) / 2;
}

export const getSquareInfo = (slotCount: number, canvasSize: number) => {
	const DEFAULT_BORDER_SIZE = 1;
	const slotSquareRoot = Math.sqrt(slotCount);
	const widthOfCanvas = canvasSize;
	const singleSquareSize = widthOfCanvas / slotSquareRoot;
	const singleSquareWithoutBorder = singleSquareSize - 2 * DEFAULT_BORDER_SIZE;
	return {
		slotSquareRoot,
		singleSquareSize,
		singleSquareWithoutBorder,
	};
};
