export function formatCardNumber(cardNumber: string) {
  return cardNumber.replace(/(\d{4})/g, "$1 ").trim();
}
