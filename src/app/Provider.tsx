"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import StoreProvider from "./lib/features/storeProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";
export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({}));
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={client}>
          <StoreProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </StoreProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
