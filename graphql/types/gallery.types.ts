import { extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { isEmpty } from "../../utils";

const GalleryCreateArgs = {
	owner_id: nonNull(intArg()),
};

const GalleryUpdateArgs = { ...GalleryCreateArgs, id: nullable(intArg()) };

export const Gallery = objectType({
	name: "Gallery",
	definition(t) {
		t.int("id");
		t.field("owner", {
			type: "User",
			resolve(_parent, args, context) {
				if (!_parent.creator_id) return null;
				return context.prisma.user.findUnique({
					where: {
						id: _parent.owner_id,
					},
				});
			},
		});
	},
});

export const questionQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("gallery", {
			type: "Gallery",
			args: GalleryCreateArgs,
			resolve(_parent, args, context) {
				const options = isEmpty(args) ? {} : { where: args };
				return context.prisma.gallery.findUnique(options);
			},
		});
	},
});

// export const questionMutation = extendType({
// 	type: "Mutation",
// 	definition(t) {
// 		t.field("addClassroom", {
// 			type: Gallery,
// 			args: GalleryCreateArgs,
// 			resolve(_parent, args, context) {
// 				return context.prisma.Gallery.create({
// 					data: args,
// 				});
// 			},
// 		});
// 		t.field("updateClassroom", {
// 			type: Gallery,
// 			args: GalleryUpdateArgs,
// 			resolve(_parent, args, context) {
// 				const id = args.id;
// 				delete args.id;
// 				return context.prisma.Gallery.update({
// 					where: {
// 						id,
// 					},
// 					data: args,
// 				});
// 			},
// 		});
// 		t.field("deleteClassroom", {
// 			type: Gallery,
// 			args: {
// 				id: nonNull(intArg()),
// 			},
// 			resolve(_parent, args, context) {
// 				return context.prisma.Gallery.delete({
// 					where: {
// 						id: args.id,
// 					},
// 				});
// 			},
// 		});
// 	},
// });
