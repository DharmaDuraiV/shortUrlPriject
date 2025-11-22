import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:code" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
