import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global dynamic fetch proxy for Vercel apps to talk to the unified API server
if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    let url = typeof input === "string" ? input : (input instanceof Request ? input.url : "");
    if (url && (url.startsWith("/api/") || url.startsWith("/aa/"))) {
      if (window.location.hostname.includes("vercel.app")) {
        const targetHost = "https://ais-pre-dc5p3pczmmoan5ndqfa2rc-559339625468.europe-west2.run.app";
        if (typeof input === "string") {
          input = `${targetHost}${url}`;
        } else if (input instanceof Request) {
          input = new Request(`${targetHost}${url}`, input);
        }
      }
    }
    return originalFetch.call(this, input, init);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
