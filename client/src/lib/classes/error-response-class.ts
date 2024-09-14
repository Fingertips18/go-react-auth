type ErrorResponseType = {
  status: number;
  message: string;
};

export class ErrorResponse extends Error {
  public status: number;
  public message: string;

  constructor({ status, message }: ErrorResponseType) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
