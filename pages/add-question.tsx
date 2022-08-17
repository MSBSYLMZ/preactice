import type { NextPage } from "next";
import Input from "../components/basics/input";
import { useQuery, useMutation, useApolloClient, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import Button from "../components/basics/button";
import { getAllQuestions, addQuestion } from "@requests/question.request";
import { QuestionType } from "interfaces";


const AddQuestion: NextPage = () => {
	const client = useApolloClient();
	const { data: questionData, error: questionsError, loading: questionsLoading, refetch } = useQuery(getAllQuestions);
	const [form, setForm] = useState({ question: "" });
	const [addQuestionRunner, { data: addedQuestion, error: addQuestionError, loading: addQuestionLoading }] = useMutation(addQuestion, {
		variables: {
			text: form.question,
		},
		update(cache, { data }) {
			const newQuestion = data?.addQuestion;
			const existingQuestions: { questions: QuestionType[] } | null = cache.readQuery({
				query: getAllQuestions,
			});
			cache.writeQuery({
				query: getAllQuestions,
				data: {
					questions: [...(existingQuestions?.questions as QuestionType[]), newQuestion],
				},
			});
		},
	});

	const handleSubmit = async () => {
		addQuestionRunner();
	};

	const handleRefetch = async () => {
		const resp = await refetch();
		console.log(resp);
	};

	const handleCacheData = () => {
		const response = client.readQuery({
			query: getAllQuestions,
		});
		console.log("from read query", response);
		console.log("direct data", window.__APOLLO_CLIENT__.cache.data.data);
	};

	const handleModifyCache = () => {
		const cache = client.cache;
		const response = cache.modify({
			id: "Question:5",
			fields: {
				creator(cachedCreator, { readField }) {
					return { __ref: "User:2", first_name: "Musab" };
				},
			},
		});
		// const response = cache.modify({
		// 	id: "Question:5",
		// 	fields: {
		// 		text(text) {
		// 			return "Degisti";
		// 		},
		// 	},
		// });
		console.log("from modified data", response);
		console.log("modified direct data", window.__APOLLO_CLIENT__.cache.data.data);
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const key: string = e.target.id;
		const value: string = e.target.value;
		setForm({ ...form, [key]: value });
	};
	console.log(questionData);
	const questions = questionData?.questions.map((question: QuestionType) => (
		<div key={question.id}>
			{question.text}
			{question.creator?.first_name}
		</div>
	));
	if (questionsError) {
		console.log(questionsError);
	}
	if (questionsError) return <>Error Occured</>;
	if (questionsLoading) return <>Loading</>;
	return (
		<div className="mt-40 bg-yellow">
			<label>Question</label>
			<Input value={form.question} onChange={handleOnChange} type="text" id="question" />
			<Button onClick={handleSubmit}>Submit</Button>
			<Button onClick={handleCacheData}>Cache Dont Request</Button>
			<Button onClick={handleRefetch}>Refetch</Button>
			<Button onClick={handleModifyCache}>Modify</Button>
			{questions}
		</div>
	);
};

export default AddQuestion;
