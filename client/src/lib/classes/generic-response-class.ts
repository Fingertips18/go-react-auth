type GenericResponseType = {
  message: string;
  response: Response;
};

export class GenericResponse {
  public message: string;
  public response: Response;

  constructor({ message, response }: GenericResponseType) {
    this.message = message;
    this.response = response;
  }
}
