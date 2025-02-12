export const FortmatoDeDinero = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return value;
  }
  return `$ ${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const parseCurrency = (formattedValue) => {
    const number = parseFloat(formattedValue.replace(/[^0-9.-]+/g, ""));
    if (isNaN(number)) {
      return formattedValue;
    }
    return number;
  };
  