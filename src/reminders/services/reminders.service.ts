import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReminderService {
  constructor(private readonly prisma: PrismaService) {}

  async createReminder(title: string, content: string) {
    try {
      const reminder = await this.prisma.createReminder(title, content);
      return reminder;
    } catch (err: any) {
      throw new Error(`Erro ao criar lembretes: ${err.message}`);
    }
  }
}
