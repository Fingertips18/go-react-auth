import { UserDTO } from "@/lib/DTO/user-dto";

type UserResponseType = {
  message: string;
  user: UserDTO;
};

export class UserResponse {
  public message: string;
  public user: UserDTO;

  constructor({ message, user }: UserResponseType) {
    this.message = message;
    this.user = user;
  }
}
