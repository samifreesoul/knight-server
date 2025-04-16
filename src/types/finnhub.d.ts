declare module "finnhub" {
  export class ApiClient {
    static instance: {
      authentications: {
        api_key: {
          apiKey: string;
          apiKeyPrefix?: string;
        };
      };
    };
  }

  export class DefaultApi {
    constructor();
    setApiKey(auth: any, key: string): void;
    stockCandles(
      symbol: string,
      resolution: string,
      from: number,
      to: number,
      callback: (error: any, data: any, response: any) => void
    ): void;
  }
}
