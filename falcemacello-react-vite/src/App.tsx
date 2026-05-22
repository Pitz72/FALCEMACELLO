import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ClientLayout from "@/components/layout/ClientLayout";
import Home from "@/pages/Home";
import ManifestoPage from "@/pages/ManifestoPage";
import EPPage from "@/pages/EPPage";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/ep" element={<EPPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
