import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
	var prisma: PrismaClient | null;
}

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient({
		log: ["query", "info", "warn", "error"],
	});
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient({
			log: ["query", "info", "warn", "error"],
		});
	}
	prisma = global.prisma;
}
prisma.$use(async (params, next) => {
	const before = Date.now();

	const result = await next(params);

	const after = Date.now();

	console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
	return result;
});

export default prisma;
