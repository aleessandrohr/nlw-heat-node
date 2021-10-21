import { prismaClient } from "../prisma";

class GetLast5MessagesService {
	public async execute() {
		const messages = await prismaClient.message.findMany({
			take: 5,
			orderBy: {
				createdAt: "desc",
			},
			include: {
				user: true,
			},
		});

		return messages;
	}
}

export { GetLast5MessagesService };
