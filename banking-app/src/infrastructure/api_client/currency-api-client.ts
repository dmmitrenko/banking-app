import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.currencyapi.com/v3/latest';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.configService.get<string>('CURRENCY_API_KEY');
    if (!this.apiKey) {
      throw new Error(
        'CURRENCY_API_KEY is not defined in environment variables.'
      );
    }
  }

  async getCurrencyRates(
    baseCurrency: string,
    currencies: string[]
  ): Promise<any> {
    try {
      const params = {
        apikey: this.apiKey,
        base_currency: baseCurrency,
        currencies: currencies.join(',')
      };

      const response = await firstValueFrom(
        this.httpService.get(this.baseUrl, { params })
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      } else if (error.request) {
        throw new HttpException(
          'No response received from currency API',
          HttpStatus.GATEWAY_TIMEOUT
        );
      } else {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
