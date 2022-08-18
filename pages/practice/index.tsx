import { useReactiveVar } from "@apollo/client";
import Puzzle from "@components/puzzle";
import QuestionSection from "@components/question-section";
import { gameVar } from "apollo-client/reactive-variables";
import type { NextPage } from "next";

const SinglePlayer: NextPage = () => {
	const game = useReactiveVar(gameVar);
	return (
		<div className="flex py-24 justify-evenly w-full bg-purple-600">
			{game.showMessage ? <div>HERE should be a message</div> : null}
			<QuestionSection></QuestionSection>
			<Puzzle></Puzzle>
		</div>
	);
};

export default SinglePlayer;
