import HttpException from "./HttpException";

class WrongCredentialException extends HttpException {
  constructor() {
    super(400, "Wrong Credentials Provided");
  }
}

export default WrongCredentialException;
