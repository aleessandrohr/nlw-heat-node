import { prismaClient } from "../prisma";

import { io } from "../app";

class CreateMessageService {
	public async execute(text: string, userId: string) {
		const message = await prismaClient.message.create({
			data: {
				text,
				userId,
			},
			include: {
				user: true,
			},
		});

		const infoWS = {
			id: message.id,
			text: message.text,
			userId: message.userId,
			createdAt: message.createdAt,
			user: {
				name: message.user.name,
				avatarUrl: message.user.avatarUrl,
			},
		};

		io.emit("new-message", infoWS);

		return message;
	}
}

export { CreateMessageService };
