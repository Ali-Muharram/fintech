'use client';

import { ReactQueryProvider } from './react-query-provider';
import { ThemeProviderWrapper } from './theme-provider';
import { AuthProvider } from '../session-provider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderWrapper>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </ThemeProviderWrapper>
  );
}
