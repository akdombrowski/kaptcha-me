import {
  createCipheriv,
  randomBytes,
  createSecretKey,
  generateKeySync,
  type Encoding,
  type KeyObject,
  createDecipheriv,
} from "crypto";

const encAlg = "aes-256-cbc";
const key = process.env.PRIVATE_KEY;

export interface EncryptedOutput {
  encrypted: string;
  aesKey: KeyObject;
  iv: Buffer;
}
export const encrypt = async (
  data: string,
  inEncoding?: Encoding,
  outEncoding?: Encoding,
): Promise<EncryptedOutput> => {
  if (key) {
    const aesKey = await generateAesKey();
    const aesKeyExport = aesKey.export({ format: "jwk" });
    console.log();
    console.log();
    console.log();
    console.log("===============");
    console.log("Start Encrypting");
    console.log("===============");
    console.log();
    console.log();
    console.log("aesKey export:");
    console.log(aesKeyExport);
    console.log();
    console.log();
    const iv = generateIV();
    console.log();
    console.log();
    console.log("iv:");
    console.log(iv);
    console.log();
    console.log();
    const encrypted = await aesEncrypt(data, aesKey, iv);
    console.log();
    console.log();
    console.log("encrypted:");
    console.log(encrypted);
    console.log();
    console.log();
    console.log("===============");
    console.log("End Encrypting");
    console.log("===============");
    console.log();
    console.log();
    console.log();

    return { encrypted, aesKey, iv };
  } else {
    throw new Error("missing enc key");
  }
};

export type AESKeyLength = 128 | 192 | 256;

export const generateAesKey = async (
  length: AESKeyLength = 256,
): Promise<KeyObject> => {
  const key = await generateKeySync("aes", {
    length,
  });

  return key;
};

export const generateIV = (length = 16): Buffer => {
  const iv = randomBytes(length);

  return iv;
};

export const aesEncrypt = async (
  plaintext: string,
  key: KeyObject,
  iv: Buffer,
  inEnc: Encoding = "utf8",
  outEnc: Encoding = "hex",
): Promise<string> => {
  const cipher = createCipheriv(encAlg, key, iv);

  let encrypted = cipher.update(plaintext, inEnc, outEnc);
  encrypted += cipher.final(outEnc);

  console.log("cipher final:", encrypted);

  return encrypted;
};

export const aesDecrypt = async (
  ciphertext: string,
  key: KeyObject,
  iv: Buffer,
  inEnc: Encoding = "hex",
  outEnc: Encoding = "utf8",
): Promise<string> => {
  const decipher = createDecipheriv(encAlg, key, iv);

  let decrypted = decipher.update(ciphertext, inEnc, outEnc);

  decrypted += decipher.final(outEnc);

  return decrypted;
};
