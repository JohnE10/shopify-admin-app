import '../styles/globals.css'
import Layout from "../components/Layout";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// between pages loading indicator
function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return() => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return loading && (
    <div className='text-center fs-5 mt-5'>...Loading</div>
  )
}

function MyApp({ Component, pageProps }) {

  return (
    <>

      < div className='container' >
        <Layout>

          <><Loading /><Component {...pageProps} /></>

        </Layout>

      </div >
    </>

  )

}

export default MyApp
