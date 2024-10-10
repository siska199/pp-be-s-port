export const generateTimeExpired = (day: number = 1) => {
  return Date.now() + 24 * 60 * 60 * 1000 * day;
};
