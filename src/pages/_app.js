import '../styles/globals.css'
import '../styles/components/navbar.css'
import '../styles/components/uploadArt.css'
import { MantineProvider } from '@mantine/core'
import RouterTransition from '../components/RouterTransition'
import { Notifications } from '@mantine/notifications';
import { Raleway } from 'next/font/google'
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

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
            },
            Input: {
              styles: (theme) => ({
                root: {
                  borderRadius: '0'
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
          primaryColor: 'brand',
          fontFamily: raleway.style.fontFamily
        }}
      >
        <RouterTransition />
        <Notifications position="bottom-center" zIndex={2077} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </MantineProvider>
    </main>
  )
}
