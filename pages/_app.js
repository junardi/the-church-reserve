import 'bootstrap/scss/bootstrap.scss';
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
