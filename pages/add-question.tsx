import type { NextPage } from "next";
import Input from "../components/basics/input";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import Button from "../components/basics/button";
import { addQuestion } from "apollo-client/question.queries";
import { QuestionType } from "interfaces";

const AddQuestion: NextPage = () => {
	const [form, setForm] = useState({ question: "", correctAnswer: "", options: [""], category: "" });
	// const [addQuestionRunner, { data: addedQuestion, error: addQuestionError, loading: addQuestionLoading }] = useMutation(addQuestion, {
	// 	variables: {
	// 		text: form.question,
	// 	},
	// 	update(cache, { data }) {
	// 		const newQuestion = data?.addQuestion;
	// 		const existingQuestions: { questions: QuestionType[] } | null = cache.readQuery({
	// 			query: getAllQuestions,
	// 		});
	// 		cache.writeQuery({
	// 			query: getAllQuestions,
	// 			data: {
	// 				questions: [...(existingQuestions?.questions as QuestionType[]), newQuestion],
	// 			},
	// 		});
	// 	},
	// });

	const handleSubmit = async () => {
		// addQuestionRunner();
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const key: string = e.target.id;
		const value: string = e.target.value;
		setForm({ ...form, [key]: value });
	};

	return (
		<div className="mt-28 bg-yellow w-8/12 mx-auto">
			<h3 className="text-purple text-7xl text-center font-bold">Share Your Wisdom</h3>
			<h4 className="text-black text-3xl text-center font-bold">By adding a question to the pool</h4>
			<ul>
				<li className="list-disc text-2xl font-medium">Keep it short. We don’t want people to struggle trying to finish reading. Right?</li>
				<li className="list-disc text-2xl font-medium">Answer options and categories should be relevant to the question. </li>
				<li className="list-disc text-2xl font-medium">Be sure about the answer. We recommend check it again before submiting.</li>
				<li className="list-disc text-2xl font-medium">When chosing the diffuculty level. Be consider everybody.</li>
			</ul>
			<div className="my-6">
				<label className="text-xl">Question</label>
				<Input className="bg-gray h-16" value={form.question} onChange={handleOnChange} type="text" id="question" maxLength={300} />
				<div>{form.question.length} / 300</div>
			</div>
			<div className="flex justify-between flex-wrap">
				<div className="my-6 w-5/12">
					<label>Correct answer</label>
					<Input className="bg-gray h-16" value={form.correctAnswer} onChange={handleOnChange} type="text" id="correctAnswer" />
				</div>
				<div className="my-6 w-5/12">
					<label>Option</label>
					<Input className="bg-gray h-16" value={form.options[0]} onChange={handleOnChange} type="text" id="option" />
				</div>
			</div>
			<div className="flex justify-between my-4">
				<div></div>
				<Button className="bg-black text-white px-8 w-52">+ Add Option</Button>
			</div>
			<div className="my-6">
				<label>Category</label>
				<Input className="bg-gray h-16" value={form.category} onChange={handleOnChange} type="text" id="question" />
			</div>
			<div className="flex justify-between my-4">
				<div></div>
				<Button className="bg-black text-white w-52">Submit</Button>
			</div>
		</div>
	);
};

export default AddQuestion;
