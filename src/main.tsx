import { createRoot } from "react-dom/client";
import "./index.css";

import { AppWithProviders } from "./Providers";

async function enableMocking() {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<AppWithProviders />);
});
