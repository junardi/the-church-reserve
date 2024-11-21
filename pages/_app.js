import 'bootstrap/scss/bootstrap.scss';
import "@/styles/globals.scss";

import { SessionProvider } from "next-auth/react";
import AuthGuard from '@/components/guards/authguard';

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <SessionProvider session={pageProps.session}>
      <AuthGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </SessionProvider>
  )
}
