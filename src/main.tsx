import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/index.tsx";
import { MainContext } from "./context/MainContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <MainContext>
        <App />
      </MainContext>
    </Provider>
  </BrowserRouter>
);
