import { IsOptional, IsString } from "class-validator";

class CreateExtractDto {
  @IsString()
  public number: string;

  @IsString()
  public qualification: string;

  @IsString()
  public applicantFirstName: string;

  @IsString()
  public applicantLastName: string;

  @IsString()
  public description: string;

  @IsString()
  @IsOptional()
  public suspect: string;

  @IsString()
  public authority: string;

  @IsString()
  public username: string;
}

export default CreateExtractDto;
