import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { StrictMode } from "react";
import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";

// components
import App from "./App";

// styles
import "styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

function Index() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}

render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
