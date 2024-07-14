import {
  createCipheriv,
  randomBytes,
  createSecretKey,
  type Encoding,
} from "crypto";

const encAlg = "aes-256-cbc";
const key = process.env.PRIVATE_KEY;

export const encrypt = (
  data: string,
  inEncoding: Encoding,
  outEncoding?: Encoding,
): string => {
  if (key) {
    const iv = randomBytes(16);
    const secret = createSecretKey(key, "utf8");
    const cipher = createCipheriv(encAlg, key, iv);
    cipher.update(data, inEncoding);
    return cipher.final(outEncoding || "hex");
  } else {
    throw new Error("missing enc key");
  }
};
