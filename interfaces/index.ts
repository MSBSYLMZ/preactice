import { PrismaClient, Prisma } from "@prisma/client";

export interface Props {
	className?: string;
}

export type DBType = PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

export interface QuestionType {
	id?: number;
	text: string;
	media?: string;
	creator?: {
		id: number;
		first_name: string;
		last_name: string;
	};
}
