import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from "./app";

createConnection()
  .then(() => {
    const port = app.get("port");

    const server = app.listen(port, onListening);
    server.on("error", onError);

    function onError(error: NodeJS.ErrnoException) {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind = typeof port === "string" ? `pipe ${port}` : `port ${port}`;

      switch (error.code) {
        case "EACCES":
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
        case "EADDRINUSE":
          console.error(`${bind} is already in use`);
          process.exit(1);
        default:
          throw error;
      }
    }

    function onListening() {
      const addr = server.address();
      const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
      console.log(`Listening on ${bind}`);
    }
  })
  .catch((err: Error) => {
    console.error(err);
  });
