import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  AccountIdDto,
  TransactionDto,
} from 'src/utils/validatos/accountIdValidator';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get(':account_id/balance')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBalance(@Param() params: AccountIdDto) {
    try {
      //here should be add an authentication logic to prevent expose the endpoint without security
      //for the MVP we ignore them to continue with the necessary logic.
      const accountId = params.account_id;
      return await this.accountService.getBalance(accountId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Post(':account_id/tranfer')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(200)
  async makeTransaction(
    @Param() params: AccountIdDto,
    @Body() body: TransactionDto,
  ) {
    try {
      //here should be add an authentication logic to prevent expose the endpoint without security
      //for the MVP we ignore them to continue with the necessary logic.
      const accountId = params.account_id;
      const { originAccount, mount } = body;
      return await this.accountService.makeTransaction(
        accountId,
        originAccount,
        mount,
      );
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `An unexpected error occurred ${errorMessage}`,
      );
    }
  }
}
