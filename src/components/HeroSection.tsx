import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ActivePage } from "@/types";

interface HeroSectionProps {
  setActivePage?: (page: ActivePage) => void;
}

const HeroSection = ({ setActivePage }: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    '/igreja-do-parque-uploads/IMG_8294.JPG',
    '/igreja-do-parque-uploads/IMG_8290.JPG',
    '/igreja-do-parque-uploads/IMG_8322.JPG',
    '/igreja-do-parque-uploads/IMG_8318.JPG',
    '/igreja-do-parque-uploads/IMG_8282.JPG',
    '/igreja-do-parque-uploads/IMG_8273.JPG',
    '/igreja-do-parque-uploads/IMG_8243.JPG',
    '/igreja-do-parque-uploads/IMG_8239.JPG',
    '/igreja-do-parque-uploads/IMG_8237.JPG',
    '/igreja-do-parque-uploads/IMG_8338.JPG',
    '/igreja-do-parque-uploads/IMG_8481.JPG',
    '/igreja-do-parque-uploads/IMG_8596.JPG',
    '/igreja-do-parque-uploads/IMG_8586.JPG',
    '/igreja-do-parque-uploads/IMG_8585.JPG',
    '/igreja-do-parque-uploads/IMG_8580.JPG',
    '/igreja-do-parque-uploads/IMG_8576.JPG',
    '/igreja-do-parque-uploads/IMG_8572.JPG',
    '/igreja-do-parque-uploads/IMG_8559.JPG',
    '/igreja-do-parque-uploads/IMG_8557.JPG',
    '/igreja-do-parque-uploads/IMG_8553.JPG',
    '/igreja-do-parque-uploads/IMG_8552.JPG',
    '/igreja-do-parque-uploads/IMG_8450.JPG',
    '/igreja-do-parque-uploads/IMG_8422.JPG',
    '/igreja-do-parque-uploads/IMG_8418.JPG',
    '/igreja-do-parque-uploads/IMG_8415.JPG',
    '/igreja-do-parque-uploads/IMG_8389.JPG',
    '/igreja-do-parque-uploads/IMG_8377.JPG',
    '/igreja-do-parque-uploads/IMG_8364.JPG',
    '/igreja-do-parque-uploads/IMG_8356.JPG',
    '/igreja-do-parque-uploads/IMG_8262.JPG',
    '/igreja-do-parque-uploads/IMG_8311.JPG',
    '/igreja-do-parque-uploads/IMG_8566.JPG'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 6000); // 6 segundos para cada foto

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden">
      {/* Carrossel de imagens de fundo */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-30'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: index === currentImageIndex ? 2 : 1
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
            IGREJA PRESBITERIANA
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg">
            PARQUE INDUSTRIAL
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-3 drop-shadow-md">
            Uma Igreja para você e sua família
          </p>
          <p className="text-sm md:text-base lg:text-lg mb-6 drop-shadow-md">
            Oração e Louvor a Deus
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
            onClick={() => setActivePage?.("contato")}
          >
            Participe da nossa comunidade
          </Button>
        </div>

        {/* Área para o carrossel de fotos */}
        <div className="mt-8 md:mt-12 relative w-72 h-48 md:w-96 md:h-64 mx-auto overflow-hidden rounded-lg shadow-2xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentImageIndex 
                  ? 'opacity-100 transform translate-x-0'
                  : index === (currentImageIndex + 1) % images.length
                    ? 'opacity-70 transform translate-x-1/2'
                    : 'opacity-30 transform -translate-x-1/2'
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: index === currentImageIndex ? 3 : index === (currentImageIndex + 1) % images.length ? 2 : 1
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


