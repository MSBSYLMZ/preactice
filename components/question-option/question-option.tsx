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
			className={`${activeAnswer === value ? "active" : ""} ${activeAnswer === value && !game.success && game.gameover ? "wrong" : ""} ${
				correctAnswer && +correctAnswer === value && !game.success && game.gameover ? "right" : ""
			} option`}
			//@ts-ignore
			value={value}
			onClick={handleClick}>
			{item}
		</div>
	);
};

export default QuestionOption;
