import { ApiProperty } from '@nestjs/swagger';

// TODO add validations
export class UserRequestDto {
  @ApiProperty()
  id: String;

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
