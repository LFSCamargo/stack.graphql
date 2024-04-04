export const FormatUtility = {
  /**
   *
   * @param value - 300000
   * @returns - R$ 300.000,00
   */
  formatCurrency: (value: number) => {
    return value.toLocaleString("pt-BR", {
      currency: "BRL",
    });
  },

  /**
   * @description - Format credit card number
   * @param value - 1234567890123456
   * @returns - 1234 5678 9012 3456
   */
  formatCreditCard: (value: string) => {
    return value.replace(/(\d{4})/g, "$1 ").trim();
  },
};
