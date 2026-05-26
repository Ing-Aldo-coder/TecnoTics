import { Link } from 'react-router-dom';
import { ShoppingCart, Hexagon } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart, setCartOpen } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="glass-panel sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
              <Hexagon className="w-8 h-8 text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Tecno<span className="text-primary">Tics</span></span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-text-muted hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</Link>
              <Link to="/catalogo" className="text-text-muted hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Catálogo</Link>
              <Link to="/contacto" className="text-text-muted hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contacto</Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-text-muted hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
              title="Ver Carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-500 rounded-full animate-fadeIn shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
