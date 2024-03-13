import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReminderService } from '../services/reminders.service';
import { handleErrors } from 'src/utils/error-handler';

//Indica que é um controller
@Controller('/reminders') // Rota préfixada como /reminders
export class RemindersController {
  // Estou injetando o ReminderService nessa classe do controller através do constructor
  // Posso acessar ela com o this.
  constructor(private readonly reminderService: ReminderService) {}

  //Rota de listar
  @Get('/list')
  async getAllReminders() {
    try {
      return await this.reminderService.listAllReminders();
    } catch (err: unknown) {
      handleErrors(err, 'Erro ao listar lembretes');
    }
  }

  @Get('list/:id')
  async listUniqReminder(@Param('id') id: number) {
    try {
      return await this.reminderService.listUniqReminder(id);
    } catch (err: any) {
      handleErrors(err, 'Erro ao listar lembrete');
    }
  }

  //Rota de criação
  @Post('/create')
  async createReminders(
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    try {
      return await this.reminderService.createReminder({ title, content });
    } catch (err: any) {
      handleErrors(err, 'Erro ao criar lembrete');
    }
  }

  @Delete('/delete/:id')
  async deleteIDReminder(@Param('id') id: number) {
    try {
      return await this.reminderService.deleteReminder(id);
    } catch (err: any) {
      handleErrors(err, 'Erro ao deletar lembrete');
    }
  }

  @Delete('/deleteAll')
  async deleteAllReminders() {
    try {
      return await this.reminderService.deleteAllReminders();
    } catch (err: any) {
      handleErrors(err, 'Erro ao deletar todos os lembretes');
    }
  }

  @Patch('/update/:id')
  async updateReminder(
    @Param('id') id: number,
    @Body('content') content: string,
    @Body('title') title: string,
  ) {
    try {
      const updatedReminder = await this.reminderService.updateReminder({
        id,
        title,
        content,
      });
      return updatedReminder;
    } catch (error) {
      handleErrors(error, 'Erro ao atualizar lembrete');
    }
  }
}
