import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import SupportChatbot from './components/SupportChatbot';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative bg-[#0a0f1d] text-white">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Global E-Commerce Elements */}
          <CartDrawer />
          <SupportChatbot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
