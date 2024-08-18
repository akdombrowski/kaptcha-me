import { createSeshID } from "@/utils/encrypt";
import {
  ResponseCookie,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import crypto from "node:crypto";
import type { KeyObject, KeyPairKeyObjectResult } from "node:crypto";

// console.log();
// console.log();
// console.log("available crypto digest algs (and maybe signature algs");
// console.log(crypto.getHashes());
/**
 * output from node v20.15.0
 * [
 * 'RSA-MD5',
 * 'RSA-RIPEMD160',
 * 'RSA-SHA1',
 * 'RSA-SHA1-2',
 * 'RSA-SHA224',
 * 'RSA-SHA256',
 * 'RSA-SHA3-224',
 * 'RSA-SHA3-256',
 * 'RSA-SHA3-384',
 * 'RSA-SHA3-512',
 * 'RSA-SHA384',
 * 'RSA-SHA512',
 * 'RSA-SHA512/224',
 * 'RSA-SHA512/256',
 * 'RSA-SM3',
 * 'blake2b512',
 * 'blake2s256',
 * 'id-rsassa-pkcs1-v1_5-with-sha3-224',
 * 'id-rsassa-pkcs1-v1_5-with-sha3-256',
 * 'id-rsassa-pkcs1-v1_5-with-sha3-384',
 * 'id-rsassa-pkcs1-v1_5-with-sha3-512',
 * 'md5',
 * 'md5-sha1',
 * 'md5WithRSAEncryption',
 * 'ripemd',
 * 'ripemd160',
 * 'ripemd160WithRSA',
 * 'rmd160',
 * 'sha1',
 * 'sha1WithRSAEncryption',
 * 'sha224',
 * 'sha224WithRSAEncryption',
 * 'sha256',
 * 'sha256WithRSAEncryption',
 * 'sha3-224',
 * 'sha3-256',
 * 'sha3-384',
 * 'sha3-512',
 * 'sha384',
 * 'sha384WithRSAEncryption',
 * 'sha512',
 * 'sha512-224',
 * 'sha512-224WithRSAEncryption',
 * 'sha512-256',
 * 'sha512-256WithRSAEncryption',
 * 'sha512WithRSAEncryption',
 * 'shake128',
 * 'shake256',
 * 'sm3',
 * 'sm3WithRSAEncryption',
 * 'ssl3-md5',
 * 'ssl3-sha1'
 * ]
 */

export const setSecureServerSideKookie = (
  kookieJar: ReadonlyRequestCookies,
  key: string,
  value: string,
): ResponseCookies => {
  const kookieOpts: Partial<ResponseCookie> = {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
  };
  const kookies = kookieJar.set(key, value, kookieOpts);

  return kookies;
};


export const setSeshIDKookie = () => {};
