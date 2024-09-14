type GenericResponseType = {
  message: string;
};

export class GenericResponse {
  public message: string;

  constructor({ message }: GenericResponseType) {
    this.message = message;
  }
}
