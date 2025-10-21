import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Films from "./pages/Films";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/films" element={<Films />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
