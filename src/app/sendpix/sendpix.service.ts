import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { isEmail, isPhoneNumber, isString } from 'class-validator';
import { response } from 'express';
import { TransactionDTO } from './dto/TransactionDTO';
import { IBalance } from './interfaces/balance.interface';
import { ICostumer, IBanksInfo } from './interfaces/banksInfo.interface';
import { ITransaction } from './interfaces/transaction.interface';

@Injectable()
export class SendpixService {
  constructor(private readonly httpService: HttpService) {}

  async getPendentTransactions() {
    let transactions: ITransaction[] = [];
    const url = 'https://run.mocky.io/v3/c3bdfbf6-d789-4e52-829c-bddbb886c3be';

    const { status, data } = await this.httpService.get<ITransaction[]>(url).toPromise();
    if (status === 200) {
      transactions = data;
    }
    return transactions;
  }

  async getBanksInfo() {
    let banksInfo: IBanksInfo[];
    const url = 'https://run.mocky.io/v3/85c286b6-e483-420f-9f2b-1ca57ae06c52';

    const { status, data } = await this.httpService.get<IBanksInfo[]>(url).toPromise();
    if (status === 200) {
      banksInfo = data;
    }
    return banksInfo;
  }

  async sendTransaction(transaction: TransactionDTO, accountInfo: ICostumer) {
    if (
      !isEmail(transaction.key) &&
      !isPhoneNumber(transaction.key, 'PT') &&
      !(isString(transaction.key) && transaction.key.length === 14)
    ) {
      return 'Invalid key';
    }
    //check balance
    const url = 'https://run.mocky.io/v3/e0f453b7-620c-4479-839e-28ac58111fca';
    const { data } = await this.httpService
      .post<IBalance>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        params: { agency: accountInfo.agency, account: accountInfo.account },
      })
      .toPromise();
    if (data.balance < transaction.value) {
      return 'Insufficient funds';
    }
    return response.status(200);
  }

  async sendPix(body: any) {
    const transactions = await this.getPendentTransactions();
    const pendentTransaction = transactions.filter((transaction) => transaction.email === body.email)[0];
    if (!pendentTransaction) {
      return response.status(404);
    }

    //banks info
    const banksInfo = await this.getBanksInfo();
    const willBankCostumers = banksInfo.filter((nameBank) => nameBank.bank === 'Will Bank')[0].customers;
    const DBZCostumers = banksInfo.filter((nameBank) => nameBank.bank === 'DBZ Bank')[0].customers;

    //account info
    let accountInfo = willBankCostumers.filter((costumer) => costumer.customerID === pendentTransaction.customerID)[0];
    if (!accountInfo) {
      accountInfo = DBZCostumers.filter((costumer) => costumer.customerID === pendentTransaction.customerID)[0];
    }

    return await this.sendTransaction(pendentTransaction, accountInfo);
  }
}
