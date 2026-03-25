import { Routes, Route } from "react-router-dom";
import Navbar from "./landing_page/Navbar";
import Footer from './landing_page/Footer'
import Home from "./landing_page/Home/Home";
import Signup from "./landing_page/Signup/Signup";
import About from "./landing_page/About/About";
import Products from "./landing_page/Products/Products";
import Pricing from "./landing_page/Pricing/Pricing";
import Support from "./landing_page/Support/Support";
import NotFound from "./landing_page/NotFound";

function App() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
