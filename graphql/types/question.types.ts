import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg, inputObjectType } from "nexus";
import { isEmpty } from "utils";
import { Question as QuestionPrisma, QuestionOption as QuestionOptionPrisma } from "@prisma/client";
import { QuestionOptionCreateInputs } from "./question-option.types";
import { generateWhereStatement } from "utils/query";

const QuestionCreateArgs = {
	text: nonNull(stringArg()),
	media: nullable(stringArg()),
	creator_id: nullable(intArg()),
	status: nullable(stringArg()),
	privacy: nullable(stringArg()),
};

const DEFAULT_LIMIT = 16;

const QuestionUpdateArgs = { ...QuestionCreateArgs, id: nullable(intArg()) };

export const Question = objectType({
	name: "Question",
	definition(t) {
		t.int("id");
		t.nonNull.string("text");
		t.nullable.string("media");
		t.nullable.int("creator_id");
		t.nullable.string("status");
		t.nullable.string("privacy");
		t.field("creator", {
			type: "User",
			// resolve(_parent, args, context) {
			// 	if (!_parent.creator_id) return null;
			// 	return context.prisma.user.findUnique({
			// 		where: {
			// 			id: _parent.creator_id,
			// 		},
			// 	});
			// },
		});
		t.list.nonNull.field("options", {
			type: "QuestionOption",
			// resolve(_parent, args, context) {
			// 	return context.prisma.questionOption.findMany({
			// 		where: {
			// 			question_id: _parent.id,
			// 		},
			// 	});
			// },
		});
	},
});

export const questionQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("questions", {
			type: list(Question),
			args: {
				text: nullable(stringArg()),
				creator_id: nullable(intArg()),
				status: nullable(intArg()),
				privacy: nullable(intArg()),
			},
			resolve(_parent, args, context) {
				const whereOptions = isEmpty(args) ? null : { where: args };
				return context.prisma.question.findMany({
					...(whereOptions as {}),
					include: {
						options: true,
					},
				});
			},
		});

		t.field("getRandomQuestions", {
			type: list(Question),
			args: {
				text: nullable(stringArg()),
				creator_id: nullable(intArg()),
				status: nullable(intArg()),
				privacy: nullable(intArg()),
				limit: nullable(intArg()),
			},
			async resolve(_parent, args, context) {
				let limit;
				let whereStatement;
				if (args.limit) {
					limit = args.limit;
					delete args.limit;
				}
				if (!isEmpty(args)) {
					whereStatement = generateWhereStatement(args);
				}
				let questions;
				if (whereStatement) {
					questions = await context.prisma.$queryRaw<QuestionPrisma[]>`SELECT id FROM "public"."Question" ${
						whereStatement ? whereStatement : null
					} ORDER BY random() LIMIT ${args.limit ?? DEFAULT_LIMIT}`;
				} else {
					questions = await context.prisma.$queryRaw<QuestionPrisma[]>`SELECT id FROM "public"."Question" ORDER BY random() LIMIT ${
						limit ?? DEFAULT_LIMIT
					}`;
				}

				const questionIds = questions.map((question: { id: number }) => question.id);
				console.log(questions);
				const result = await context.prisma.question.findMany({
					where: {
						id: {
							in: questionIds,
						},
					},
					include: {
						options: true,
					},
				});
				return result;
			},
		});

		t.field("question", {
			type: Question,
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.question.findUnique({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});

export const questionMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("addQuestion", {
			type: Question,
			args: {
				text: nonNull(stringArg()),
				media: nullable(stringArg()),
				creator_id: nullable(intArg()),
				status: nullable(stringArg()),
				privacy: nullable(stringArg()),
				options: arg({
					type: nonNull(list("QuestionOptionCreateInputs")),
				}),
			},
			validate: ({ string }) => ({
				text: string().min(30),
			}),

			resolve(_parent, { options, ...rest }, context) {
				return context.prisma.question.create({
					data: {
						...rest,
						options: {
							createMany: {
								data: options,
							},
						},
					},
					include: {
						options: true,
					},
				});
			},
		});

		t.field("updateQuestion", {
			type: Question,
			args: QuestionUpdateArgs,
			resolve(_parent, args, context) {
				const id = args.id as number;
				delete args.id;
				return context.prisma.question.update({
					where: {
						id,
					},
					data: args,
				});
			},
		});
		t.field("deleteQuestion", {
			type: Question,
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.question.delete({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});
