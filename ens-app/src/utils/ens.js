export const generateSalt = () => {
  const random = new Uint8Array(32);
  crypto.getRandomValues(random);
  const SALT =
    "0x" +
    Array.from(random)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return SALT;
};
