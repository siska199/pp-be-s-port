export const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTimeExpired = (day: number = 1) => {
  return Date.now() + 24 * 60 * 60 * 1000 * day;
};
