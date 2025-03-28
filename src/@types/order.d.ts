export type TypeOrderTrade = {
  data: {
    rows: [
      {
        order_id: string;
        currency_iso: string;
        fiat_value: string;
        crypto_value: string;
        fiat_value_paid: string;
        crypto_value_paid: string;
        fiat_value_missing: string;
        fx_rate: string;
        crypto_value_missing: string;
        settlement_date: string;
        created_at: string;
      },
    ];
    total: number;
    pages: number;
  };
};
