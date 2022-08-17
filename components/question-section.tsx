import Timer from "./timer/timer";
import QuestionOption from "./question-option/question-option";
import Question from "./question";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

import useGame from "@hooks/useGame";

import { generateOptions, generateQuestion } from "../utils/question";
import { gameVar, puzzleVar, questionVar } from "apollo-client/reactive-variables";
import { useReactiveVar } from "@apollo/client";

const QuestionSection = () => {
	const applyButton = useRef<HTMLButtonElement>(null);
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const gameHook = useGame();
	const { gameover, newGame } = useReactiveVar(gameVar);
	const { correctAnswer, activeAnswer, correctAnswersCount } = useReactiveVar(questionVar);
	const { slotCount } = useReactiveVar(puzzleVar);

	const handleApply = () => {
		if (activeAnswer && correctAnswer && activeAnswer !== "" && !gameover) {
			if (+activeAnswer === +correctAnswer) {
				questionVar({ ...questionVar(), correctAnswersCount: +correctAnswersCount + 1, activeAnswer: "" });
				if (+correctAnswersCount + 1 === +slotCount) gameHook.success();
			} else {
				gameHook.gameOver();
			}
		}
	};
	const handleRestart = () => {
		gameHook.restart();
	};

	const handleEnter = () => {
		if (applyButton.current) applyButton.current.click();
	};

	const setQuestionAndAnswer = () => {
		const question = generateQuestion();
		questionVar({ ...questionVar(), correctAnswer: question.answer });
		setQuestion(question.question);
	};

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === "Enter" || event.code === "NumpadEnter") {
				event.preventDefault();
				handleEnter();
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keypress", listener);
		};
	}, []);

	useEffect(() => {
		!gameover && setQuestionAndAnswer();
	}, [correctAnswersCount]);

	useLayoutEffect(() => {
		if (newGame) {
			setQuestionAndAnswer();
			gameVar({ ...gameVar(), newGame: false });
		}
	}, [newGame]);

	useEffect(() => {
		if (question) {
			const options = generateOptions(correctAnswer);
			setOptions(options);
		}
	}, [question]);

	return (
		<div className="question-section">
			<div className="flex-container">
				<button onClick={handleRestart} style={{ margin: "18px 0" }}>
					RESTART
				</button>
			</div>
			<Timer question={question}></Timer>
			<div className="questions">
				<Question>{question}</Question>
				{options ? options.map((item, index) => <QuestionOption key={index} value={+item} item={item}></QuestionOption>) : null}
				<button ref={applyButton} onClick={handleApply}>
					Apply
				</button>
			</div>
		</div>
	);
};

export default QuestionSection;
