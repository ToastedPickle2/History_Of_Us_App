import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { AuthProvider } from "./contexts/AuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import "leaflet/dist/leaflet.css";

import Form from "./components/Form";
import HowItWorks from "./Pages/HowItWorks";

const HomePage = lazy(() => import("./Pages/HomePage"));

function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="form" element={<Form />}></Route>
                <Route path="how-it-works" element={<HowItWorks />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
