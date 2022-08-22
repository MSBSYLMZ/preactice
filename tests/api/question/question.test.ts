import { createTestContext } from "../__helpers";

const ctx = createTestContext();

it("ensures that a question can be created", async () => {
	const result = await ctx.client.request(
		`
      mutation CreateUser($username: String!, $firstName: String!, $lastName: String!, $password: String!) {
        createUser(username: $username, first_name: $firstName, last_name: $lastName, password: $password) {
          username
          first_name
          last_name
          password
          id
        }
      }
  `,
		{ username: "another 2", firstName: "first", lastName: "last", password: "password" },
	);
	expect(result).toMatchInlineSnapshot(`
    Object {
      "createUser": Object {
        "first_name": "another 2",
        "last_name": "last",
        "password": "password",
        "username": "user",
      },
    }
`);
});
