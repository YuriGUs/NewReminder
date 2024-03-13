import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/UsersService';
import { handleErrors } from 'src/utils/error-handler';

@Controller('/users')
export class usersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('Email') email: string,
    @Body('Password') password: string,
  ) {
    try {
      return this.usersService.createUser(email, password);
    } catch (err: unknown) {
      handleErrors(err, 'Erro ao criar usuário');
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      return this.usersService.loginUser(email, password);
    } catch (err: unknown) {
      handleErrors(err, 'Erro ao fazer loging');
    }
  }
}
