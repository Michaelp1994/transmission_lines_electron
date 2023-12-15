import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import GlobalStyles from "./components/GlobalStyles";
import router from "./router";
import { BrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
        <GlobalStyles />
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
);
