import { useReactiveVar } from "@apollo/client";
import { gameVar, questionVar } from "apollo-client/reactive-variables";

interface QuestionOptionProps {
	item: string | number;
	value: string | number;
}

const QuestionOption = ({ item, value }: QuestionOptionProps) => {
	const { activeAnswer, correctAnswer } = useReactiveVar(questionVar);
	const game = useReactiveVar(gameVar);

	const handleClick = () => {
		if (!game.gameover) questionVar({ ...questionVar(), activeAnswer: value });
	};
	return (
		<div
			className={`${activeAnswer === value ? "bg-purple" : ""} ${activeAnswer === value && !game.success && game.gameover ? "bg-red" : ""} ${
				correctAnswer && correctAnswer === value && !game.success && game.gameover ? "bg-green-700" : ""
			} option text-2xl border-2 border-solid border-white my-4 p-2 select-none rounded-lg cursor-pointer `}
			//@ts-ignore
			value={value}
			onClick={handleClick}>
			{item}
		</div>
	);
};

export default QuestionOption;
