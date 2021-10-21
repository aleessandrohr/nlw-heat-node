import { prismaClient } from "../prisma";

class ProfileUserService {
	public async execute(userId: string) {
		const user = await prismaClient.user.findFirst({
			where: {
				id: userId,
			},
		});

		return user;
	}
}

export { ProfileUserService };
