import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class CreateFormDto {
  
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  form: Object;
}
