type ErrorResponseType = {
  status: number;
  message: string;
  response: Response;
};

export class ErrorResponse extends Error {
  public status: number;
  public message: string;
  public response: Response;

  constructor({ status, message, response }: ErrorResponseType) {
    super(message);
    this.status = status;
    this.message = message;
    this.response = response;
  }
}
