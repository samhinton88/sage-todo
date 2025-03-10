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
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<AppWithProviders />);
});
