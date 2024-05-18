export const generateUniqueNumbers = (quantity:number) => {
  const numbers = new Set();
  while (numbers.size < quantity) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    // Only add the number if it's not 0
    if (randomNumber!== 0) {
      numbers.add(randomNumber);
    }
  }
  return Array.from(numbers);
};