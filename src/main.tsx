import 'src/styles/globals.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="theme"
    >
      <App />
    </ThemeProvider>
  </StrictMode>
);
