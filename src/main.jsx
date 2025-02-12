import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/variables.css";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./Rutas.jsx";
import { AuthProvider } from "@asgardeo/auth-react";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import './theme.css';
import './motorSIAPSEZ.css';
// import { Provider as ChakraProvider } from "@/components/ui/provider"

const config = {
  signInRedirectURL: import.meta.env.VITE_AUTH_SIGN_IN_REDIRECT_URL,
  signOutRedirectURL: import.meta.env.VITE_AUTH_SIGN_OUT_REDIRECT_URL,
  clientID: import.meta.env.VITE_AUTH_CLIENT_ID,
  baseUrl: import.meta.env.VITE_WSO2_URL,
  scopes: ["openid", "profile", "message.read", "groups"],
};

document.title = "Inicio | SIAPSEZ";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider config={config}>
        {/* <ChakraProvider> */}
          <Rutas />
        {/* </ChakraProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
