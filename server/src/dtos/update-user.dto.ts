import { IsNumber, IsString } from "class-validator";

class UpdateUserDto {
  @IsNumber()
  public userId: number;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export default UpdateUserDto;
