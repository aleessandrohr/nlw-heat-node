import { Request, Response } from "express";

import { AuthenticateUserService } from "../services/authenticate-user-service";

export class AuthenticateUserController {
	public async handle(request: Request, response: Response) {
		const { code } = request.body;

		const service = new AuthenticateUserService();

		try {
			const result = await service.execute(code);

			return response.json(result);
		} catch (error) {
			return response.json({ error: error.message });
		}
	}
}
