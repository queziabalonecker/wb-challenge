import { Controller, Get, Post, Body } from '@nestjs/common';
import { SendpixService } from './sendpix.service';

@Controller('api/pix')
export class SendpixController {
  constructor(private readonly sendpixService: SendpixService) {}

  @Get('pendent-transactions')
  async getTransactions() {
    return await this.sendpixService.getPendentTransactions();
  }

  @Get('banks-info')
  async getBanksInfo() {
    return await this.sendpixService.getBanksInfo();
  }

  @Post('send-transaction')
  async sendTransaction(@Body() email: string) {
    return await this.sendpixService.sendPix(email);
  }
}
