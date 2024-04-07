import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux"
import theme from "./theme/theme.js";
import store from "./redux/store.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  // </React.StrictMode> 
);
