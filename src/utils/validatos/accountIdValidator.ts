import { Transform } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

export class AccountIdDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'account_id must be a number' })
  @Min(1, { message: 'account_id must be greater than 0' })
  account_id: number;
}

export class TransactionDto {
  @IsInt({ message: 'originAccount must be a number' })
  originAccount: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'mount must be a valid number' },
  )
  @Min(0.01, { message: 'mount must be greater than 0' })
  mount: number;
}
