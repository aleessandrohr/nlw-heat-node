/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";
import { sign } from "jsonwebtoken";

import { prismaClient } from "../prisma";

interface IAccessTokenResponse {
	access_token: string;
}

interface IUserResponse {
	id: number;
	login: string;
	name: string;
	avatar_url: string;
}

export class AuthenticateUserService {
	public async execute(code: string) {
		const { data: accessTokenResponse } =
			await axios.post<IAccessTokenResponse>(
				"https://github.com/login/oauth/access_token",
				null,
				{
					params: {
						// eslint-disable-next-line camelcase
						client_id: process.env.GITHUB_CLIENT_ID,
						// eslint-disable-next-line camelcase
						client_secret: process.env.GITHUB_CLIENT_SECRET,
						code,
					},
					headers: {
						Accept: "application/json",
					},
				},
			);

		const { data: userResponse } = await axios.get<IUserResponse>(
			"https://api.github.com/user",
			{
				headers: {
					authorization: `Bearer ${accessTokenResponse.access_token}`,
				},
			},
		);

		const { id, login, name, avatar_url: avatarUrl } = userResponse;

		let user = await prismaClient.user.findFirst({
			where: {
				githubId: id,
			},
		});

		if (!user) {
			user = await prismaClient.user.create({
				data: {
					githubId: id,
					login,
					name,
					avatarUrl,
				},
			});
		}

		const token = sign(
			{
				user: {
					id: user.id,
					name: user.name,
					avatarUrl: user.avatarUrl,
				},
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: "1d",
			},
		);

		return { user, token };
	}
}
