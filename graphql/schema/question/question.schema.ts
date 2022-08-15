import { intArg, list, makeSchema, mutationType, nonNull, nullable, objectType, queryType, stringArg } from "nexus";
import { User } from "../user/user.schema";

export const Question = objectType({
	name: "Question",
	definition(t) {
		t.int("id");
		t.nonNull.string("text");
		t.nullable.string("media");
		t.int("creatorId");
		t.field("creator", {
			type: User,
		});
	},
});

const Query = queryType({
	definition(t) {
		t.field("questions", {
			type: list(Question),
			async resolve(_parent, args, context) {
				const response = await context.prisma.question.findMany({
					include: {
						creator: true,
					},
				});
				console.log(response);
				return response;
			},
		});
	},
});

const Mutation = mutationType({
	definition(t) {
		t.field("addQuestion", {
			type: Question,
			args: {
				text: nonNull(stringArg()),
				media: nullable(stringArg()),
				creatorId: nullable(intArg()),
			},
			async resolve(_parent, args, context) {
				return await context.prisma.question.create({
					data: args,
					include: {
						creator: true,
					},
				});
			},
		});
	},
});

const QuerySchema = makeSchema({
	types: [Question, Query, Mutation],
});

export default QuerySchema;
