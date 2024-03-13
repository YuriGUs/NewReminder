import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';
import { Prisma, Reminder } from '@prisma/client';

@Injectable()
export class ReminderService {
  // Injeta o PrismaService no construtor para que possamos usá-lo para interagir com o banco de dados
  constructor(private readonly prisma: PrismaService) {}

  // Cria um novo lembrete no banco de dados com o título e conteúdo fornecidos
  async createReminder(data: {
    title: string;
    content: string;
  }): Promise<Reminder> {
    return this.prisma.reminder.create({ data });
  }

  // Busca todos os lembretes no banco de dados
  async listAllReminders(): Promise<Reminder[]> {
    return this.prisma.reminder.findMany();
  }

  // Busca um lembrete específico no banco de dados pelo seu ID
  async listUniqReminder(id: number): Promise<Reminder | null> {
    return this.prisma.reminder.findUnique({
      where: { id },
    });
  }

  // Deleta um lembrete específico do banco de dados pelo seu ID
  async deleteReminder(id: number): Promise<Reminder> {
    return this.prisma.reminder.delete({ where: { id } });
  }

  // Deleta todos os lembretes do banco de dados
  async deleteAllReminders(): Promise<Prisma.BatchPayload> {
    return this.prisma.reminder.deleteMany();
  }

  // Atualiza um lembrete específico no banco de dados pelo seu ID
  async updateReminder(params: {
    id: number;
    title: string;
    content: string;
  }): Promise<Reminder> {
    // Desestrutura o objeto params para separar o id do restante dos dados
    const { id, ...data } = params;
    // Atualiza o lembrete no banco de dados com o novo título e conteúdo
    return this.prisma.reminder.update({
      where: { id },
      data,
    });
  }
}
