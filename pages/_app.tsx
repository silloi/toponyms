import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import GoogleAnalytics from '../components/GoogleAnalytics'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
