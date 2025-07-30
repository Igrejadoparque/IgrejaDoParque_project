import { ActivePage } from "@/types";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LiveIndicator from "./LiveIndicator";

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

const Header = ({ activePage, setActivePage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "inicio" as const, label: "Início" },
    { id: "lideranca" as const, label: "Liderança" },
    { id: "sobre" as const, label: "Sobre" },
    { id: "publicacoes" as const, label: "Publicações" },
    { id: "eventos" as const, label: "Eventos" },
    { id: "contato" as const, label: "Contato" },
    { id: "departamentos" as const, label: "Departamentos" },
    { id: "webtv" as const, label: "Culto Ao Vivo" },

  ];

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-3">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick("inicio")}
          >
            <img 
              src="/logoIPPI.png"            alt="Logo IPPI" 
              className="h-10 md:h-12"
            />
            <LiveIndicator />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-2 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                    activePage === item.id
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <a 
                href="https://www.ipb.org.br/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/Ipb_logo.png" 
                  alt="Logo IPB" 
                  className="h-12 md:h-14"
                />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 ${
                      activePage === item.id
                        ? "bg-green-600 text-white"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="flex justify-center pt-2">
                <a 
                  href="https://www.ipb.org.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/Ipb_logo.png" 
                    alt="Logo IPB" 
                    className="h-12"
                  />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

