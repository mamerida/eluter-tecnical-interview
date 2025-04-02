import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountIdDto } from 'src/utils/validatos/accountIdValidator';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get(':account_id/balance')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBalance(@Param() params: AccountIdDto) {
    try {
      //here should be add an authentication logic to prevent expose the endpoint without security
      //for the MVP we ignore them to continue with the necesarry logic.
      const accountId = params.account_id;
      return await this.accountService.getBalance(accountId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
