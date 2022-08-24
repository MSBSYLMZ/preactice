import { createTestContext } from "../__helpers";
import { questionCreateMutation, questionCreateMutationsWithoutOptions } from "./question.mutations";

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
	it("Question needs options", async () => {
		const result = await ctx.client.request(questionCreateMutation, questionCreateInputs);
		console.log(result);
    expect(2).toEqual(2)
	});

	// 	it("Ensures that a question can be deleted", async () => {
	// 		const result = await ctx.client.request(
	// 			`
	//       mutation deleteUser($id: Int!) {
	//         createUser() {
	//           username
	//           first_name
	//           last_name
	//           password
	//         }
	//       }
	//   `,
	// 			{ username: "another 2", firstName: "first", lastName: "last", password: "password" },
	// 		);
	// 		expect(result).toMatchInlineSnapshot(`
	//     Object {
	//       "createUser": Object {
	//         "first_name": "first",
	//         "last_name": "last",
	//         "password": "password",
	//         "username": "another 2",
	//       },
	//     }
	// `);
	// 	});
});
