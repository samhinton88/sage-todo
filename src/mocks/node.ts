import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Use node when running tests which don't need their own obvious config
export const server = setupServer(...handlers);
