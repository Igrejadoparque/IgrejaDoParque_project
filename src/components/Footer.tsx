import { Facebook, Instagram, Youtube, MapPin, Phone, Smartphone, Mail, Calendar, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-green-600 mr-4 mt-1" size={18} />
                <div>
                  <p>Rua José Pinto Camargo, 90</p>
                  <p>Parque Industrial, Campinas - SP</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-green-600 mr-4" size={18} />
                <p>(19) 3203-2048</p>
              </div>
              <div className="flex items-center">
                <Smartphone className="text-green-600 mr-4" size={18} />
                <p>(19) 97165-0419</p>
              </div>
              <div className="flex items-center">
                <Mail className="text-green-600 mr-4" size={18} />
                <p>contato@igrejadoparque.org.br</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-600 mb-6">Horários</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="text-green-600 mr-4 mt-1" size={18} />
                <div>
                  <p>Domingos: 10h (Escola Dominical)</p>
                  <p>Domingos: 19h (Culto)</p>
                </div>
              </div>
              <div className="flex items-center">
                <Laptop className="text-green-600 mr-4" size={18} />
                <p>Quintas-feiras: 20h (Encontro Virtual)</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-600 mb-6">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="https://open.spotify.com/show/6KfJjsbN2aro0PMiUXjhjR" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <img src="/Spotify_icon.png" alt="Spotify" className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.facebook.com/share/16ctcK1MXy/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <Facebook size={20} />
                </Button>
              </a>
              <a href="https://www.instagram.com/igrejadoparqueoficial?igsh=aGh3Y3dlMXp3M21q" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <Instagram size={20} />
                </Button>
              </a>
              <a href="https://youtube.com/@igrejadoparqueoficial?si=ov0Uz3HJS9DYu5tT" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <Youtube size={20} />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center">
          <p>&copy; 2023 Igreja do Parque - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

