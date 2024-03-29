import '../styles/globals.css'
import { QuiscoProvider } from '../context/QuioscoProvider'


function MyApp({ Component, pageProps }) {
  return (
    <QuiscoProvider>
      <Component {...pageProps} />
    </QuiscoProvider>
  )
}

export default MyApp
