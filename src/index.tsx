import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto';
import '@fontsource/raleway';
import ThemeContext from './context/theme';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext>
      <Suspense fallback="loading...">
        <App />
      </Suspense>
    </ThemeContext>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
