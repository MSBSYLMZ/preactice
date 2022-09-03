import { useReactiveVar } from "@apollo/client";
import Puzzle from "@components/puzzle";
import QuestionSection from "@components/question-section";
import { gameVar } from "apollo-client/reactive-variables";
import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";

const SinglePlayer: NextPage = () => {
	const game = useReactiveVar(gameVar);
	const { data: session, status } = useSession();
	if (!session) {
		return (
			<button className="mt-72"
				onClick={() => {
					signIn();
				}}>
				Sign In
			</button>
		);
	}
	return (
		<div className="flex py-24 justify-evenly w-full bg-purple-600">
			<QuestionSection></QuestionSection>
			<Puzzle></Puzzle>
		</div>
	);
};

export default SinglePlayer;
