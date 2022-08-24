import { Prisma } from "@prisma/client";
import { booleanArg, extendType, inputObjectType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";

export const QuestionOptionCreateInputs = inputObjectType({
	name: "QuestionOptionCreateInputs",
	definition(t) {
		t.nonNull.string("text");
		t.nullable.string("media");
		t.nullable.boolean("correct");
	},
});

const QuestionOptionCreateArgs = {
	text: nonNull(stringArg()),
	media: nullable(stringArg()),
	correct: nullable(booleanArg()),
	question_id: nonNull(intArg()),
};

const QuestionOptionUpdateArgs = { ...QuestionOptionCreateArgs, id: nonNull(intArg()) };

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
			args: QuestionOptionCreateArgs,
			resolve(_parent, args, context) {
				console.log(args);
				return context.prisma.questionOption.create({
					data: args as Prisma.QuestionOptionUncheckedCreateInput,
				});
			},
		});
		t.field("updateQuestionOption", {
			type: "QuestionOption",
			args: QuestionOptionUpdateArgs,
			resolve(_parent, args, context) {
				return context.prisma.questionOption.update({
					where: {
						id: args.id,
					},
					data: args as Prisma.QuestionOptionUncheckedUpdateInput,
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
