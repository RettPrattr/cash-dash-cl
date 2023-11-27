import { SessionProvider } from "next-auth/react"
import '@/styles/App.sass'

import Layout from '@/components/layouts/Layout'

export default function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
      <SessionProvider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
      </SessionProvider>
  )
}
