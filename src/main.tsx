import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './providers/theme.provider.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
