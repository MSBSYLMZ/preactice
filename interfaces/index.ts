import { PrismaClient, Prisma } from "@prisma/client";
import { MouseEventHandler } from "react";

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

export interface IAlertButton {
	onClick: MouseEventHandler<HTMLButtonElement>;
	text: string;
	className: string;
}
