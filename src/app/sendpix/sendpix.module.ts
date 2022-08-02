import { Module } from '@nestjs/common';
import { SendpixService } from './sendpix.service';
import { SendpixController } from './sendpix.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SendpixController],
  providers: [SendpixService],
})
export class SendpixModule {}
