"use client"

import { Toast } from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Toast.Provider swipeDirection="right"> */}
      {children}
      {/* </Toast.Provider> */}
    </QueryClientProvider>
  );
}
