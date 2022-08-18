import { useReactiveVar } from "@apollo/client";
import { useCallback, useRef, useState, useLayoutEffect, useEffect, MutableRefObject } from "react";
import { getRndInteger, removeElementFromArray, createSlotsInfoObject, isEmpty } from "../utils/index";
import { calculateCanvasSize, clearCanvas, getSquareInfo, setStrokes } from "utils/canvas";
import useGame from "@hooks/useGame";
import { puzzleVar, questionVar } from "apollo-client/reactive-variables";

const DEFAULT_IMAGE_PIECE_SIZE = 148;
const DEFAULT_SLOT_COUNT = 16;

const Puzzle = () => {
	const DEFAULT_CANVAS_SIZE = 600;
	const puzzleCanvas = useRef<HTMLCanvasElement>(null);
	const gameHook = useGame();
	const puzzle = useReactiveVar(puzzleVar);
	const question = useReactiveVar(questionVar);
	const { ctx, imageLink, slotCount, addedPiecesCount } = puzzle;
	const { correctAnswersCount } = question;

	const [emptySlotsArray, setEmptySlotsArray] = useState<string[]>([]);
	const [canvasSize, setCanvasSize] = useState<number>();
	const [imagePiecesArray, setImagePieces] = useState<HTMLCanvasElement[]>([]);
	const [slotsInfo, setSlotsInfo] = useState<{ [key: string]: boolean }>({});

	const { slotSquareRoot, singleSquareSize, singleSquareWithoutBorder } = getSquareInfo(slotCount, canvasSize ?? DEFAULT_CANVAS_SIZE);

	const getImage = () => {
		let img = new Image();
		img.src = imageLink as string;
		img.onload = function () {
			const imagePieces = splitImage(img);
			setImagePieces(imagePieces);
		};
	};

	const splitImage = useCallback((img: HTMLImageElement) => {
		const imagePieces = [];
		for (let i = 0; i < slotSquareRoot; i++) {
			let yAxis = i * DEFAULT_IMAGE_PIECE_SIZE + 1;

			for (let j = 0; j < slotSquareRoot; j++) {
				let xAxis = j * DEFAULT_IMAGE_PIECE_SIZE + 1;
				let temporaryCanvas = document.createElement("canvas");
				let temporaryCtx = temporaryCanvas.getContext("2d") as CanvasRenderingContext2D;

				temporaryCtx.canvas.width = DEFAULT_IMAGE_PIECE_SIZE;
				temporaryCtx.canvas.height = DEFAULT_IMAGE_PIECE_SIZE;
				temporaryCtx.drawImage(
					img,
					xAxis,
					yAxis,
					DEFAULT_IMAGE_PIECE_SIZE,
					DEFAULT_IMAGE_PIECE_SIZE,
					0,
					0,
					DEFAULT_IMAGE_PIECE_SIZE,
					DEFAULT_IMAGE_PIECE_SIZE,
				);
				imagePieces.push(temporaryCanvas);
			}
		}
		return imagePieces;
	}, []);

	const handleAdding = () => {
		if (!ctx) return;
		const randIndex = emptySlotsArray.length < 2 ? 0 : getRndInteger(emptySlotsArray.length);
		const pieceNumber = emptySlotsArray[randIndex];
		const newCtx = addPiece(+pieceNumber);
		const newSlotsInfo = { ...slotsInfo };
		newSlotsInfo[pieceNumber] = true;
		const newEmptySlotsArray = removeElementFromArray(emptySlotsArray, randIndex);
		puzzleVar({ ...puzzleVar(), ctx: newCtx as CanvasRenderingContext2D, addedPiecesCount: addedPiecesCount + 1 });
		setSlotsInfo(newSlotsInfo);
		setEmptySlotsArray(newEmptySlotsArray);
	};

	const addPiece = useCallback(
		(pieceNumber: number) => {
			const axisInfo = calculatePieceAxis(pieceNumber);
			if (!ctx) return;
			ctx.drawImage(
				imagePiecesArray[pieceNumber],
				0,
				0,
				DEFAULT_IMAGE_PIECE_SIZE,
				DEFAULT_IMAGE_PIECE_SIZE,
				axisInfo.xAxis,
				axisInfo.yAxis,
				singleSquareWithoutBorder,
				singleSquareWithoutBorder,
			);
			return ctx;
		},
		[ctx, imagePiecesArray, singleSquareWithoutBorder],
	);

	const calculatePieceAxis = useCallback(
		(pieceNumber: number) => {
			let xAxis = pieceNumber !== 0 && pieceNumber % slotSquareRoot === 0 ? 0 : (pieceNumber % slotSquareRoot) * singleSquareSize;
			let yAxis =
				pieceNumber !== 0 && pieceNumber % slotSquareRoot !== 0
					? Math.floor(pieceNumber / slotSquareRoot) * singleSquareSize
					: (pieceNumber / slotSquareRoot) * singleSquareSize;
			xAxis++;
			yAxis++;
			return {
				xAxis,
				yAxis,
			};
		},
		[singleSquareSize, slotSquareRoot],
	);

	const resetSlotsInfo = useCallback(() => {
		const newSlotsInfo = createSlotsInfoObject(slotCount);
		setSlotsInfo(newSlotsInfo);
		setEmptySlotsArray(Object.keys(newSlotsInfo));
	}, [slotCount]);

	const handleResize = useCallback(() => {
		if (!globalThis) return;
		const windowWidth = window.innerWidth;
		const newCanvasSize = calculateCanvasSize(windowWidth);
		if (ctx && newCanvasSize !== ctx.canvas.width) {
			resizeCanvas(newCanvasSize);
			puzzleVar({ ...puzzleVar(), ctx });
			setCanvasSize(newCanvasSize);
		}
	}, [globalThis?.innerWidth, ctx]);

	const restoreAddedPieces = useCallback(() => {
		if (emptySlotsArray.length < slotCount) {
			for (let index in slotsInfo) {
				if (slotsInfo[index] === true) addPiece(+index);
			}
		}
	}, [emptySlotsArray, slotCount, slotsInfo, addPiece]);

	const resizeCanvas = useCallback(
		(size: number) => {
			if (!ctx) return;
			ctx.canvas.width = size;
			ctx.canvas.height = size;
			return ctx;
		},
		[ctx],
	);

	useLayoutEffect(() => {
		getImage();
		let newCtx = ctx;
		if (puzzleCanvas) newCtx = puzzleCanvas.current ? puzzleCanvas.current.getContext("2d") : null;
		if (imageLink) {
			const context = setStrokes(newCtx as CanvasRenderingContext2D, slotSquareRoot);
			puzzleVar({ ...puzzleVar(), ctx: context as CanvasRenderingContext2D });
		}
		resetSlotsInfo();
	}, [imageLink]);

	useEffect(() => {
		if (correctAnswersCount > addedPiecesCount) handleAdding();
	}, [correctAnswersCount]);

	useEffect(() => {
		gameHook.start();
	}, []);

	useEffect(() => {
		if (ctx) {
			clearCanvas(ctx);
			setStrokes(ctx, slotSquareRoot);
			restoreAddedPieces();
			puzzleVar({ ...puzzleVar(), ctx });
		}
	}, [canvasSize]);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		function onResizeEnd() {
			clearTimeout(timeout);
			timeout = setTimeout(handleResize, 100);
		}
		window.addEventListener("resize", onResizeEnd);
		return () => window.removeEventListener("resize", onResizeEnd);
	}, [ctx, emptySlotsArray.length]);

	return (
		<div className="puzzle">
			<canvas height={DEFAULT_CANVAS_SIZE} width={DEFAULT_CANVAS_SIZE} ref={puzzleCanvas} id="puzzle-canvas" />
		</div>
	);
};

export default Puzzle;
