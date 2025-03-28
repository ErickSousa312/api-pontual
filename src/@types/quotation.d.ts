export type TypeQuotation = {
  data: {
    quote_id: string;
    fx_rate: string;
    expires_in: number;
  };
};

export type TypeResponseTrade = {
  data: {
    order_id: string;
    crypto_value: string;
    settlement: string;
    settlement_date: string;
    fiat_value: string;
    currency_in_value: string;
  };
};

export type TypeQuotationcheck = {
  data: {
    quota_available: string;
    currency: string;
  };
};
