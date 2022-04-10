import React, { PropsWithChildren } from 'react';
import QueryProvider from './QueryClient';

export default function AppProvider({ children }: PropsWithChildren<unknown>) {
	return <QueryProvider>{children}</QueryProvider>;
}
