import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

// Initialize languages
import './locales/i18n';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LogInForm } from './components';

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="login" element={<LogInForm />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById('root'),
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}
