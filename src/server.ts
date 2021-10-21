import { server } from "./app";

const PORT = process.env.PORT;

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`));
