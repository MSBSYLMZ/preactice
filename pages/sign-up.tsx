import type { NextPage } from "next";
import Input from "../components/basics/input";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import Button from "../components/basics/button";
import { QuestionType } from "interfaces";

const SignUp: NextPage = () => {
	const [form, setForm] = useState({ username: "", first_name: "", last_name: "", password: "" });
	// const {createUser ,[data]} = useMutation()

	// const handleSubmit = async () => {
	// 	addQuestionRunner();
	// };

	// const handleCacheData = () => {
	// 	const response = client.readQuery({
	// 		query: getAllQuestions,
	// 	});
	// 	console.log(response);
	// };

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const key: string = e.target.id;
		const value: string = e.target.value;
		setForm({ ...form, [key]: value });
	};

	return (
		<div className="mt-40 bg-yellow">
			<label>Username</label>
			<Input value={form.username} onChange={handleOnChange} type="text" id="question" />
			<label>First Name</label>
			<Input value={form.first_name} onChange={handleOnChange} type="text" id="question" />
			<label>Last Name</label>
			<Input value={form.last_name} onChange={handleOnChange} type="text" id="question" />
			<label>Password</label>
			<Input value={form.password} onChange={handleOnChange} type="text" id="question" />
			{/* <Button onClick={handleSubmit}>Submit</Button> */}
		</div>
	);
};

export default SignUp;
