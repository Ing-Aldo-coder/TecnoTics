import { Hexagon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-2 mb-8">
          <Hexagon className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl text-white">TecnoTics</span>
        </div>
        <p className="text-center text-text-muted text-sm">
          &copy; {new Date().getFullYear()} TecnoTics. Todos los derechos reservados. Equipamiento tecnológico de alto desempeño.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
