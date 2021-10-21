import { Request, Response } from "express";

import { GetLast5MessagesService } from "../services/get-last-5-messages-service";

class GetLast5MessagesController {
	public async handle(request: Request, response: Response) {
		const service = new GetLast5MessagesService();

		const result = await service.execute();

		return response.json(result);
	}
}

export { GetLast5MessagesController };
