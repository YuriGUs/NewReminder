import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { User } from '@prisma/client';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // cria um novo usuário
  async createUser(email: string, password: string): Promise<User> {
    const data = CreateUserSchema.parse({ email, password });

    // criptografa a senha do usuário
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: { email: data.email, password: hashedPassword },
    });
  }

  // login do usuário
  async loginUser(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const data = CreateUserSchema.parse({ email, password });

    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    // verifica se o usuário existe
    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    // verifica se a senha é válida
    const valid = await bcrypt.compare(data.password, user.password);

    // se não for, retorna um erro
    if (!valid) {
      throw new Error('Senha inválida');
    }

    // gera um token para o usuário
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { user, token };
  }

  /**
   * Parte relacionada a redefinição de senha.
   * Poderia ser feito um serviço separado para isso para ficar mais organizado.
   */

  // solicitação de redefinição de senha
  async requestPasswordReset(email: string): Promise<void> {
    // Busca o usuário pelo email
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Usuario não encontrado com este email');
    }

    // Cria um segredo para redefinição de senha
    // acredito não ser uma boa pratica
    const secret = Math.floor(Math.random() * 1000000);

    await this.prisma.resetPasswordSecret.create({
      data: {
        secret,
        userId: user.id,
      },
    });

    await this.emailService.sendPasswordResetEmail(user.email, secret);
  }

  // redefinição de senha
  async resetPassword(secret: string, newPassword: string): Promise<User> {
    const secretNumber = parseInt(secret, 10);

    // Busca o registro de redefinição de senha usando o segredo fornecido
    const resetPasswordRecord =
      await this.prisma.resetPasswordSecret.findUnique({
        where: { secret: secretNumber },
      });

    // Se não encontrar um registro, lança um erro
    if (!resetPasswordRecord) {
      throw new Error('Invalid password reset token');
    }

    // Criptografa a nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualiza a senha do usuário
    const user = await this.prisma.user.update({
      where: { id: resetPasswordRecord.userId },
      data: { password: hashedPassword },
    });

    // Exclui o registro de redefinição de senha
    await this.prisma.resetPasswordSecret.delete({
      where: { secret: secretNumber },
    });

    return user;
  }
}
