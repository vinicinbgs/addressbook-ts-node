import bcrypt from 'bcrypt';

const salt: number = 12;

const hash = async (plainText: string) => {
  return bcrypt.hash(plainText, salt);
};

const compare = async (plainText: string, hash: string) => {
  return bcrypt.compare(plainText, hash);
};

export { hash, compare };
