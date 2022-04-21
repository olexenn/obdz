import { IsOptional, IsString } from "class-validator";

class RegisterDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  @IsOptional()
  public role: string;
}

export default RegisterDto;
