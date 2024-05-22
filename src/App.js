import { publicRoutes } from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { DefaultLayout } from "./Components/AdminComponents/Layout";
import DefaultLayoutClient from "./Components/ClientComponents/Layout/DefaultLayout";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const LayoutAdmin =
              route.layoutAdmin === null ? Fragment : DefaultLayout;
            const LayoutClient =
              route.layoutClient === null ? Fragment : DefaultLayoutClient;

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutClient>
                    <LayoutAdmin>
                      <Page />
                    </LayoutAdmin>
                  </LayoutClient>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
