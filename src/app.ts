import cors from "cors";

import "configs/env";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", socket => {
	// eslint-disable-next-line no-console
	console.log(`User connected on socket ${socket.id}`);
});

export { server, io };
