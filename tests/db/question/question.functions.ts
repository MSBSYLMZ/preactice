import prisma from "../client";
import { Prisma } from "@prisma/client";

export async function createQuestion(question: Prisma.QuestionCreateInput) {
	return await prisma.question.create({
		data: question,
	});
}
