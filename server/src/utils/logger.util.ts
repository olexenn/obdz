import { createLogger, format, transports } from "winston";
import * as path from "path";

const Logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../../logs/errors.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

export default Logger;
