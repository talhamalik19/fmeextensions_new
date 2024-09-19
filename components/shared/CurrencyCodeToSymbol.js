export function CurrencyCodeToSymbol({ value, currency}) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(value);
  }
  