import { Request, Response } from "express";

import { ProfileUserService } from "../services/profile-user-service";

class ProfileUserController {
	public async handle(request: Request, response: Response) {
		const { userId } = request;

		const service = new ProfileUserService();

		const result = await service.execute(userId);

		return response.json(result);
	}
}

export { ProfileUserController };
