function validateDecimal(decimalString) {
  // Regular expression to match a decimal number with up to 10 digits and up to 2 decimal places
  const decimalRegex = /^\d{1,8}(?:\.\d{1,2})?$/;

  return decimalRegex.test(decimalString);
}

module.exports = validateDecimal;
