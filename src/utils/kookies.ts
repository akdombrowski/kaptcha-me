import {
  ResponseCookie,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const setSecureServerSideKookie = (
  kookieStore: ReadonlyRequestCookies,
  key: string,
  value: string,
): ResponseCookies => {
  const kookieOpts: Partial<ResponseCookie> = {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
  };
  const kookies = kookieStore.set(key, value, kookieOpts);

  return kookies;
};
