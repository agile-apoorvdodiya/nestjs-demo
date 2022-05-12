import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty()
  status: String;

  @ApiProperty()
  error: String;

  @ApiProperty()
  message: String;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: Object;

  @ApiProperty()
  file: Object;
}
