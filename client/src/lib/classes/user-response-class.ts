import { UserDTO } from "@/lib/DTO/user-dto";

type UserResponseType = {
  message: string;
  user: UserDTO;
  response: Response;
};

export class UserResponse {
  public message: string;
  public user: UserDTO;
  public response: Response;

  constructor({ message, user, response }: UserResponseType) {
    this.message = message;
    this.user = user;
    this.response = response;
  }
}
