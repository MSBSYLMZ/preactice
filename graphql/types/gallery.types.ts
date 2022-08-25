import { Prisma } from "@prisma/client";
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
		t.nonNull.int("owner_id");
		t.field("owner", {
			type: "User",
			resolve(_parent, args, context) {
				if (!_parent.owner_id) return null;
				return context.prisma.user.findUnique({
					where: {
						id: _parent.owner_id,
					},
				});
			},
		});
	},
});

export const galleryQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("gallery", {
			type: "Gallery",
			args: GalleryCreateArgs,
			resolve(_parent, args, context) {
				const options = isEmpty(args) ? {} : { where: args };
				return context.prisma.gallery.findUnique(options as Prisma.GalleryFindUniqueArgs);
			},
		});
	},
});
