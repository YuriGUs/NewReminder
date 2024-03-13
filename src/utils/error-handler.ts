import { HttpException, HttpStatus } from '@nestjs/common';

// Utils para lidar com erros
export function handleErrors(err: unknown, message: string) {
  // Verifica se o erro é uma instância de Error
  if (err instanceof Error) {
    throw new HttpException(
      `${message}: ${err.message}`,
      HttpStatus.BAD_REQUEST,
    );
  }
  // Se não for, lança um erro. *Muito improvavel que este erro aconteça
  throw new HttpException(message, HttpStatus.BAD_REQUEST);
}

/**
 *
 * O código acima é um exemplo de um utilitário que lida com erros.
 * Ele é usado para lidar com erros que podem ocorrer em qualquer lugar do código.
 * Ele verifica se o erro é uma instância de Error e, se for, lança um novo erro com a mensagem original do erro.
 * Se não for, lança um novo erro com a mensagem original do erro.
 *
 * Devo evitar tipar erros com any.
 */
