import { Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ReminderService } from '../services/reminders.service';

@Module({
  providers: [PrismaService, ReminderService], // Injeta os serviços aqui
  exports: [PrismaService, ReminderService], // Exporta os serviços para outros módulos
})
export class RemindersModule {}
