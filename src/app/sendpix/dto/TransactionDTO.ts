/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber } from 'class-validator';

export class TransactionDTO {
  public customerID: string;

  @IsEmail()
  public email: string;

  public key: string;

  @IsNumber()
  public value: number;

  public bank?: any;
}
