import { booleanArg, extendType, inputObjectType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";

const QuestionOptionCreateArgs = {
	text: nonNull(stringArg()),
	media: nullable(stringArg()),
	correct: nonNull(booleanArg()),
	question_id: nonNull(intArg()),
};

const QuestionOptionUpdateArgs = { ...QuestionOptionCreateArgs, id: nullable(intArg()) };

export const QuestionOptionCreateInputs = inputObjectType({
	name: "QuestionOptionCreateInputs",
	definition(t) {
		t.nonNull.string("text"), t.nullable.string("media"), t.nonNull.boolean("correct");
	},
});

export const QuestionOption = objectType({
	name: "QuestionOption",
	definition(t) {
		t.int("id");
		t.nonNull.string("text");
		t.nullable.string("media");
		t.nonNull.boolean("correct");
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
			type: list("QuestionOption"),
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.questionOption.findUnique({
					id: args.id,
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
			args: { data: "QuestionOptionCreateInputs" },
			resolve(_parent, args, context) {
				return context.prisma.questionOption.create({
					data: args,
				});
			},
		});
		t.field("updateQuestionOption", {
			type: "QuestionOption",
			args: QuestionOptionUpdateArgs,
			resolve(_parent, args, context) {
				const id = args.id;
				delete args.id;
				return context.prisma.questionOption.update({
					where: {
						id,
					},
					data: args,
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
