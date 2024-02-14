"use client";

import "client-only";

import { createContext, useState, useEffect, useContext } from "react";

// create the context to be used
const CtxProvider = createContext(false);

// context provider component wrapper
export const IsClientCtxProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  const ClientCtxProvider = createContext(false).Provider;
  useEffect(() => setIsClient(true), []);

  return (
    <CtxProvider.Provider value={isClient}>{children}</CtxProvider.Provider>
  );
};

// use context hook with the context provider created here
export const useIsClient = () => {
  return useContext(CtxProvider);
};
