import { Decorator } from "@storybook/react";
import React from "react";
import GlobalStyle from "carbon-react/lib/style/global-style";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";

const withGlobalStyles: Decorator = (Story) => (
  <CarbonProvider>
    <GlobalStyle />
    <Story />
  </CarbonProvider>
);
export default withGlobalStyles;
