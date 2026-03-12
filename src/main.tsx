import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __PRELOADER_DONE__?: boolean;
  }
}

const mount = () => {
  createRoot(document.getElementById("root")!).render(<App />);
};

const preloaderEl = document.getElementById("preloader");
if (window.__PRELOADER_DONE__ || !preloaderEl) {
  mount();
} else {
  let mounted = false;
  const mountOnce = () => {
    if (mounted) return;
    mounted = true;
    mount();
  };

  window.addEventListener("preloader:done", mountOnce, { once: true } as AddEventListenerOptions);
  setTimeout(mountOnce, 4500);
}
