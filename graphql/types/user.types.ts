import { Prisma } from "@prisma/client";
import { objectType, queryType, list, mutationType, nullable, nonNull, stringArg, makeSchema, intArg, extendType } from "nexus";

const UserCreateInputs = {
	username: nonNull(stringArg()),
	first_name: nonNull(stringArg()),
	last_name: nonNull(stringArg()),
	password: nonNull(stringArg()),
	email: nullable(stringArg()),
	date_of_birth: nullable(stringArg()),
	bio: nullable(stringArg()),
	profile_photo: nullable(stringArg()),
};

const UserUpdateInputs = { ...UserCreateInputs, id: nonNull(intArg()) };

export const User = objectType({
	name: "User",
	definition(t) {
		t.nonNull.int("id");
		t.nonNull.string("username");
		t.nonNull.string("first_name");
		t.nonNull.string("last_name");
		t.nonNull.string("password");
		t.nullable.string("email");
		t.nullable.string("bio");
		t.nullable.string("profile_photo");
		t.nullable.field("date_of_birth", { type: "Date" });
		t.field("gallery", {
			type: "Gallery",
			resolve(_parent, args, context) {
				return context.prisma.gallery.findUnique({
					where: {
						owner_id: _parent.id,
					},
				});
			},
		});
		t.field("questions", {
			type: list("Question"),
			resolve(_parent, args, context) {
				return context.prisma.question.findMany({
					where: {
						creator_id: _parent.id,
					},
				});
			},
		});
	},
});

export const userQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("users", {
			type: list(User),
			resolve(_parent, args, context) {
				return context.prisma.user.findMany();
			},
		});
		t.field("user", {
			type: User,
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.user.findUnique({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});

export const userMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("createUser", {
			type: User,
			args: UserCreateInputs,
			resolve(_parent, args, context) {
				return context.prisma.user.create({
					data: {
						...args,
						gallery: {
							create:{}
						}
					},
					include: {
						gallery: true,
					},
				});
			},
		});
	},
});
