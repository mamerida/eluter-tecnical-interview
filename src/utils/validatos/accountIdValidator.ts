import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class AccountIdDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'account_id must be a number' })
  @Min(1, { message: 'account_id must be greater than 0' })
  account_id: number;
}
