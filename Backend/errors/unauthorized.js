import { CustomAPIError } from "./custom-api";
import StatusCodes from "http-status-codes";

export class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
