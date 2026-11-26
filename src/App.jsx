import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FetchPage from "./pages/FetchPage";
import AxiosPage from "./pages/AxiosPage";


function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fetch" element={<FetchPage />} />
          <Route path="/axios" element={<AxiosPage />} />
          <Route
            path="*"
            element={
              <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">404 - Ruta no encontrada</h1>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App;