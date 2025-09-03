"use client";


import { SessionProvider } from "next-auth/react";

const SessionProviderComponent = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderComponent;