import CountryData from "country-data";

const wineTrustCurrencies = ["USD", "GBP", "EUR", "CNY", "SGD", "HKD"];

const supportedCurrencies = CountryData.currencies.all.filter((country) =>
  wineTrustCurrencies.includes(country.code)
);

export default supportedCurrencies;
