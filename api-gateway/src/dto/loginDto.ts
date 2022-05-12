import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: String;

  @ApiProperty()
  password: String;
}
