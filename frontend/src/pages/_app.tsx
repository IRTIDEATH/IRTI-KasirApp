import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Appshell from "@/components/layouts/AppShell";

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <div>
      <SessionProvider session={session}>
        <Appshell>
          <Component {...pageProps} />
        </Appshell>
      </SessionProvider>
    </div>
  )
}
