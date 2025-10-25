import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Films from "./pages/Films";
import SearchPage from "./pages/SearchPage";
import MyList from "./pages/MyList";
import BrowseByLanguage from "./pages/BrowseByLanguage";
import SmartRecommendation from "./pages/SmartRecommendation";
import { ListProvider } from "./context/ListContext";

const App = () => {
  return (
    <ListProvider>
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/films" element={<Films />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/browsebylanguage" element={<BrowseByLanguage />} />
        <Route path="/smartrecommendation" element={<SmartRecommendation />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </Router>
    </ListProvider>
    
  );
};

export default App;
