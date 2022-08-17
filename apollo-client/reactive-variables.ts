import { makeVar } from "@apollo/client";
import Error from "next/error";

interface PuzzleVar {
	addedPiecesCount: number;
	imageLink: string;
	ctx: CanvasRenderingContext2D | null;
	slotCount: number;
}

interface QuestionVar {
	activeAnswer: number | string | null;
	correctAnswer: number | string | null;
	correctAnswersCount: number;
	timerBegin: number;
	error: Error | null;
}

interface GameVar {
	newGame: boolean;
	success: boolean;
	gameover: boolean;
	showMessage: boolean;
	message: string;
	messageType: string;
}

export const puzzleVar = makeVar<PuzzleVar>({
	addedPiecesCount: 0,
	imageLink: "",
	ctx: null,
	slotCount: 16,
});

export const questionVar = makeVar<QuestionVar>({
	activeAnswer: null,
	correctAnswer: null,
	correctAnswersCount: 0,
	timerBegin: 8,
	error: null,
});

export const gameVar = makeVar<GameVar>({
	newGame: true,
	success: false,
	gameover: false,
	message: "",
	messageType: "info",
	showMessage: false,
});
