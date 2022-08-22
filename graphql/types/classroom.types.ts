import { Prisma } from "@prisma/client";
import { extendType, inputObjectType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { isEmpty } from "../../utils";

const ClassroomCreateInputs = {
	name: nullable(stringArg()),
	description: nullable(stringArg()),
	privacy: nullable(stringArg()),
	creator_id: nullable(intArg()),
};

const ClassroomUpdateInputs = { ...ClassroomCreateInputs, id: nonNull(intArg()) };

// export const ClassroomCrateInputs = inputObjectType({
// 	name: "ClassroomCreateInputs",
// 	definition(t) {
// 		t.nullable.string("name");
// 		t.nullable.string("description");
// 		t.nullable.field("privacy", { type: "Privacy" });
// 		t.nonNull.int("creator_id");
// 	},
// });

// export const ClassroomUpdateInputs = inputObjectType({
// 	name: "ClassroomUpdateInputs",
// 	definition(t) {
// 		t.nullable.string("name");
// 		t.nullable.string("description");
// 		t.nullable.field("privacy", { type: "Privacy" });
// 		t.nonNull.int("creator_id");
// 	},
// });

// const ClassroomUpdateArgs = { ...ClassroomCreateArgs, id: nullable(intArg()) };

export const Classroom = objectType({
	name: "Classroom",
	definition(t) {
		t.int("id");
		t.nonNull.string("name");
		t.nullable.string("description");
		t.nullable.string("privacy");
		t.nonNull.int("creator_id");
		t.field("creator", {
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
	},
});

export const classroomQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("classrooms", {
			type: list(Classroom),
			args: {},
			resolve(_parent, args, context) {
				const options = isEmpty(args) ? {} : { where: args };
				return context.prisma.classroom.findMany(options as Prisma.ClassroomFindManyArgs);
			},
		});

		t.field("classroom", {
			type: Classroom,
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.classroom.findUnique({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});

export const classroomMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("addClassroom", {
			type: Classroom,
			args: ClassroomCreateInputs,
			resolve(_parent, args, context) {
				return context.prisma.classroom.create({
					data: args,
				});
			},
		});
		t.field("updateClassroom", {
			type: Classroom,
			args: ClassroomUpdateInputs,
			resolve(_parent, args, context) {
				const id = args.id;
				delete args.id;
				return context.prisma.classroom.update({
					where: {
						id,
					},
					data: args,
				});
			},
		});
		t.field("deleteClassroom", {
			type: Classroom,
			args: {
				id: nonNull(intArg()),
			},
			resolve(_parent, args, context) {
				return context.prisma.classroom.delete({
					where: {
						id: args.id,
					},
				});
			},
		});
	},
});
