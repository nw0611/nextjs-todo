import '../styles/globals.css'
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // reactクエリの標準はrestAPIへの自動的にリトライを3回くりかえすが無効化
      refetchOnWindowFocus: false, // ブラウザにフォーカスを当てた時、RestAPIへのfetchが走る
    }
  }
})

function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true // フロント・バックでcookieのやりとりをする場合はtrueが必要

  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      // headerのcsrf-tokenを付与
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          fontFamily: 'Verdana, sans-serif'
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App