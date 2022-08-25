import { createQuestion } from "./question.functions";
import { prismaMock } from "../singleton";

describe("DB Tests", () => {
	afterAll(async () => {
		const deleteQuestions = await prismaMock.question.deleteMany();
		// await deleteQuestions;
	});
	test("Should create new question", async () => {
		const question = {
			text: "What is 5 times 3?",
			created_at: "2022-08-22T11:23:18.104Z",
			updated_at: "2022-08-22T11:23:18.104Z",
			deleted_at: null,
		};
		//@ts-ignore
		prismaMock.question.create.mockResolvedValue(question);

		await expect(createQuestion(question)).resolves.toMatchObject({
			id: expect.anything(),
			text: "What is 5 times 3?",
			media: null,
			creator_id: null,
			status: "pending",
			privacy: "public",
			deleted: false,
			created_at: new Date("2022-08-22T11:23:18.104Z"),
			updated_at: new Date("2022-08-22T11:23:18.104Z"),
			deleted_at: null,
		});
	});
});
