import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { AuthProvider } from "./Contexts/AuthContext";

const HomePage = lazy(() => import("./Pages/HomePage"));

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
