/* eslint-disable import/extensions */
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import React from "react";
import "./services/i18n";
import "component-library/dist/style.css";
import { store } from "./store/store";

// import GlobalStyles from "./styles/GlobalStyles";
import router from "./router";
import ApiProvider from "./providers/ApiProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApiProvider>
                {/* <GlobalStyles /> */}
                <RouterProvider router={router} />
            </ApiProvider>
        </Provider>
    </React.StrictMode>
);
