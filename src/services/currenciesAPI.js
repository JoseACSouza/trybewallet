export const fetchCurrency = async () => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await fetchCurrencies.json();
  return Object.keys(result).filter((currency) => currency !== 'USDT');
};
