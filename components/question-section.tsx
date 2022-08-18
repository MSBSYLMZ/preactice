import Timer from "./timer/timer";
import QuestionOption from "./question-option/question-option";
import Question from "./question";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

import useGame from "@hooks/useGame";

import { generateOptions, generateQuestion } from "../utils/question";
import { gameVar, puzzleVar, questionVar } from "apollo-client/reactive-variables";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_ALL_QUESTIONS } from "apollo-client/question.queries";

const QuestionSection = () => {
	const applyButton = useRef<HTMLButtonElement>(null);
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState([]);
	const gameHook = useGame();
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const { gameover, newGame } = useReactiveVar(gameVar);
	const { data: questions, error, loading } = useQuery(GET_ALL_QUESTIONS);
	const { correctAnswer, activeAnswer, correctAnswersCount } = useReactiveVar(questionVar);
	const { slotCount } = useReactiveVar(puzzleVar);

	const handleApply = () => {
		if (activeAnswer && correctAnswer && activeAnswer !== "" && !gameover) {
			if (activeAnswer === correctAnswer) {
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
		const question = questions.questions[questionIndex];
		const correctAnswerIndex = question.options.findIndex((item: { text: string; correct: boolean }) => item.correct);
		const correctAnswer = question.options[correctAnswerIndex].text;
		const options = question.options.map((item: { text: String; correct: Boolean }) => item.text);
		questionVar({ ...questionVar(), correctAnswer });
		setQuestion(question.text);
		setOptions(options);
		setQuestionIndex(questionIndex + 1)
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
		if (!gameover && questions) setQuestionAndAnswer();
	}, [correctAnswersCount]);

	useLayoutEffect(() => {
		if (newGame && questions) {
			setQuestionAndAnswer();
			gameVar({ ...gameVar(), newGame: false });
		}
	}, [newGame, questions]);

	// useEffect(() => {
	// 	if (question) {
	// 		const options = generateOptions(correctAnswer);
	// 		setOptions(options);
	// 	}
	// }, [question]);
	console.log(correctAnswer, questions);
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
				{options ? options.map((item: string, index) => <QuestionOption key={index} value={item} item={item}></QuestionOption>) : null}
				<button className="text-black" ref={applyButton} onClick={handleApply}>
					Apply
				</button>
			</div>
		</div>
	);
};

export default QuestionSection;
