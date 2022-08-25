import { createTestContext } from "../__helpers";
import { questionCreateMutation, questionDeleteMutation, questionUpdateMutation } from "./question.mutations";
import { getAllQuestions, getQuestionById } from "./question.queries";

const ctx = createTestContext();

const questionCreateInputsWithoutOptions = {
	text: "Some kind of a question",
};

const questionCreateInputs = {
	...questionCreateInputsWithoutOptions,
	options: [
		{
			text: "The right answer",
			correct: true,
		},
		{
			text: "The wrong answer",
			correct: false,
		},
	],
};

describe("Question Crud", () => {
	it("Create question with options", async () => {
		const created = await ctx.client.request(questionCreateMutation, questionCreateInputs);
		expect(created.createQuestion).toMatchObject(questionCreateInputs);
	});

	it("Ensures wrong privacy field is not accepted", async () => {
		const createCall = ctx.client.request(questionCreateMutation, { ...questionCreateInputs, privacy: "hello" });
		expect(createCall).rejects.toThrow();
	});

	it("Ensures wrong status field is not accepted", async () => {
		const createCall = ctx.client.request(questionCreateMutation, { ...questionCreateInputs, status: "hello" });
		expect(createCall).rejects.toThrow()
	});

	it("Update question", async () => {
		const allQuestions = await ctx.client.request(getAllQuestions);
		const latestId = allQuestions.questions.at(-1).id;
		const updateValues = { text: "Changed text", id: latestId };
		const updated = await ctx.client.request(questionUpdateMutation, updateValues);
		expect(updated.updateQuestion).toMatchObject({ ...questionCreateInputs, ...updateValues });
	});

	it("Delete question", async () => {
		const allQuestions = await ctx.client.request(getAllQuestions);
		const firstElement = allQuestions.questions[0];
		const firstId = firstElement.id;
		const deleted = await ctx.client.request(questionDeleteMutation, { id: firstId });
		const findDeleted = await ctx.client.request(getQuestionById, { questionId: firstId });

		expect(firstElement).toMatchObject(deleted.deleteQuestion);
		expect(findDeleted).toMatchObject({ question: null });
	});
});
