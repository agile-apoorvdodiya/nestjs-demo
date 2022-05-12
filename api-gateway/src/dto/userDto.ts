import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @ApiProperty()
  email: String;

  @ApiProperty()
  password: String;

  @ApiProperty()
  contact: String;

  @ApiProperty()
  name: String;

  @ApiProperty()
  admin: Boolean;

  @ApiProperty()
  document: String;
}
