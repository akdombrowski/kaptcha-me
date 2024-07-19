import {
  createCipheriv,
  createHash,
  randomBytes,
  createSecretKey,
  generateKeySync,
  type Encoding,
  type KeyObject,
  createDecipheriv,
} from "crypto";

const encAlg = "aes-256-cbc";
const KEY = process.env.PRIVATE_KEY;
const IV = process.env.IV;

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
  if (KEY && IV) {
    const myKey = createSecretKey(KEY, "hex");
    const myKeyExport = myKey.export().toString("hex");
    console.log();
    console.log();
    console.log();
    console.log("===============");
    console.log("Start Encrypting");
    console.log("===============");
    console.log();
    console.log();
    console.log("myKey export:");
    console.log(myKeyExport);
    console.log();
    console.log();
    const iv = Buffer.from(IV, "hex");
    const ivHex = iv.toString("hex");
    console.log("ivHex:");
    console.log(ivHex);
    console.log();
    console.log();
    const encrypted = await aesEncrypt(data, myKey, iv);
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

    return { encrypted, aesKey: myKey, iv };
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

export const sha512 = (data) => {
  const hasher = createHash("sha512");
  hasher.update(data, "utf8");
  const hashed = hasher.digest("base64");
  return hashed;
};

export const compareHash = (data, hash) => {
  const hashedData = sha512(data);
  return hashedData === hash;
};
