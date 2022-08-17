//@ts-nocheck
import { useCallback } from "react";
import { clearCanvas } from "utils/canvas";
import { useReactiveVar } from "@apollo/client";
import { puzzleVar, gameVar, questionVar } from "apollo-client/reactive-variables";

function useGame() {
	const puzzle = useReactiveVar(puzzleVar);
	// const currentUser =

	// const dispatch = useDispatch();
	// const currentUser = useSelector(selectCurrentUser);
	const ctx: CanvasRenderingContext2D | null = puzzle.ctx;
	// const DEFAULT_SUCCESS_MESSAGE = ` Yeyyy! ${currentUser?.name ? currentUser.name : ""} you have done the mission successfully`;
	const DEFAULT_SUCCESS_MESSAGE = ` Yeyyy! you have done the mission successfully`;
	// const DEFAULT_GAMEOVER_MESSAGE = ` Ooopss! ${	currentUser?.name ? currentUser.name : ""} you have done a little mistake.  Do you want to try again? `;
	const DEFAULT_GAMEOVER_MESSAGE = ` Ooopss! you have done a little mistake.  Do you want to try again? `;

	const start = useCallback(async () => {
		const response = await fetch("https://picsum.photos/600");
		const newImageLink = response.url;
		puzzleVar({ ...puzzleVar(), imageLink: newImageLink });
	}, []);

	const restart = useCallback(async () => {
		const cleanCtx = clearCanvas(ctx);
		const response = await fetch("https://picsum.photos/600");
		const newImageLink = response.url;
		puzzleVar({
			...puzzleVar(),
			imageLink: newImageLink,
			addedPiecesCount: 0,
			ctx: cleanCtx,
		});
		questionVar({
			...questionVar(),
			correctAnswer: null,
			correctAnswersCount: null,
			activeAnswer: null,
		});
		gameVar({
			...gameVar(),
			showMessage: false,
			gameover: false,
			success: false,
			newGame: true,
		});
	}, [ctx]);

	const gameOver = useCallback((message = DEFAULT_GAMEOVER_MESSAGE) => {
		gameVar({
			...gameVar(),
			gameover: true,
			success: false,
			showMessage: true,
			message,
			messageType: "fail",
		});
	}, []);
	const success = useCallback((message = DEFAULT_SUCCESS_MESSAGE) => {
		gameVar({
			...gameVar(),
			gameover: true,
			success: true,
			showMessage: true,
			message,
			messageType: "Success",
		});
	}, []);

	return {
		start,
		restart,
		gameOver,
		success,
	};
}

export default useGame;
