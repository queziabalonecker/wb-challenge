/* eslint-disable prettier/prettier */
export interface ICostumer {
  customerID: string;
  agency: string;
  account: string;
}

export interface IBanksInfo {
  bank: string;
  customers: ICostumer[];
}
