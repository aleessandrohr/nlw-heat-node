import { Router } from "express";

import { AuthenticateUserController } from "./controllers/authenticate-user-controller";
import { CreateMessageController } from "./controllers/create-message-controller";
import { GetLast5MessagesController } from "./controllers/get-5-last-messages-controller";
import { ProfileUserController } from "./controllers/profile-user-controller";

import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

const router = Router();

router.get("/github", (_, response) => {
	response.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
	);
});

router.get("/signin/callback", (request, response) => {
	const { code } = request.query;

	return response.json(code);
});

router.post("/authenticate", new AuthenticateUserController().handle);

router.post(
	"/messages",
	ensureAuthenticated,
	new CreateMessageController().handle,
);

router.get("/messages/last-5", new GetLast5MessagesController().handle);

router.get("/profile", new ProfileUserController().handle);

export { router };
