import { Module } from '@nestjs/common';
import { SendpixModule } from './app/sendpix/sendpix.module';

@Module({
  imports: [SendpixModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
