import { useState, useEffect } from "react";
import useGame from "@hooks/useGame";
import { useReactiveVar } from "@apollo/client";
import { gameVar, questionVar } from "apollo-client/reactive-variables";
import styles from "./timer.module.css";

interface TimerProps {
	question: string;
}
type TimeoutType = ReturnType<typeof setTimeout>;

const Timer = ({ question }: TimerProps) => {
	const gameHook = useGame();
	const timerBegin = useReactiveVar(questionVar).timerBegin;
	const game = useReactiveVar(gameVar);
	const [timerCount, setTimerCount] = useState<number>(timerBegin);
	const [activeAnimation, setActiveAnimation] = useState({ animation: `${styles.animateTimerBar} ${timerBegin}s linear 0s 1` });

	const [intervalId, setIntervalId] = useState<string | number | null>(null);

	const countDown = () => {
		setTimerCount((time: number) => time - 1);
	};

	const startInterval = () => {
		const intId = setInterval(countDown, 1000);
		//@ts-ignore
		setIntervalId(intId);
	};

	const finishInterval = () => {
		clearInterval(intervalId as number);
		setIntervalId(null);
	};

	useEffect(() => {
		if (game.newGame && !intervalId) startInterval();
	}, [game.newGame]);

	useEffect(() => {
		if (timerCount < 1 || game.gameover === true) {
			if (game.gameover !== true) gameHook.gameOver(`Ooopss! You need to be quicker than that. Do you want to try again.`);
			finishInterval();
		}
	}, [timerCount]);

	useEffect(() => {
		setTimerCount(timerBegin);
	}, [question]);

	return (
		<div className="relative">
			<div className="absolute right-0 -top-100 font-bold text-6xl text-white">{timerCount}</div>
			<div className={styles.timer}>
				{game.gameover !== true ? <div className={styles["timer-inner"]} key={question} style={{ ...activeAnimation }}></div> : null}
			</div>
		</div>
	);
};

export default Timer;
