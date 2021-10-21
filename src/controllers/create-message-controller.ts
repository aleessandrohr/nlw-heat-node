import { Request, Response } from "express";

import { CreateMessageService } from "../services/create-message-service";

class CreateMessageController {
	public async handle(request: Request, response: Response) {
		const { message } = request.body;
		const { userId } = request;

		const service = new CreateMessageService();

		const result = await service.execute(message, userId);

		return response.json(result);
	}
}

export { CreateMessageController };
