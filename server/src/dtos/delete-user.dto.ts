import { IsNumber } from "class-validator";

class DeleteUserDto {
  @IsNumber()
  public userId: number;
}

export default DeleteUserDto;
