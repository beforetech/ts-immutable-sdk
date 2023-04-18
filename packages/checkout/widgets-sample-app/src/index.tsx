import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ConnectUI from './components/ui/connect/connect';
import WalletUI from './components/ui/wallet/wallet';
import SwapUI from './components/ui/swap/swap';
import BridgeUI from './components/ui/bridge/bridge';
import ExampleUI from './components/ui/example/example';
import BuyUI from './components/ui/buy/buy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/connect',
    element: <ConnectUI />,
  },
  {
    path: '/wallet',
    element: <WalletUI />,
  },
  {
    path: '/swap',
    element: <SwapUI />,
  },
  {
    path: '/bridge',
    element: <BridgeUI />,
  },
  {
    path: '/example',
    element: <ExampleUI />,
  },
  {
    path: '/buy',
    element: <BuyUI />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();