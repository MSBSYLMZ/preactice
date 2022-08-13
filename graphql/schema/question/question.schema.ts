import { list, makeSchema, mutationType, nonNull, nullable, objectType, queryType, stringArg } from "nexus";

export const Question = objectType({
	name: "Question",
	definition(t) {
		t.int("id");
		t.nonNull.string("text");
		t.nullable.string("media");
	},
});

const Query = queryType({
	definition(t) {
		t.field("questions", {
			type: list(Question),
			async resolve(_parent, args, context) {
				return await context.prisma.question.findMany();
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
			},
			async resolve(_parent, args, context) {
				return await context.prisma.question.create({ data: args });
			},
		});
	},
});

const QuerySchema = makeSchema({
	types: [Question, Query, Mutation],
});

export default QuerySchema;
