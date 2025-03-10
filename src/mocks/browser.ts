import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Use a worker when developing on localhost etc.
export const worker = setupWorker(...handlers);
