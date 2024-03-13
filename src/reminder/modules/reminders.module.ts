import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ReminderService } from './reminders/services/reminders.service';
import { RemindersController } from './reminders/controllers/reminders.controller';

// modulos são como comodos da casa, então ele agrupa todas as coisas relacionadas ao reminder
@Module({
  providers: [PrismaService, ReminderService], // Injeta os serviços aqui
  controllers: [RemindersController],
  exports: [PrismaService, ReminderService], // Exporta os serviços para outros módulos
})
export class RemindersModule {}
