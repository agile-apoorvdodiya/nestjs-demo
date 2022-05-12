import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  status: String;

  @ApiProperty()
  error: String;

  @ApiProperty()
  message: String;

  @ApiProperty()
  success: Boolean;
}
