export const formatNumber = (amount: number, locale: string = "id-ID") => {
  return new Intl.NumberFormat(locale, { style: "decimal" }).format(amount);
};
