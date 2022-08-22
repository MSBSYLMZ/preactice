import { Prisma } from "@prisma/client";
import { booleanArg, extendType, inputObjectType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";

export const QuestionOptionCreateInputs = inputObjectType({
	name: "QuestionOptionCreateInputs",
	definition(t) {
		t.nonNull.string("text");
		t.nullable.string("media");
		t.nullable.boolean("correct");
		t.nonNull.int("question_id");
	},
});

// export const QuestionOptionCreateInputs = {
// 	text: nonNull(stringArg()),
// 	media: nullable(stringArg()),
// 	correct: nullable(booleanArg()),
// 	question_id: nonNull(intArg()),
// };

// const QuestionOptionUpdateInputs = { ...QuestionOptionCreateInputs, id: nonNull(intArg()) };
export const QuesitonOptionUpdateInputs = inputObjectType({
	name: "QuestionOptionUpdateInputs",
	definition(t) {
		t.nullable.int("id");
		t.nullable.string("media");
		t.nonNull.boolean("correct");
		t.nonNull.int("question_id");
	},
});

export const QuestionOption = objectType({
	name: "QuestionOption",
	definition(t) {
		t.int("id");
		t.nonNull.string("text");
		t.nullable.string("media");
		t.nonNull.boolean("correct");
		t.nonNull.int("question_id");
		t.field("question", {
			type: "Question",
			resolve(_parent, args, context) {
				return context.prisma.question.findUnique({
					where: {
						id: _parent.question_id,
					},
				});
			},
		});
	},
});

export const questionOptionQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("questionOption", {
			type: "QuestionOption",
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.questionOption.findUnique({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});

export const questionOptionMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("addQuestionOption", {
			type: "QuestionOption",
			args: {
				data: QuestionOptionCreateInputs
			},
			resolve(_parent, args, context) {
				console.log(args);
				return context.prisma.questionOption.create({
					data: args.data as Prisma.QuestionOptionUncheckedCreateInput,
				});
			},
		});
		t.field("updateQuestionOption", {
			type: "QuestionOption",
			args: {
				data: QuesitonOptionUpdateInputs,
			},
			resolve(_parent, args, context) {
				const id = args.data.id as number;
				delete args.data.id;
				return context.prisma.questionOption.update({
					where: {
						id,
					},
					data: args.data as Prisma.QuestionOptionUncheckedUpdateInput,
				});
			},
		});
		t.field("deleteQuestionOption", {
			type: "QuestionOption",
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.questionOption.delete({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});
