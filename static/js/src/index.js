import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Kreirajte root element
const root = ReactDOM.createRoot(document.getElementById('root'));

const initialState = window.__INITIAL_STATE__;
const queryClient = new QueryClient();

// Renderujte aplikaciju
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App initialState={initialState} />
    </QueryClientProvider>
  </React.StrictMode>
);