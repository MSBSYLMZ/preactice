import { objectType, queryType, list, mutationType, nullable, nonNull, stringArg, makeSchema, intArg } from "nexus";
import QuerySchema, { Question } from "../question/question.schema";

export const User = objectType({
	name: "User",
	definition(t) {
		t.int("id"), t.nonNull.string("username");
		t.nonNull.string("first_name");
		t.nonNull.string("last_name");
		t.nonNull.string("password");
		t.string("email");
		t.string("bio");
		t.string("profile_photo");
		t.string("date_of_birth");
	},
});

const Query = queryType({
	definition(t) {
		t.field("users", {
			type: list(User),
			async resolve(_parent, args, context) {
				return await context.prisma.question.findMany();
			},
		});
		t.field("user", {
			type: User,
			args: {
				id: nonNull(intArg()),
			},
			async resolve(_parent, args, context) {
				return await context.prisma.user.findUnique({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});

const Mutation = mutationType({
	definition(t) {
		t.field("createUser", {
			type: User,
			args: {
				username: nonNull(stringArg()),
				first_name: nonNull(stringArg()),
				last_name: nonNull(stringArg()),
				password: nonNull(stringArg()),
				email: nullable(stringArg()),
				date_of_birth: nullable(stringArg()),
				bio: nullable(stringArg()),
				profile_photo: nullable(stringArg()),
			},
		});
	},
});

const UserSchema = makeSchema({
	types: [User, Query, Mutation],
});

export default UserSchema;
