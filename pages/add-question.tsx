import type { NextPage } from "next";
import Input from "../components/basics/input";
import { useState } from "react";
import { ChangeEvent, MouseEvent } from "react";
import Button from "../components/basics/button";
import { removeElementFromArray } from "utils";
import { ADD_QUESTION } from "apollo-client/question.queries";
import { useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";

const QUESTION_MAX_LENGTH = 150;
const OPTION_MAX_LENGTH = 50;

const AddQuestion: NextPage = () => {
	const [form, setForm] = useState({ question: "", correctAnswer: "", options: [{ text: "", correct: false }], category: "" });
	const [addQuestion, { data: addedQuestionData, error: addQuestionError, loading: addQuestionLoading }] = useMutation(ADD_QUESTION);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const key: string = e.target.id;
		const value: string = e.target.value;
		setForm({ ...form, [key]: value });
	};

	const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		const index: number = +e.target.id.slice(6, e.target.id.length);
		const value: string = e.target.value;
		const formCopy = { ...form };
		formCopy.options[index] = {
			correct: false,
			text: value,
		};
		setForm(formCopy);
	};

	const handleAddOption = () => {
		if (form.options.length === 4) {
			alert("Option count must be lower then 5");
			return;
		}
		const formCopy = { ...form };
		formCopy.options.push({
			correct: false,
			text: "",
		});
		setForm(formCopy);
	};

	const handleRemoveOption = (e: MouseEvent<HTMLDivElement>) => {
		if (form.options.length === 1) {
			alert("You must provide at least 2 option");
			return;
		}
		//@ts-ignore
		const index = e.target.id;
		const copyForm = { ...form };
		const newOptions = removeElementFromArray(copyForm.options, index);
		copyForm.options = newOptions;
		setForm(copyForm);
	};

	const handleSubmit = () => {
		const data = {
			text: form.question,
			options: [
				...form.options,
				{
					text: form.correctAnswer,
					correct: true,
				},
			],
		};
		addQuestion({ variables: data });
	};

	if (addedQuestionData) {
		toast.success("Question added successfully");
	}
	if (addQuestionError) {
		toast.error(`Failed to add question`);
	}

	const optionInputs = form.options.map((item: { text: string; correct: boolean }, index: number) => (
		<div className="my-6 w-5/12 flex flex-wrap justify-between" key={index}>
			<>
				<label>Option</label>
				<Input
					className="bg-gray h-16"
					value={item.text}
					onChange={handleOptionChange}
					id={`option${index}`}
					type="text"
					maxLength={OPTION_MAX_LENGTH}
				/>
				{console.log("iiiii", index)}
				{/* @ts-ignore */}
				<div className="w-1/12" id={index} onClick={handleRemoveOption}>
					DELETE
				</div>
				<div>
					{item.text.length} / {OPTION_MAX_LENGTH}
				</div>
			</>
		</div>
	));
	return (
		<div className="mt-28 bg-yellow w-8/12 mx-auto">
			<ToastContainer
				position="bottom-left"
				autoClose={3000}
				theme="dark"
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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
				<textarea
					className="bg-gray h-24 px-4 p-1 outline-none w-full rounded"
					value={form.question}
					onChange={handleOnChange}
					id="question"
					maxLength={QUESTION_MAX_LENGTH}
				/>
				<div>
					{form.question.length} / {QUESTION_MAX_LENGTH}
				</div>
			</div>
			<div className="flex justify-between flex-wrap">
				<div className="my-6 w-5/12">
					<label>Correct answer (counts as an option)</label>
					<Input className="bg-gray h-16" value={form.correctAnswer} onChange={handleOnChange} type="text" id="correctAnswer" />
				</div>
				{optionInputs}
			</div>
			<div className="flex justify-between my-4">
				<div></div>
				<Button className="bg-black text-white px-8 w-52" onClick={handleAddOption}>
					+ Add Option
				</Button>
			</div>
			<div className="my-6">
				<label>Category</label>
				<Input className="bg-gray h-16" value={form.category} onChange={handleOnChange} type="text" id="question" />
			</div>
			<div className="flex justify-between my-4">
				<div></div>
				<Button className="bg-black text-white w-52" onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default AddQuestion;
