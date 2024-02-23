import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Serviço para interagir com o banco de dados usando o Prisma.
 * @remarks
 * Este serviço encapsula a lógica de acesso ao banco de dados e fornece métodos para outro arquivo
 * para criar, ler, atualizar e excluir lembretes.
 */
@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  /**
   * Construtor da classe PrismaService.
   * @remarks
   * Inicializa uma instância do PrismaClient para se conectar ao banco de dados.
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Cria um novo lembrete no banco de dados.
   * @param title - O título do lembrete.
   * @param content - O conteúdo do lembrete.
   * @returns Uma instância do lembrete criado.
   * @throws Um erro se ocorrer algum problema durante a criação do lembrete.
   */
  async createReminder(title: string, content: string) {
    try {
      const reminder = await this.prisma.reminder.create({
        data: {
          title,
          content,
        },
      });
      return reminder;
    } catch (error: any) {
      throw new Error(`Erro ao criar lembretes: ${error.message}`);
    }
  }
}

/*
 * *Entendimento próprio
 *
 * De certa forma esta class está fazendo o contato com o servidor para CRUD
 * Diferente do express, aqui eu posso fazer com que o arquivo reminderService
 * e o arquivo PrismaService se comuniquem, o PrismaService fornece o contato com o BD
 * e o ReminderService utiliza desse meio como se fosse o controller utilizando do Service
 *
 */
