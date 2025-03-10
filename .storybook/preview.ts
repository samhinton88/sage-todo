import type { Preview } from "@storybook/react";
import "carbon-react/lib/style/fonts.css";

import withGlobalStyles from "./withGlobalStyles";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withGlobalStyles],
};

export default preview;
