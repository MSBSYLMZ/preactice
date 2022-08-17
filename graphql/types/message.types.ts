// import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
// import { isEmpty } from "utils";

// const MessageCreateArgs = {
// 	sender_id: nonNull(intArg()),
// 	recipient_id: nonNull(intArg()),
// 	message: nonNull(stringArg()),
// 	seen: nullable(booleanArg()),
// 	received: nullable(booleanArg()),
// 	received_date: nullable(stringArg()),
// 	seen_date: nullable(stringArg()),
// };

// const QuestionUpdateArgs = { ...MessageCreateArgs, id: nullable(intArg()) };

// export const Question = objectType({
// 	name: "Message",
// 	definition(t) {
// 		t.int("id");
// 		t.nonNull.string("text");
// 		t.nullable.string("media");
// 		t.nullable.int("creator_id");
// 		t.nullable.string("status");
// 		t.nullable.string("privacy");
// 		t.field("creator", {
// 			type: "User",
// 			resolve(_parent, args, context) {
// 				if (!_parent.creator_id) return null;
// 				return context.prisma.user.findUnique({
// 					where: {
// 						id: _parent.creator_id,
// 					},
// 				});
// 			},
// 		});
// 	},
// });

// export const questionQuery = extendType({
// 	type: "Query",
// 	definition(t) {
// 		t.field("questions", {
// 			type: list(Question),
// 			args: {
// 				text: nullable(stringArg()),
// 				creator_id: nullable(intArg()),
// 				status: nullable(intArg()),
// 				privacy: nullable(intArg()),
// 			},
// 			resolve(_parent, args, context) {
// 				const options = isEmpty(args) ? {} : { where: args };
// 				return context.prisma.question.findMany(options);
// 			},
// 		});

// 		t.field("question", {
// 			type: Question,
// 			args: {
// 				id: nonNull(intArg()),
// 			},
// 			resolve(_parent, args, context) {
// 				return context.prisma.question.findUnique({
// 					where: {
// 						id: args.id,
// 					},
// 				});
// 			},
// 		});
// 	},
// });

// export const questionMutation = extendType({
// 	type: "Mutation",
// 	definition(t) {
// 		t.field("addQuestion", {
// 			type: Question,
// 			args: QuestionCreateArgs,
// 			resolve(_parent, args, context) {
// 				return context.prisma.question.create({
// 					data: args,
// 				});
// 			},
// 		});
// 		t.field("updateQuestion", {
// 			type: Question,
// 			args: QuestionUpdateArgs,
// 			resolve(_parent, args, context) {
// 				const id = args.id;
// 				delete args.id;
// 				return context.prisma.question.update({
// 					where: {
// 						id,
// 					},
// 					data: args,
// 				});
// 			},
// 		});
// 		t.field("deleteQuestion", {
// 			type: Question,
// 			args: {
// 				id: nonNull(intArg()),
// 			},
// 			resolve(_parent, args, context) {
// 				return context.prisma.question.delete({
// 					where: {
// 						id: args.id,
// 					},
// 				});
// 			},
// 		});
// 	},
// });
