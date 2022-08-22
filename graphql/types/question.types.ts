import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg, inputObjectType, enumType } from "nexus";
import { isEmpty } from "../../utils";
import { Question as QuestionPrisma, QuestionOption as QuestionOptionPrisma, Prisma } from "@prisma/client";
import { generateWhereStatement } from "../../utils/query";
import { PrivacyEnumType, StatusEnumType } from "./common.types";

const DEFAULT_LIMIT = 16;

const QuestionCreateInputs = {
	text: nonNull(stringArg()),
	media: nullable(stringArg()),
	creator_id: nullable(intArg()),
	status: arg({
		type: nullable(StatusEnumType),
		default: "pending",
	}),
	privacy: arg({
		type: nullable(PrivacyEnumType),
		default: "private",
	}),
	options: arg({
		type: nonNull(list("QuestionOptionCreateInputs")),
	}),

	// text: nonNull(stringArg()),
	// 		media: nullable(stringArg()),
	// 		creator_id: nullable(intArg()),
	// 		status: arg({
	// 			type: "Status",
	// 		}),
	// 		privacy: arg({
	// 			type: nonNull("Privacy"),
	// 			default: "public",
	// 		}),
};

const QuestionUpdateInputs = { ...QuestionCreateInputs, id: nullable(intArg()) };

export const Question = objectType({
	name: "Question",
	definition(t) {
		t.int("id");
		t.nonNull.string("text");
		t.nullable.string("media");
		t.nullable.int("creator_id");
		t.nullable.field("status", { type: "Status" });
		t.nullable.field("privact", { type: "Privacy" });
		t.nullable.field("creator", {
			type: "User",
			resolve(_parent, args, context) {
				if (!_parent.creator_id) return null;
				return context.prisma.user.findUnique({
					where: {
						id: _parent.creator_id,
					},
				});
			},
		});
		t.list.nonNull.field("options", {
			type: "QuestionOption",
			resolve(_parent, args, context) {
				return context.prisma.questionOption.findMany({
					where: {
						question_id: _parent.id as number,
					},
				});
			},
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
				privacy: arg({
					type: nullable(PrivacyEnumType),
				}),
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
				status: arg({
					type: StatusEnumType,
				}),
				privacy: arg({
					type: nullable(PrivacyEnumType),
				}),
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
			args: QuestionCreateInputs,
			// validate: ({ string }) => ({
			// 	text: string().min(30),
			// }),

			resolve(_parent, { options, ...rest }, context) {
				const creationData: Prisma.QuestionUncheckedCreateInput = {
					...rest,
					options: {
						createMany: {
							data: options as QuestionOptionPrisma[],
						},
					},
				};
				return context.prisma.question.create({
					data: creationData,
					include: {
						options: true,
					},
				});
			},
		});

		t.field("updateQuestion", {
			type: Question,
			args: QuestionUpdateInputs,
			resolve(_parent, args, context) {
				const id = args.id as number;
				delete args.id;
				return context.prisma.question.update({
					where: {
						id,
					},
					data: args as QuestionPrisma,
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
