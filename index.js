
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { I18nProvider } from './i18n.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("L'élément racine est introuvable pour le montage");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      I18nProvider,
      null,
      React.createElement(App, null)
    )
  )
);
