import { PrismaClient } from "@prisma/client";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import prisma from "../lib/prisma";

export type Context = {
	prisma: PrismaClient;
	req: MicroRequest;
	res: ServerResponse;
};

export type ContextArguments = {
	req: MicroRequest;
	res: ServerResponse;
};

export async function createContext({ req, res }: ContextArguments): Promise<Context> {
	return {
		prisma,
		req,
		res,
	};
}
