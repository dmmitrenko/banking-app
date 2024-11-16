import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import Decimal from "decimal.js";

@Injectable()
export class CurrencyApiClient {

    private readonly baseUrl: string;
  
    constructor() 
    {
      this.baseUrl = 'https://api.currencyapi.com';
    }
     
    /**
     * Get currency rate for a specific pair.
     * @param baseCurrency - Base currency (e.g. USD)
     * @param targetCurrency - Target currency (e.g. EUR)
     * @returns Promise with currency rate.
     */

    async getExchangeRate(baseCurrency: string, targetCurrency: string): Promise<Decimal> {
      try {
        const response = await axios.get(`${this.baseUrl}/latest`, {
          params: {
            apikey: 'APIKEY',
            base_currency: baseCurrency,
            currencies: targetCurrency,
          },
        });
  
        const rate = response.data.rates[targetCurrency];
        if (!rate) {
          throw new Error(`Failed to get a rate for ${baseCurrency} -> ${targetCurrency}`);
        }
  
        return rate;
      } catch (error) {
        console.error(`Error when receiving exchange rate: ${error.message}`);
        throw new Error('Error when working with currency API.');
      }
    }
  }