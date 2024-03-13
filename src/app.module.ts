import { Module } from '@nestjs/common';
import { RemindersModule } from './reminder/modules/reminders.module';

@Module({
  imports: [RemindersModule],
})
export class AppModule {}
