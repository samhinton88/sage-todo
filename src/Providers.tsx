import "carbon-react/lib/style/fonts.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import GlobalStyle from "carbon-react/lib/style/global-style";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { sageTheme } from "carbon-react/lib/style/themes";
const queryClient = new QueryClient();

export const AppWithProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CarbonProvider validationRedesignOptIn theme={sageTheme}>
        <GlobalStyle />
        <App />
      </CarbonProvider>
    </QueryClientProvider>
  );
};
