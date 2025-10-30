import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Films from "./pages/Films";
import SearchPage from "./pages/SearchPage";
import MyList from "./pages/MyList";
import BrowseByLanguage from "./pages/BrowseByLanguage";
import SmartRecommendation from "./pages/SmartRecommendation";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "fs-sml text-light border-0 bg-black ff-text toaster",
        }}
      />
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
    </>
  );
};

export default App;
