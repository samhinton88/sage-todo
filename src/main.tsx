import { createRoot } from "react-dom/client";
import { AppWithProviders } from "./Providers";
import "carbon-react/lib/style/fonts.css";

async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

/* 
  As with most modern tooling, vite creates the root wrapped with 
  React.StrictMode

  I found that this caused the Carbon Portal logic to fail such
  that the children of the portal were removed from the DOM.
  In the interests of time I removed it.

  If I have some time I'll raise it as an issue.

  It's not an issue in production so as a workaround it could be 
  used conditionally.
*/
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<AppWithProviders />);
});
