module.exports = function generateShortCode(length = 6) {
  // Allowed characters: a–z + A–Z + 0–9
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let shortCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    shortCode += chars[randomIndex];
  }

  return shortCode;
};
