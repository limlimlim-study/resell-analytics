export const extractNumbers = (input) => {
  if (!input) return 0;
  const numbers = input.match(/\d+/g);
  return numbers ? parseFloat(numbers.join('')) : 0;
};

export const wait = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
