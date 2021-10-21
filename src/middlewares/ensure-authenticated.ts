import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { StatusCodesEnum } from "../types/enums/status-codes";

interface PayLoad {
	sub: string;
}

export const ensureAuthenticated = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const authToken = request.headers.authorization;

	if (!authToken) {
		return response.status(StatusCodesEnum.UNAUTHORIZED).json({
			errorCode: "token.invalid",
		});
	}

	const [, token] = authToken.split(" ");

	try {
		const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

		request.userId = sub;

		return next();
	} catch {
		return response.status(StatusCodesEnum.UNAUTHORIZED).json({
			errorCode: "token.invalid",
		});
	}
};
