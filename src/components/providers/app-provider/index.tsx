'use client';

import { ReactQueryProvider } from './react-query-provider';
import { ThemeProviderWrapper } from './theme-provider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderWrapper>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProviderWrapper>
  );
}
