import '../styles/globals.css'
import '../styles/components/navbar.css'
import { MantineProvider } from '@mantine/core'
import RouterTransition from '../components/RouterTransition'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ 
  subsets: ['latin'] 
})

export default function App({ Component, pageProps }) {
  return (
    <main className={raleway.className}>
       <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          components: {
            Button: {
              styles: (theme) => ({
                root: {
                  borderRadius: '0',
                  boxShadow: '0px 10px 8px -5px rgba(0, 0, 0, 0.06)'
                }
              })
            }
          },
          colorScheme: 'light',
          colors: {
            brand: [
              "#1E1E1E",
              "#1B1B1B",
              "#191919",
              "#171717",
              "#151515",
              "#131313",
              "#111111",
              "#0F0F0F",
              "#0E0E0E",
              "#0C0C0C",
              "#0B0B0B",
              "#0A0A0A",
              "#090909"
            ],
          },
          primaryColor: 'brand'
        }}
      >
        <RouterTransition />
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  )
}
