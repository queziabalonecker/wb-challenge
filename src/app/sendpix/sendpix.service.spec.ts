import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { IBanksInfo } from './interfaces/banksInfo.interface';
import { ITransaction } from './interfaces/transaction.interface';
import { SendpixService } from './sendpix.service';

describe('SendpixService', () => {
  let sendPixService: SendpixService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendpixService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    sendPixService = module.get<SendpixService>(SendpixService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendPixService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getPendentTransactions', () => {
    it('should return a pendent transactions list', async () => {
      const expected: ITransaction[] = [
        {
          customerID: 'f8358dc6-8c89-4df1-9d2e-120a137aadd5',
          email: 'aaronhand@ratke.name',
          key: '976.565.843-06',
          value: 4731.29,
          bank: null,
        },
      ];

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ status: 200, statusText: 'OK', config: {}, headers: {}, data: expected }));
      const result = await sendPixService.getPendentTransactions();

      expect(result).toEqual(expected);
    });
  });

  describe('getBanksInfo', () => {
    it('should return a list of banks information', async () => {
      const expected: IBanksInfo[] = [
        {
          bank: 'Will Bank',
          customers: [],
        },
      ];

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ status: 200, statusText: 'OK', config: {}, headers: {}, data: expected }));
      const result = await sendPixService.getBanksInfo();

      expect(result).toEqual(expected);
    });
  });
});
