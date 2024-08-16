import { Key } from "@mui/icons-material";
import {
  createCipheriv,
  createHash,
  randomBytes,
  createSecretKey,
  generateKeySync,
  generateKeyPairSync,
  type Encoding,
  type KeyObject,
  createDecipheriv,
} from "crypto";

const encAlg = "aes-256-cbc";
const KEY = process.env.PRIVATE_KEY;
const IV = process.env.IV;
const SALT = process.env.SALT;
const SALTY = process.env.SALTY;
export interface EncryptedOutput {
  encrypted: string;
  aesKey: KeyObject;
  iv: Buffer;
}

export const createSeshID = (props: { username: string }) => {
  const {
    publicKey,
    privateKey,
  }: { publicKey: KeyObject; privateKey: KeyObject } =
    generateKeyPairSync("ed25519");
  // TODO: check whether locale going to cause a problem if the server is in another local when
  // generating vs checking? Is that possible?
  const createdAt = new Date().toLocaleString();
  const dateHash = createHash("SHA3-512");
  dateHash.update(SALTY + Buffer.from(createdAt).toString("hex"), "hex");
  const createdAtHashed = dateHash.digest("hex");

  const data = SALT + Buffer.from(props.username).toString("hex");
  const hash = createHash("SHA3-512");
  hash.update(data, "hex");
  const hashed = hash.digest("hex");
  const seshIDHash = createHash("SHA3-512");
  seshIDHash.update(hashed + createdAtHashed, "hex");
  const seshID = seshIDHash.digest("hex");

  return { seshID, createdAt: createdAt };
};

export const encrypt = async (
  data: string,
  inEncoding?: Encoding,
  outEncoding?: Encoding,
): Promise<EncryptedOutput> => {
  let key: string | undefined = KEY;
  let iv: string | undefined = IV;
  if (!key) {
    console.warn("didn't find key in environment variables");
    key = (await generateAesKey()).export().toString("hex");
  }

  if (!iv) {
    console.warn("didn't find iv in environment variables");
    iv = await generateIV().toString("hex");
  }

  if (key && iv) {
    const myKey = createSecretKey(key, "hex");
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
    const ivBuf = Buffer.from(iv, "hex");
    const ivHex = ivBuf.toString("hex");
    console.log("ivHex:");
    console.log(ivHex);
    console.log();
    console.log();
    const encrypted = await aesEncrypt(data, myKey, ivBuf);
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

    return { encrypted, aesKey: myKey, iv: ivBuf };
  } else {
    throw new Error("missing enc key or iv");
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
