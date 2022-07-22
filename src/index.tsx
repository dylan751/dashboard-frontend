import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Initialize languages
import './locales/i18n';

ReactDOM.render(
  <GoogleOAuthProvider
    clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}
