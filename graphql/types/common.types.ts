import { scalarType, enumType } from "nexus";

export const DateScalar = scalarType({
	name: "Date",
	asNexusMethod: "date",
	description: "Date custom scalar type",
	parseValue(value) {
		return new Date(value);
	},
	serialize(value) {
		return value.getTime();
	},
	parseLiteral(ast) {
		if (ast.kind === 'IntValue') {
			return new Date(ast.value);
		}
		return null;
	},
});

export const StatusEnumType = enumType({
	name: "Status",
	members: ["approved", "pending", "rejected"],
});

export const PrivacyEnumType = enumType({
	name: "Privacy",
	members: ["public", "private", "protected"],
});